# CoinBank

Aplicação web de banco digital simulado, construída como teste técnico com foco em organização, UX profissional e boas práticas de engenharia frontend.

---

## Credenciais de Demo

```
E-mail:  user@coinbank.com
Senha:   password123
```

---

## Como rodar

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Testes
npm run test

# Build de produção
npm run build
```

> Acesse `http://localhost:5173`

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite 6 |
| Estilos | Tailwind CSS v4 + CVA |
| Componentes | shadcn/ui + Radix |
| Roteamento | React Router v7 |
| Estado global | Zustand (com `persist`) |
| Dados assíncronos | TanStack React Query v5 |
| HTTP | Axios + axios-mock-adapter |
| Formulários | React Hook Form + Zod |
| Testes | Vitest + Testing Library |

---

## Estrutura do projeto

```
src/
├── app/
│   ├── App.tsx              # Providers + roteamento
│   └── router/              # ProtectedRoute
├── components/
│   ├── layout/              # AppShell (sidebar + topbar mobile)
│   └── ui/                  # shadcn/ui (re-exportados)
├── features/
│   ├── auth/                # Login: schema, store, service, hook, componente
│   ├── dashboard/           # Saldo e extrato: tipos, serviço, hooks, componentes
│   └── transfer/            # Transferência: schema, serviço, hook, componente
├── lib/
│   ├── axios.ts             # Instância Axios + mock adapter
│   ├── storage.ts           # localStorage type-safe
│   └── utils.ts             # cn(), formatCurrency(), formatDate()
├── mocks/
│   ├── data/                # Usuários, contas, transações mockadas
│   └── handlers/            # Handlers Axios: auth, dashboard, transfer
├── pages/                   # LoginPage, DashboardPage, TransferPage
├── tests/                   # Vitest: schema, store, componente
└── types/                   # Tipos globais compartilhados
```

---

## Decisões técnicas

### Mocks com Axios
Optei por `axios-mock-adapter` ao invés de MSW para manter a solução zero-config em qualquer ambiente (sem necessidade de Service Worker). Os handlers simulam latência real de 800ms e validam regras de negócio (saldo insuficiente).

### Persistência via Zustand + localStorage
A sessão de autenticação é mantida no Zustand com middleware `persist`. O saldo e novas transações são salvos no localStorage via `storage.ts` e relidos pelos handlers a cada request — garantindo consistência entre sessões.

### React Query como camada de cache
Queries de conta e transações têm `staleTime: 0`. Após uma transferência bem sucedida, `invalidateQueries` força o refetch automático — mantendo a UI sincronizada sem estado manual.

### Sem `AuthProvider` separado
O Zustand com `persist` já cobre a necessidade de estado global de autenticação sem um Provider adicional. O `ProtectedRoute` lê diretamente do store.

### Formulários desacoplados
`LoginForm` e `TransferForm` são componentes puramente de apresentação + RHF. Os efeitos colaterais (toast, navegação, invalidação de cache) ficam nos hooks `useLogin` e `useTransfer`.

---

## Testes

| Arquivo | Cobertura |
|---|---|
| `transferSchema.test.ts` | 7 casos: schema Zod (válido, sem descrição, destinatário vazio, valor ≤ 0, coerção de string) |
| `authStore.test.ts` | 4 casos: estado inicial, setSession, clearSession, sobrescrita de sessão |
| `TransferForm.test.tsx` | 4 casos: renderização, erro por submissão vazia, erro de valor zero, chamada do mutate com dados corretos |

```bash
npm run test
```

---

## Melhorias futuras

- Autenticação real com JWT + refresh token
- Tela de histórico com filtros e paginação
- Gráficos de gastos por categoria
- Suporte a múltiplas contas/cartões
- Notificações push para transações
- Internacionalização (i18n)
- Testes E2E com Playwright
- CI/CD com validação de cobertura mínima

---

## Segurança

### Proteção contra engenharia reversa

Em produção, o bundle JavaScript pode ser dificultado (não impossibilitado) com:

- **Minificação e ofuscação** via `terser` (já incluso no Vite em modo production)
- **Code splitting** — divide a app em chunks menores e mais difíceis de analisar integralmente
- **Variáveis de ambiente** — `import.meta.env.VITE_*` garante que segredos não entrem no bundle se gerenciados corretamente (nunca secrets reais no client)
- **CSP (Content Security Policy)** — headers HTTP para bloquear execução de scripts não autorizados
- Em ambientes críticos: Source maps devem ser desabilitados em production ou enviados apenas para ferramentas internas (Sentry, Datadog)

### Proteção contra vazamento de dados

- **NUNCA armazenar tokens ou dados sensíveis em `localStorage` em produção real** — usar cookies `HttpOnly` + `Secure` + `SameSite=Strict`, que não são acessíveis via JavaScript
- **Comunicação exclusiva por HTTPS** — certificado TLS obrigatório
- **Tokens com expiração curta** + mecanismo de refresh silencioso
- **CORS restritivo** no servidor — aceitar apenas origens confiáveis
- **Sanitização de dados** — nunca renderizar HTML não escapado (`dangerouslySetInnerHTML`)
- **Auditoria de dependências** — `npm audit` regular; usar `Dependabot` ou `Socket.dev`
- **Logs sem dados sensíveis** — nunca logar senhas, tokens ou dados financeiros crus
- **Rate limiting** no backend para operações financeiras — proteção contra força bruta e fraude
