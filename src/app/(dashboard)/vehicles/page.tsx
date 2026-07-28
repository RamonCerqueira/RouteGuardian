"use client";

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Table, Column } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Badge, Card } from '@/components/ui/Badge';
import { Toast } from '@/components/ui/Alert';
import { Plus, Search, Edit, Trash2, Truck } from 'lucide-react';

interface Vehicle {
  id: string;
  plate: string;
  model: string;
  consumption: number; // km/l
}

export default function VehiclesPage() {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({ plate: '', model: '', consumption: '' });

  // Initial dummy data
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const loadVehicles = async () => {
    try {
      const res = await fetch('/api/vehicles');
      const data = await res.json();
      if (data.success) {
        setVehicles(data.vehicles);
      }
    } catch (e) {
      console.error('Failed to load vehicles from API', e);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingVehicle(null);
    setFormData({ plate: '', model: '', consumption: '' });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({ 
      plate: vehicle.plate, 
      model: vehicle.model, 
      consumption: String(vehicle.consumption) 
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este veículo?')) {
      try {
        const res = await fetch(`/api/vehicles?id=${id}`, { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
          setVehicles((prev) => prev.filter((v) => v.id !== id));
          setToastMessage('Veículo excluído com sucesso!');
        } else {
          alert(data.message || 'Erro ao excluir veículo.');
        }
      } catch (e) {
        console.error('Error deleting vehicle', e);
        alert('Erro de conexão ao excluir veículo.');
      }
    }
  };

  const handleSave = async () => {
    const { plate, model, consumption } = formData;
    if (!plate || !model || !consumption) return;

    // Basic plate validation (Mercosul or traditional)
    const plateRegex = /^[A-Z]{3}-?[0-9][A-Z0-9][0-9]{2}$/i;
    if (!plateRegex.test(plate)) {
      alert('Placa inválida. Formatos aceitos: AAA-1234 ou AAA1A23.');
      return;
    }

    const numericConsumption = parseFloat(consumption.replace(',', '.'));
    if (isNaN(numericConsumption) || numericConsumption <= 0) {
      alert('Consumo deve ser um número positivo maior que zero.');
      return;
    }

    try {
      const res = await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plate: plate.toUpperCase(),
          model,
          consumption: numericConsumption
        }),
      });
      const data = await res.json();
      if (data.success) {
        setToastMessage(editingVehicle ? 'Veículo atualizado com sucesso!' : 'Veículo cadastrado com sucesso!');
        loadVehicles();
      } else {
        alert('Erro ao salvar no banco: ' + data.message);
      }
    } catch (e) {
      console.error(e);
      alert('Erro de conexão ao salvar veículo no banco.');
    }
    setIsModalOpen(false);
  };

  const filteredVehicles = vehicles.filter(
    (v) =>
      v.model.toLowerCase().includes(search.toLowerCase()) ||
      v.plate.toLowerCase().includes(search.toLowerCase())
  );

  const columns: Column<Vehicle>[] = [
    {
      header: 'Veículo',
      cell: (v) => (
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
            <Truck className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-200">{v.model}</p>
            <p className="text-[10px] text-slate-500 font-mono">ID: {v.id}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Placa',
      accessorKey: 'plate',
      className: 'font-mono font-bold text-slate-300',
    },
    {
      header: 'Consumo Médio (km/l)',
      cell: (v) => (
        <Badge variant="indigo">
          {v.consumption.toFixed(1).replace('.', ',')} km/l
        </Badge>
      ),
    },
    {
      header: 'Ações',
      className: 'text-right',
      cell: (v) => (
        <div className="flex items-center justify-end gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleOpenEditModal(v)}
          >
            <Edit className="w-3.5 h-3.5 text-slate-400 hover:text-white" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleDelete(v.id)}
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-500 hover:text-rose-400" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Controle de Veículos e Frota"
        description="Cadastre veículos corporativos e monitore o consumo estimado de combustível para auditorias."
        action={
          <Button leftIcon={<Plus className="w-4.5 h-4.5" />} onClick={handleOpenCreateModal}>
            Adicionar Veículo
          </Button>
        }
      />

      {/* Filter Bar */}
      <div className="flex items-center gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div className="flex-1">
          <Input
            placeholder="Buscar por placa ou modelo..."
            leftIcon={<Search className="w-4 h-4" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Grid List */}
      <div className="overflow-x-auto">
        <Table columns={columns} data={filteredVehicles} />
      </div>

      {/* CRUD Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingVehicle ? 'Editar Veículo' : 'Cadastrar Veículo'}
        footer={
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            <Button variant="primary" onClick={handleSave}>Salvar</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input
            label="Modelo do Veículo"
            placeholder="Ex: Fiat Fiorino 1.4"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Placa"
              placeholder="Ex: ABC-1234"
              value={formData.plate}
              onChange={(e) => setFormData({ ...formData, plate: e.target.value })}
              required
            />
            <Input
              label="Consumo Médio (km/l)"
              placeholder="Ex: 11,5"
              value={formData.consumption}
              onChange={(e) => setFormData({ ...formData, consumption: e.target.value })}
              required
            />
          </div>
        </div>
      </Modal>

      {/* Toast Alert */}
      {toastMessage && (
        <Toast
          title="Frota"
          message={toastMessage}
          type="success"
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}
