# Deploy NeonRealms no Railway

Guia para fazer deploy do NeonRealms usando Railway.

## Pre-requisitos

- Conta no [Railway](https://railway.app)
- Repositorio conectado ao GitHub

## Passo a Passo

### 1. Criar Projeto no Railway

1. Acesse [railway.app](https://railway.app)
2. Clique em **New Project**
3. Selecione **Deploy from GitHub repo**
4. Conecte o repositorio `prompts-and-dragons`

### 2. Configurar Servico da API

1. No projeto, clique em **Add Service** > **GitHub Repo**
2. Selecione o mesmo repositorio
3. Nas configuracoes do servico:
   - **Root Directory**: `apps/api`
   - **Build Command**: `cd ../.. && npm ci && npm run build --workspace=@neonrealms/api`
   - **Start Command**: `cd ../.. && npm run start --workspace=@neonrealms/api`

4. Variaveis de ambiente:
   ```
   PORT=4000
   NODE_ENV=production
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   REDIS_URL=${{Redis.REDIS_URL}}
   ```

### 3. Configurar Servico Web

1. Clique em **Add Service** > **GitHub Repo**
2. Selecione o mesmo repositorio
3. Nas configuracoes do servico:
   - **Root Directory**: `apps/web`
   - **Build Command**: `cd ../.. && npm ci && npm run build --workspace=@neonrealms/web`
   - **Start Command**: `cd ../.. && npm run start --workspace=@neonrealms/web`

4. Variaveis de ambiente:
   ```
   NEXT_PUBLIC_API_URL=https://<sua-api>.railway.app
   ```

### 4. Adicionar Banco de Dados

1. Clique em **Add Service** > **Database** > **PostgreSQL**
2. O Railway criara automaticamente a variavel `DATABASE_URL`

### 5. Adicionar Redis (Opcional)

1. Clique em **Add Service** > **Database** > **Redis**
2. O Railway criara automaticamente a variavel `REDIS_URL`

## Estrutura do Projeto no Railway

```
NeonRealms (Projeto)
├── api (Servico)
│   └── apps/api
├── web (Servico)
│   └── apps/web
├── PostgreSQL (Database)
└── Redis (Database)
```

## Variaveis de Ambiente

### API (`apps/api`)

| Variavel | Descricao | Exemplo |
|----------|-----------|---------|
| `PORT` | Porta do servidor | `4000` |
| `NODE_ENV` | Ambiente | `production` |
| `DATABASE_URL` | URL do PostgreSQL | Automatico |
| `REDIS_URL` | URL do Redis | Automatico |

### Web (`apps/web`)

| Variavel | Descricao | Exemplo |
|----------|-----------|---------|
| `NEXT_PUBLIC_API_URL` | URL da API | `https://api.railway.app` |

## Dominio Customizado

1. Va nas configuracoes do servico
2. Clique em **Settings** > **Networking**
3. Adicione seu dominio customizado
4. Configure o DNS no seu provedor

## Monitoramento

- **Logs**: Clique no servico > **Deployments** > **View Logs**
- **Metricas**: Clique no servico > **Metrics**
- **Health Check**: A API expoe `/health` para verificacao

## Troubleshooting

### Build falha com "Cannot find module"

Verifique se o `buildCommand` inclui `npm ci` na raiz do monorepo.

### API nao conecta ao banco

1. Verifique se a variavel `DATABASE_URL` esta configurada
2. Use a sintaxe `${{Postgres.DATABASE_URL}}` para referenciar

### Web nao conecta a API

1. Verifique se `NEXT_PUBLIC_API_URL` aponta para a URL correta da API
2. Certifique-se que a API permite CORS da origem do frontend
