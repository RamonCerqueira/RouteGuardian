"use client";

import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { TextArea, Select } from '@/components/ui/TextArea';
import { Checkbox, Switch, FileUpload } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Mail, Lock, Save, FileText } from 'lucide-react';

export default function FormExamplePage() {
  const [loading, setLoading] = useState(false);
  const [successBanner, setSuccessBanner] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    email: '',
    password: '',
    category: 'tech',
    bio: '',
    agreeTerms: false,
    notificationsEnabled: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccessBanner(true);
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Formulário Completo"
        description="Exemplo de captura de dados com validação, estado de carregamento e uploads."
      />

      {successBanner && (
        <Alert variant="success" title="Formulário Enviado!" onClose={() => setSuccessBanner(false)}>
          Os dados foram enviados com sucesso para o endpoint backend.
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Card title="Dados do Projeto / Perfil" subtitle="Preencha os campos abaixo com as informações solicitadas">
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                label="Título do Projeto"
                placeholder="Ex: Sistema de Vendas"
                leftIcon={<FileText className="w-4 h-4" />}
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />

              <Input
                label="E-mail de Contato"
                type="email"
                placeholder="contato@empresa.com"
                leftIcon={<Mail className="w-4 h-4" />}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                label="Senha de Acesso API"
                type="password"
                placeholder="••••••••"
                leftIcon={<Lock className="w-4 h-4" />}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />

              <Select
                label="Categoria do Sistema"
                options={[
                  { label: 'Tecnologia / Software', value: 'tech' },
                  { label: 'Finanças / Gateway', value: 'finance' },
                  { label: 'E-commerce / Vendas', value: 'sales' },
                ]}
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
            </div>

            <TextArea
              label="Descrição Detalhada"
              placeholder="Escreva um breve resumo técnico..."
              maxLength={300}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />

            <FileUpload label="Anexo / Documentação em PDF" />

            <div className="pt-4 border-t border-slate-800 space-y-4">
              <Switch
                label="Notificações Automáticas"
                description="Receber e-mails de alerta quando ocorrerem erros de servidor"
                checked={formData.notificationsEnabled}
                onChange={(v) => setFormData({ ...formData, notificationsEnabled: v })}
              />

              <Checkbox
                label="Concordo com os Termos de Serviço e Política de Privacidade"
                description="Você pode cancelar sua assinatura a qualquer momento"
                checked={formData.agreeTerms}
                onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
              />
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                type="submit"
                isLoading={loading}
                leftIcon={<Save className="w-4 h-4" />}
                size="lg"
              >
                Salvar Cadastro
              </Button>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
}
