# TECH CHALLENGE

## FASE 01

Aplicação de gerenciamento financeiro com **Next.js** e **Material UI** (Design System), dados mockados via API Routes em memória.

### ⚙️ Instalação e Execução

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd tech
npm install
npm run dev
```

Acesse: http://localhost:3000

### Limpar cache (mudanças não aparecem no navegador)

`npm run start` **não recompila** — só serve a pasta `.next` do último `npm run build`.

```powershell
# Pare o servidor (Ctrl+C), depois:
npm run build:clean
$env:PORT=3002; npm run start
```

No navegador: **Ctrl+Shift+R** ou aba anônima. Em desenvolvimento use **`npm run dev`** (atualiza ao salvar).

### 🚀 Fluxo de Uso

1. **Home (/)** — Saldo, extrato das últimas 5 transações, formulário rápido de nova transação (tipo + valor; data automática = hoje).
2. **Transações (/transactions)** — Lista completa com ver detalhes, editar (modal) e excluir; formulário completo com data.
3. Saldo recalculado automaticamente a cada alteração nas transações.

### 🎨 Cores

| Onde | O que controla |
|------|----------------|
| **`lib/tokens.js`** | **Edite aqui** — fonte única (MUI + variáveis CSS) |
| `lib/theme.js` | Tema Material UI (`primary`, `secondary`, fundo…) |
| `styles/globals.css` | Variáveis `--cor-*` (fallback; sincronize com `tokens.js`) |
| `sx={{ color: "primary.main" }}` | Botões, AppBar, cards — vêm do tema MUI |

Alterar só `globals.css` **não** muda botões MUI. Use `lib/tokens.js` e rode `npm run build` (ou `npm run dev`).

### 📂 Estrutura (estilo Angular)

No React não existe `.html` separado — o “template” é JSX em arquivos `.js`. A separação fica assim:

| Angular | Este projeto |
|---------|----------------|
| `*.component.ts` (lógica) | `hooks/*.js` |
| `*.component.html` (template) | `views/*.js` e `components/forms/*View.js` |
| `*.component.css` | MUI `sx` / `styles/globals.css` |
| rota | `pages/*.js` (só conecta hook + view) |

```
hooks/              # Lógica (estado, API, handlers)
views/              # Templates das páginas (só JSX)
components/         # Peças reutilizáveis (Layout, lista, dialogs)
components/forms/   # Template do formulário
lib/                # Tema, formatação, API client
pages/              # Rotas finas: hook + view
  api/              # Mock em memória
```

Exemplo — `pages/index.js`:

```js
const controller = useTransactionsManager({ withSaldo: true, recentLimit: 5 });
return <HomeView {...controller} />;
```

### 📡 Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/transactions` | Lista transações |
| POST | `/api/transactions` | Cria transação |
| PUT | `/api/transactions` | Atualiza transação |
| DELETE | `/api/transactions` | Remove por `id` |
| GET | `/api/saldo` | Saldo calculado |

**Body POST/PUT:**

```json
{
  "tipo": "depósito",
  "valor": 500,
  "data": "2026-05-16"
}
```

PUT exige também `"id": 1`.

Tipos disponíveis: depósito, transferência, câmbio, doc/ted, empréstimo. Transferências gravam valor negativo automaticamente.

### ✅ Requisitos do desafio

- [x] Saldo, extrato e nova transação
- [x] Listagem com detalhes, editar e deletar
- [x] Adicionar transação (página + home)
- [x] Editar transação (modal)
- [x] Next.js + MUI
- [x] Dados mockados (API em memória, fonte única)
