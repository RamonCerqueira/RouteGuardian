"use client";

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Badge';
import { Switch } from '@/components/ui/Checkbox';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Toast } from '@/components/ui/Alert';
import { Save, User, Shield, MapPin, Building, Globe, Search, RefreshCw, Compass } from 'lucide-react';
import { lookupCepAndCoordinates, geocodeAddress } from '@/lib/geocoding';

export default function SettingsPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // App preferences
  const [darkMode, setDarkMode] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  // Tenant / Company profile fields
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyLat, setCompanyLat] = useState('');
  const [companyLng, setCompanyLng] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [geocoding, setGeocoding] = useState(false);
  const [cep, setCep] = useState('');

  const loadTenantData = async () => {
    try {
      const res = await fetch('/api/tenant');
      const data = await res.json();
      if (data.success && data.tenant) {
        setCompanyName(data.tenant.name || '');
        setCompanyAddress(data.tenant.address || '');
        setCompanyLat(String(data.tenant.latitude || ''));
        setCompanyLng(String(data.tenant.longitude || ''));
        setCep(data.tenant.cep || '');
      }
    } catch (e) {
      console.error('Failed to load company settings', e);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchCepAndGeocode = async (rawCep: string) => {
    if (!rawCep || rawCep.replace(/\D/g, '').length !== 8) return;
    setGeocoding(true);
    const result = await lookupCepAndCoordinates(rawCep);
    setGeocoding(false);

    if (result.success) {
      if (result.address) setCompanyAddress(result.address);
      if (result.latitude) setCompanyLat(String(result.latitude));
      if (result.longitude) setCompanyLng(String(result.longitude));
      setToastMessage('Endereço e Coordenadas GPS preenchidos automaticamente!');
    } else if (result.message) {
      alert(result.message);
    }
  };

  const handleGeocodeAddressDirectly = async () => {
    if (!companyAddress.trim()) {
      alert('Digite um endereço válido para buscar as coordenadas.');
      return;
    }
    setGeocoding(true);
    const coords = await geocodeAddress(companyAddress);
    setGeocoding(false);

    if (coords) {
      setCompanyLat(String(coords.latitude));
      setCompanyLng(String(coords.longitude));
      setToastMessage('Coordenadas GPS (Lat/Lng) obtidas com sucesso!');
    } else {
      alert('Não foi possível localizar as coordenadas para este endereço. Tente incluir cidade e estado.');
    }
  };

  useEffect(() => {
    loadTenantData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/tenant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: companyName,
          address: companyAddress,
          cep: cep.replace(/\D/g, ''),
          latitude: companyLat ? parseFloat(companyLat.replace(',', '.')) : undefined,
          longitude: companyLng ? parseFloat(companyLng.replace(',', '.')) : undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setToastMessage('Configurações da empresa salvas com sucesso!');
      } else {
        alert('Erro ao salvar configurações: ' + data.message);
      }
    } catch (e) {
      console.error(e);
      alert('Erro de conexão ao salvar configurações.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-sm text-slate-500">
        Carregando configurações...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader title="Configurações do Sistema" description="Gerencie preferências gerais e coordenadas do ponto de partida da empresa." />

      {/* Seção 1: Dados da Empresa / Ponto de Coleta e Partida */}
      <Card title="Dados da Empresa & Ponto de Partida">
        <div className="space-y-4">
          <Input
            label="Razão Social / Nome da Empresa"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            leftIcon={<Building className="w-4 h-4 text-slate-500" />}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="md:col-span-2">
              <Input
                label="CEP"
                placeholder="Ex: 40440-130 ou 01310-100"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                leftIcon={<MapPin className="w-4 h-4 text-slate-500" />}
                onBlur={() => handleFetchCepAndGeocode(cep)}
              />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleFetchCepAndGeocode(cep)}
              isLoading={geocoding}
              leftIcon={<Search className="w-4 h-4 text-indigo-400" />}
              className="w-full text-xs"
            >
              Buscar por CEP
            </Button>
          </div>

          <div className="space-y-2">
            <Input
              label="Endereço do Centro de Distribuição (Partida/Coleta)"
              placeholder="Ex: Conjunto Tiradentes, Caminho de Areia, Salvador - BA"
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
              leftIcon={<MapPin className="w-4 h-4 text-slate-500" />}
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleGeocodeAddressDirectly}
                disabled={geocoding}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold transition-colors cursor-pointer py-1"
              >
                <Compass className="w-3.5 h-3.5" />
                Buscar Coordenadas GPS pelo Endereço
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Latitude CD"
              placeholder="Ex: -23.5582"
              value={companyLat}
              onChange={(e) => setCompanyLat(e.target.value)}
              leftIcon={<Globe className="w-4 h-4 text-slate-500" />}
            />
            <Input
              label="Longitude CD"
              placeholder="Ex: -46.6609"
              value={companyLng}
              onChange={(e) => setCompanyLng(e.target.value)}
              leftIcon={<Globe className="w-4 h-4 text-slate-500" />}
            />
          </div>
          <p className="text-[10px] text-slate-400 bg-indigo-500/10 border border-indigo-500/20 p-2.5 rounded-xl flex items-center gap-2">
            <Compass className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            <span>As coordenadas acima são preenchidas <strong>automaticamente pelo CEP ou Endereço</strong> e serão usadas como ponto de partida (Parada 0) para o cálculo de combustível e rotas no mapa.</span>
          </p>
        </div>
      </Card>

      <Card title="Preferências do Sistema">
        <div className="space-y-6">
          <Switch
            label="Tema Escuro Padrão"
            description="Manter a interface no modo dark para economizar visão"
            checked={darkMode}
            onChange={setDarkMode}
          />
          <Switch
            label="Notificações de E-mail"
            description="Receber relatórios diários de vendas e logs"
            checked={emailAlerts}
            onChange={setEmailAlerts}
          />
          <Switch
            label="Autenticação de Dois Fatores (2FA)"
            description="Exigir código OTP ao fazer login"
            checked={twoFactor}
            onChange={setTwoFactor}
          />
        </div>
      </Card>

      <div className="flex justify-end">
        <Button leftIcon={<Save className="w-4 h-4" />} onClick={handleSave} isLoading={saving}>
          Salvar Configurações
        </Button>
      </div>

      {toastMessage && <Toast title="Salvo!" message={toastMessage} type="success" onClose={() => setToastMessage(null)} />}
    </div>
  );
}
