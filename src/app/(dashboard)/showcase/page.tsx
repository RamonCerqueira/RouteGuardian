"use client";

import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, Badge, StatCard } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { IconButton, ButtonGroup } from '@/components/ui/IconButton';
import { Input } from '@/components/ui/Input';
import { TextArea, Select } from '@/components/ui/TextArea';
import { Checkbox, Switch, FileUpload } from '@/components/ui/Checkbox';
import { Avatar, Timeline, AccordionItem, Tabs } from '@/components/ui/Avatar';
import { Alert, Toast, Skeleton, Spinner, EmptyState } from '@/components/ui/Alert';
import { Modal } from '@/components/ui/Modal';
import { Drawer, Breadcrumb, DropdownMenu } from '@/components/ui/Drawer';
import {
  Layers, Plus, Trash2, Edit, Check, Shield, Star, MessageSquare, Download, HelpCircle
} from 'lucide-react';

export default function ComponentsShowcasePage() {
  const [activeTab, setActiveTab] = useState('buttons');
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [switchState, setSwitchState] = useState(true);

  return (
    <div className="space-y-10">
      <PageHeader
        title="Galeria de Componentes UI"
        description="Todos os componentes prontos para uso no seu projeto. Basta copiar o trecho de código!"
      />

      <Breadcrumb
        items={[
          { label: 'Início', href: '/dashboard' },
          { label: 'Componentes UI', href: '/showcase' },
          { label: 'Showcase Geral' },
        ]}
      />

      {/* Seção 1: Botões & Ações */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          1. Botões & Ações (Buttons & IconButtons)
        </h2>
        <Card>
          <div className="space-y-6">
            <div>
              <p className="text-xs text-slate-400 font-semibold mb-3">Variantes de Botão</p>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>Primário</Button>
                <Button variant="secondary">Secundário</Button>
                <Button variant="success" leftIcon={<Check className="w-4 h-4" />}>Sucesso</Button>
                <Button variant="danger" leftIcon={<Trash2 className="w-4 h-4" />}>Perigo</Button>
                <Button variant="outline">Contorno (Outline)</Button>
                <Button variant="ghost">Fantasma (Ghost)</Button>
                <Button variant="primary" isLoading>Carregando...</Button>
              </div>
            </div>

            <div>
              <p className="text-xs text-slate-400 font-semibold mb-3">Botões de Ícone (IconButton) & Agrupados</p>
              <div className="flex items-center gap-4">
                <IconButton icon={<Edit className="w-4 h-4" />} variant="secondary" tooltip="Editar" />
                <IconButton icon={<Trash2 className="w-4 h-4" />} variant="danger" tooltip="Excluir" />
                <IconButton icon={<Star className="w-4 h-4" />} variant="primary" tooltip="Favoritar" />

                <ButtonGroup>
                  <Button variant="secondary" size="sm">Anterior</Button>
                  <Button variant="secondary" size="sm">Próximo</Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Seção 2: Badges & Cards */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
          2. Badges de Status, StatCards & Avatares
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Pílulas de Status (Badges)">
            <div className="flex flex-wrap gap-2">
              <Badge variant="success">Concluído</Badge>
              <Badge variant="warning">Pendente</Badge>
              <Badge variant="danger">Cancelado</Badge>
              <Badge variant="info">Processando</Badge>
              <Badge variant="indigo"><Shield className="w-3 h-3 mr-1" /> Admin</Badge>
              <Badge variant="neutral">Rascunho</Badge>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <Avatar name="Ana Clara" status="online" size="lg" />
              <Avatar name="Bruno Souza" status="away" size="md" />
              <Avatar name="Carlos Eduardo" status="offline" size="sm" />
            </div>
          </Card>

          <StatCard
            title="Estatística de Teste"
            value="R$ 124.500"
            change={24.8}
            period="vs trimestre anterior"
            icon={<Star className="w-5 h-5" />}
          />
        </div>
      </section>

      {/* Seção 3: Alertas, Toast & Skeletons */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
          3. Feedback, Alertas & Carregamento
        </h2>
        <div className="space-y-3">
          <Alert variant="info" title="Informação">Este é um alerta informativo com visualização limpa.</Alert>
          <Alert variant="success" title="Sucesso!">A operação foi executada com êxito.</Alert>
          <Alert variant="warning" title="Atenção">Verifique as permissões do banco de dados.</Alert>
          <Alert variant="error" title="Erro de Conexão">Não foi possível conectar à API Backend.</Alert>
        </div>

        <Card title="Carregamento (Shimmer Skeleton & Spinner)">
          <div className="flex items-center gap-6">
            <Spinner size="md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        </Card>

        <div className="flex items-center gap-4">
          <Button onClick={() => setToastVisible(true)}>Disparar Toast Notification</Button>
          <Button variant="secondary" onClick={() => setModalOpen(true)}>Abrir Modal</Button>
          <Button variant="outline" onClick={() => setDrawerOpen(true)}>Abrir Drawer Lateral</Button>
        </div>
      </section>

      {/* Seção 4: Acordeão & Abas */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
          4. Acordeão & Navegação por Abas
        </h2>
        <Card>
          <Tabs
            tabs={[
              { id: 'buttons', label: 'Avisos', icon: <MessageSquare className="w-4 h-4" /> },
              { id: 'docs', label: 'Documentos', icon: <Download className="w-4 h-4" /> },
              { id: 'faq', label: 'Dúvidas', icon: <HelpCircle className="w-4 h-4" /> },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
          <div className="pt-4">
            <AccordionItem title="Como conectar o backend nesta pastaBase?">
              Abra o arquivo <code className="text-indigo-400">src/services/api.ts</code> e substitua a URL base pela rota da sua API local (ex: http://localhost:3000/api).
            </AccordionItem>
            <AccordionItem title="Como adicionar novas telas?">
              Crie um novo arquivo em <code className="text-indigo-400">src/app/(dashboard)/sua-tela/page.tsx</code> e acesse pelo navegador.
            </AccordionItem>
          </div>
        </Card>
      </section>

      {/* Seção 5: Estado Vazio */}
      <EmptyState
        title="Nenhum item pendente"
        description="Esta é uma demonstração do componente EmptyState quando não há registros no banco de dados."
      />

      {/* Modal Demo */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Exemplo de Modal"
        footer={<Button onClick={() => setModalOpen(false)}>Entendi</Button>}
      >
        <p className="text-xs text-slate-300">
          Este é um modal de diálogo animado com suporte a fecho pela tecla ESC ou clique no fundo escuro.
        </p>
      </Modal>

      {/* Drawer Demo */}
      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} title="Painel Lateral (Drawer)">
        <p className="text-xs text-slate-300">
          Ideal para exibição de detalhes profundos de um registro sem sair da página atual!
        </p>
      </Drawer>

      {/* Toast Demo */}
      {toastVisible && (
        <Toast
          title="Toast Ativado!"
          message="Notificação rápida no canto da tela."
          type="info"
          onClose={() => setToastVisible(false)}
        />
      )}
    </div>
  );
}
