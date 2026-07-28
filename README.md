# 🚀 PastaBase Frontend - Starter Kit para Desenvolvedores Backend

Bem-vindo(a) à **PastaBase**! Este projeto foi desenvolvido especialmente para você, desenvolvedor backend, que precisa criar interfaces modernas, rápidas e profissionais sem se preocupar em escrever CSS complexo do zero.

---

## ⚡ Como Rodar o Projeto

1. **Abra o terminal na pasta do projeto**:
   ```bash
   cd pastaBase
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

O navegador abrirá automaticamente em `http://localhost:3000`.

---

## 📁 Estrutura de Arquivos Simplificada

```text
pastaBase/
├── src/
│   ├── components/
│   │   ├── ui/               # Todos os 25+ componentes de UI prontos para uso
│   │   │   ├── Button.tsx    # Botões (Primário, Secundário, Perigo, Loading)
│   │   │   ├── Input.tsx     # Campos de texto, e-mail, senha com ícones
│   │   │   ├── Table.tsx     # Tabela responsiva zebrada
│   │   │   ├── Modal.tsx     # Diálogos pop-up
│   │   │   ├── Card.tsx      # Cards de conteúdo com bordas modernas
│   │   │   ├── StatCard.tsx  # Métricas e KPIs (Faturamento, Usuários)
│   │   │   ├── Badge.tsx     # Pílulas de status (Ativo, Pendente, Erro)
│   │   │   ├── Alert.tsx     # Banners de aviso inline
│   │   │   └── Toast.tsx     # Notificações no canto da tela
│   │   └── layout/           # Sidebar, Header e PageHeader
│   ├── pages/                # Telas completas prontas para copiar e adaptar
│   │   ├── DashboardPage.tsx
│   │   ├── UsersCRUDPage.tsx
│   │   ├── FormExamplePage.tsx
│   │   └── ComponentsShowcasePage.tsx
│   ├── services/
│   │   └── api.ts            # Cliente REST para conectar ao seu Backend
│   └── App.tsx               # Roteamento e layout principal
```

---

## 🌐 Como Conectar com seu Backend REST API

No arquivo `src/services/api.ts`, configure a URL base do seu servidor:

```typescript
import { api } from '../services/api';

// Exemplo 1: Fazer um GET para buscar dados
const response = await api.get('/usuarios');
if (response.success) {
  console.log('Dados do backend:', response.data);
} else {
  console.error(response.message);
}

// Exemplo 2: Fazer um POST com JSON
const response = await api.post('/usuarios', {
  name: 'Novo Usuário',
  email: 'usuario@email.com'
});
```

*O cliente HTTP inclui automaticamente o Token JWT salvo no `localStorage` sob o cabeçalho `Authorization: Bearer <token>`.*

---

## 🧱 Guia Rápido de Componentes (Copy & Paste)

### 1. Botão com Ícone e Carregamento
```tsx
import { Button } from '../components/ui/Button';
import { Plus } from 'lucide-react';

<Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
  Cadastrar Item
</Button>

// Botão no estado de Carregamento
<Button variant="primary" isLoading>
  Salvando...
</Button>
```

### 2. Campo de Entrada de Texto (Input)
```tsx
import { Input } from '../components/ui/Input';
import { Mail } from 'lucide-react';

<Input
  label="Seu E-mail"
  type="email"
  placeholder="exemplo@empresa.com"
  leftIcon={<Mail className="w-4 h-4" />}
  error="E-mail inválido" // opcional
/>
```

### 3. Tabela de Dados Completa
```tsx
import { Table, Column } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';

const columns: Column<User>[] = [
  { header: 'Nome', accessorKey: 'name' },
  { header: 'E-mail', accessorKey: 'email' },
  {
    header: 'Status',
    cell: (user) => <Badge variant="success">Ativo</Badge>
  }
];

<Table columns={columns} data={meusDadosDoBackend} />
```

### 4. Card de Métrica (StatCard)
```tsx
import { StatCard } from '../components/ui/Badge';
import { DollarSign } from 'lucide-react';

<StatCard
  title="Vendas Hoje"
  value="R$ 1.450,00"
  change={12.5} // +12.5%
  icon={<DollarSign className="w-5 h-5" />}
/>
```

---

## 🎨 Alterando Temas (Claro / Escuro)

A interface possui suporte nativo ao modo escuro e claro. Você pode alternar clicando no ícone de Sol/Lua no topo da tela.

---

## 🛠️ Como Criar uma Nova Tela em 3 Passos

1. Crie o arquivo `src/pages/MinhaNovaPage.tsx`.
2. Use o `PageHeader` e monte seu layout usando os `Card`, `Table` e `Button`.
3. Em `src/App.tsx`, adicione a chave da sua nova página no `renderPage()`.

Pronto! Boa navegação e bons desenvolvimentos! 🚀
