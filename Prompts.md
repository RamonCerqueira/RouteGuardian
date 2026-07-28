Prompt 01 — Arquitetura do Projeto

Defina a arquitetura completa de um sistema SaaS de auditoria de entregas utilizando Next.js App Router, React, TypeScript, Tailwind CSS, Shadcn/UI, Prisma ORM e PostgreSQL. O sistema deve ser Multi Tenant, preparado para milhares de empresas, utilizando Clean Architecture, SOLID, Repository Pattern, Service Pattern e autenticação JWT. Organize o projeto por módulos (app, api, components, services, hooks, contexts, lib, prisma, validators, repositories, middlewares e utils). Configure Docker, variáveis de ambiente, Prisma, ESLint, Prettier e toda a estrutura inicial. O projeto deverá ser responsivo, Mobile First, compatível com Android, iPhone, tablets, desktop, PWA e preparado para publicação futura na Google Play e App Store utilizando Capacitor.

Prompt 02 — Banco de Dados

Projete todo o banco PostgreSQL utilizando Prisma ORM. Crie todas as tabelas, relacionamentos, índices, constraints, migrations e seed inicial. O sistema deverá possuir empresas, usuários, perfis, entregadores, veículos, clientes, endereços, rotas, entregas, checkpoints, histórico GPS, fotos, assinaturas, ocorrências, auditoria, notificações e configurações. Cada empresa deve possuir seus próprios dados completamente isolados.

Prompt 03 — Autenticação

Desenvolva todo o módulo de autenticação utilizando JWT, Refresh Token e RBAC. Criar login, logout, recuperação de senha, alteração de senha, gerenciamento de sessão e controle de permissões para Administrador, Supervisor e Entregador. Proteger todas as rotas do sistema utilizando Middlewares.

Prompt 04 — Painel Administrativo

Crie um painel administrativo moderno inspirado em Stripe, Linear, Vercel e Google Maps. O painel deverá possuir Dashboard, gráficos, mapas em tempo real, gerenciamento de usuários, empresas, entregadores, clientes, veículos, rotas, entregas, relatórios e configurações. Interface responsiva utilizando Shadcn/UI, Tailwind CSS e Framer Motion.

Prompt 05 — Aplicativo do Entregador

Desenvolva um aplicativo PWA para o entregador. Após o login ele deverá visualizar apenas sua rota do dia. Permitir iniciar rota, visualizar mapa, marcar entregas, registrar foto, assinatura, observações, ocorrências e GPS. O aplicativo deverá funcionar totalmente offline, sincronizando automaticamente quando houver internet. Interface otimizada para Android, iPhone e tablets.

Prompt 06 — GPS e Auditoria

Implemente o sistema de auditoria por GPS. Ao concluir uma entrega registrar latitude, longitude, precisão, velocidade, horário, direção e altitude quando disponível. Comparar automaticamente a localização real com a localização cadastrada do cliente utilizando Geofence configurável. Registrar sequência das entregas, distância entre pontos, desvios e gerar histórico completo.

Prompt 07 — Inteligência de Rotas

Implemente um motor de otimização utilizando OpenStreetMap e OSRM. Gerar automaticamente a melhor sequência considerando prioridade, distância, tempo e economia de combustível. Comparar rota planejada e rota executada, calcular quilômetros extras, tempo perdido, consumo adicional de combustível e percentual de eficiência.

Prompt 08 — Dashboard Analítico

Crie dashboards executivos com gráficos modernos mostrando produtividade, combustível, tempo perdido, desvios, pontualidade, ranking de entregadores, mapa em tempo real, replay da rota, score de eficiência e indicadores operacionais. Permitir exportação em PDF, Excel e CSV.

Prompt 09 — IA

Implemente um módulo de Inteligência Artificial que analise automaticamente as entregas do dia e gere relatórios como: entregas realizadas, tempo total, rota planejada, rota executada, quilômetros extras, desperdício estimado de combustível, tempo perdido, desvios encontrados e sugestões para melhorar a operação.

Prompt 10 — PWA

Transforme o projeto em um Progressive Web App completo. Configurar Manifest, Service Worker, Background Sync, Push Notifications, Splash Screen, instalação na tela inicial, cache offline, atualização automática e compatibilidade com Capacitor para futura publicação nas lojas oficiais.

Prompt 11 — UI/UX

Refatore toda a interface utilizando Design System próprio. Criar componentes reutilizáveis, tema Dark e Light, animações suaves, Skeleton Loading, feedback visual, navegação intuitiva e layout totalmente responsivo para desktop, tablets e smartphones, respeitando as Safe Areas do iPhone.

Prompt 12 — Finalização

Revise todo o projeto, elimine código duplicado, aplique boas práticas de segurança e desempenho, documente APIs, banco de dados, instalação, Docker, deploy e arquitetura. Entregue um sistema SaaS pronto para produção, escalável, seguro, com código limpo, documentação completa e preparado para comercialização.