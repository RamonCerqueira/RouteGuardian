"use client";

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Table, Column } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Badge, Card } from '@/components/ui/Badge';
import { Toast } from '@/components/ui/Alert';
import { Plus, Search, Edit, Trash2, MapPin, Target, Compass } from 'lucide-react';
import { lookupCepAndCoordinates, geocodeAddress } from '@/lib/geocoding';

interface Client {
  id: string;
  name: string;
  contactName?: string;
  phone?: string;
  address: string;
  latitude: number;
  longitude: number;
  geofenceRadius: number; // em metros
  cep: string;
}

export default function ClientsPage() {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    contactName: '',
    phone: '',
    address: '',
    latitude: '',
    longitude: '',
    geofenceRadius: '50',
    cep: '',
  });

  // Initial dummy data
  const [clients, setClients] = useState<Client[]>([]);

  const loadClients = async () => {
    try {
      const res = await fetch('/api/clients');
      const data = await res.json();
      if (data.success) {
        setClients(data.clients);
      }
    } catch (e) {
      console.error('Failed to load clients from API', e);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingClient(null);
    setFormData({ name: '', contactName: '', phone: '', address: '', latitude: '', longitude: '', geofenceRadius: '50', cep: '' });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (client: Client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      contactName: client.contactName || '',
      phone: client.phone || '',
      address: client.address,
      latitude: String(client.latitude),
      longitude: String(client.longitude),
      geofenceRadius: String(client.geofenceRadius),
      cep: String(client.cep || ''),
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        const res = await fetch(`/api/clients?id=${id}`, { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
          setClients((prev) => prev.filter((c) => c.id !== id));
          setToastMessage('Cliente excluído com sucesso!');
        } else {
          alert(data.message || 'Erro ao excluir cliente.');
        }
      } catch (e) {
        console.error('Error deleting client', e);
        alert('Erro de conexão ao excluir cliente.');
      }
    }
  };


  const [geocoding, setGeocoding] = useState(false);

  const handleFetchCepAndGeocode = async (rawCep: string) => {
    if (!rawCep || rawCep.replace(/\D/g, '').length !== 8) return;
    setGeocoding(true);
    const result = await lookupCepAndCoordinates(rawCep);
    setGeocoding(false);

    if (result.success) {
      setFormData((prev) => ({
        ...prev,
        address: result.address || prev.address,
        latitude: result.latitude ? String(result.latitude) : prev.latitude,
        longitude: result.longitude ? String(result.longitude) : prev.longitude,
      }));
    }
  };

  const handleGeocodeAddressDirectly = async () => {
    if (!formData.address.trim()) return;
    setGeocoding(true);
    const coords = await geocodeAddress(formData.address);
    setGeocoding(false);

    if (coords) {
      setFormData((prev) => ({
        ...prev,
        latitude: String(coords.latitude),
        longitude: String(coords.longitude),
      }));
    }
  };

  const handleSave = async () => {
    const { name, contactName, phone, address, latitude, longitude, geofenceRadius, cep = '12345-678' } = formData;
    if (!name || !address || !latitude || !longitude || !geofenceRadius) return;

    const latNum = parseFloat(latitude.replace(',', '.'));
    const lngNum = parseFloat(longitude.replace(',', '.'));
    const radiusNum = parseFloat(geofenceRadius.replace(',', '.'));

    if (isNaN(latNum) || latNum < -90 || latNum > 90) {
      alert('Latitude inválida. Deve estar entre -90 e 90.');
      return;
    }

    if (isNaN(lngNum) || lngNum < -180 || lngNum > 180) {
      alert('Longitude inválida. Deve estar entre -180 e 180.');
      return;
    }

    if (isNaN(radiusNum) || radiusNum <= 0) {
      alert('Raio da cerca virtual (Geofence) deve ser um número positivo maior que zero.');
      return;
    }

    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          contactName,
          phone,
          address,
          latitude: latNum,
          longitude: lngNum,
          geofenceRadius: radiusNum,
          cep,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setToastMessage(editingClient ? 'Cliente atualizado com sucesso!' : 'Cliente cadastrado com sucesso!');
        loadClients();
      } else {
        alert('Erro ao salvar cliente no banco: ' + data.message);
      }
    } catch (e) {
      console.error(e);
      alert('Erro de conexão ao salvar cliente no banco.');
    }
    setIsModalOpen(false);
    cepApi('');
  };

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.address.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredClients.length / ITEMS_PER_PAGE) || 1;
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const columns: Column<Client>[] = [
    {
      header: 'Cliente / Estabelecimento',
      cell: (c) => (
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-200">{c.name}</p>
            <p className="text-[10px] text-slate-500 max-w-[280px] truncate" title={c.address}>{c.address}</p>
            <p className="text-[10px] text-slate-500 max-w-[280px] truncate" title={c.cep}>{c.cep}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Cerca Virtual (Geofence)',
      cell: (c) => (
        <div className="flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5 text-indigo-400" />
          <Badge variant="indigo">{c.geofenceRadius} metros</Badge>
        </div>
      ),
    },
    {
      header: 'Coordenadas GPS',
      cell: (c) => (
        <span className="font-mono text-xs text-slate-400">
          {c.latitude.toFixed(4)}, {c.longitude.toFixed(4)}
        </span>
      ),
    },
    {
      header: 'Ações',
      className: 'text-right',
      cell: (c) => (
        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={() => handleOpenEditModal(c)}>
            <Edit className="w-3.5 h-3.5 text-slate-400 hover:text-white" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleDelete(c.id)}>
            <Trash2 className="w-3.5 h-3.5 text-rose-500 hover:text-rose-400" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gerenciamento de Clientes & Geofencing"
        description="Cadastre endereços de entrega e configure o raio de auditoria virtual (Geofence) tolerado para conclusões."
        action={
          <Button leftIcon={<Plus className="w-4.5 h-4.5" />} onClick={handleOpenCreateModal}>
            Adicionar Cliente
          </Button>
        }
      />

      {/* Filter Bar */}
      <div className="flex items-center gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div className="flex-1">
          <Input
            placeholder="Buscar por nome ou endereço do cliente..."
            leftIcon={<Search className="w-4 h-4" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div>
        <Table
          columns={columns}
          data={paginatedClients}
          pagination={{
            currentPage,
            totalPages,
            onPageChange: setCurrentPage,
            totalItems: filteredClients.length,
            itemsPerPage: ITEMS_PER_PAGE,
          }}
        />
      </div>

      {/* CRUD Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingClient ? 'Editar Cliente' : 'Cadastrar Cliente'}
        footer={
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            <Button variant="primary" onClick={handleSave}>Salvar</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input
            label="Razão Social / Nome de Fantasia"
            placeholder="Ex: Supermercado Central"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Pessoa de Contato no Local"
              placeholder="Ex: João (Gerente de Recebimento)"
              value={formData.contactName}
              onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
            />
            <Input
              label="Telefone / WhatsApp de Contato"
              placeholder="Ex: (11) 98765-4321"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <Input
            label="CEP"
            placeholder="Ex: 40440-130 ou 01310-100"
            value={formData.cep}
            onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
            onBlur={(e) => handleFetchCepAndGeocode(e.target.value)}
            required
          />
          <div className="space-y-1">
            <Input
              label="Endereço de Entrega Completo"
              placeholder="Ex: Conjunto Tiradentes, Caminho de Areia, Salvador - BA"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
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
              label="Latitude"
              placeholder="Ex: -23.5616"
              value={formData.latitude}
              onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
              required
            />
            <Input
              label="Longitude"
              placeholder="Ex: -46.6560"
              value={formData.longitude}
              onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
              required
            />
          </div>
          <Input
            label="Raio da Cerca Virtual (metros)"
            placeholder="Ex: 50"
            value={formData.geofenceRadius}
            onChange={(e) => setFormData({ ...formData, geofenceRadius: e.target.value })}
            required
          />
        </div>
      </Modal>

      {/* Toast Alert */}
      {toastMessage && (
        <Toast
          title="Clientes"
          message={toastMessage}
          type="success"
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}
function setLoading(arg0: boolean) {
  throw new Error('Function not implemented.');
}

function cepApi(arg0: string) {
  throw new Error('Function not implemented.');
}

