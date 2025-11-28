# AGENTS.md - NeonRealms

> Guia para agentes de IA que trabalham neste projeto

## Visao Geral do Projeto

**NeonRealms** e uma plataforma web de RPG assincrono com Mestre IA. Jogadores participam de campanhas de RPG de mesa com um agente de IA atuando como Mestre de Jogo.

### Stack Tecnologico

| Camada | Tecnologia |
|--------|------------|
| Frontend | Next.js 14+, React 18, TailwindCSS |
| Backend | Node.js/Bun, Express/Fastify |
| Banco de Dados | PostgreSQL + Prisma/Drizzle |
| Cache/Filas | Redis |
| Real-time | Socket.io/WebSocket |
| IA | Claude (Anthropic) / GPT-4 |
| Infra | Docker, Turborepo |

### Tema Base

Cyberpunk original com:
- Megacorporacoes
- Cibermodificacoes
- Conflitos de rua
- Hacks e infiltracoes
- Estetica neon

---

## Estrutura do Projeto

```
neonrealms/
├── apps/
│   ├── web/                 # Next.js frontend
│   └── api/                 # Backend API
├── packages/
│   ├── ui/                  # Componentes React compartilhados
│   ├── database/            # Schemas Prisma/Drizzle
│   ├── rules-engine/        # Motor de regras do jogo
│   ├── narrative-engine/    # Motor de IA (Mestre)
│   ├── theme-engine/        # Motor de temas
│   ├── types/               # TypeScript types compartilhados
│   └── config/              # ESLint, TSConfig, etc.
├── docker/                  # Dockerfiles
├── docs/                    # Documentacao
│   ├── rules/              # Regras do sistema de jogo
│   ├── api/                # Documentacao da API
│   └── architecture/       # Diagramas e decisoes
├── AGENTS.md               # Este arquivo
├── turbo.json
├── package.json
└── docker-compose.yml
```

---

## Sistema de Jogo

### Atributos (6)

| Atributo | Sigla | Descricao |
|----------|-------|-----------|
| Forca | FOR | Poder fisico, dano melee |
| Agilidade | AGI | Velocidade, reflexos, iniciativa |
| Intelecto | INT | Raciocinio, investigacao |
| Carisma | CAR | Influencia social |
| Hack | HAC | Habilidade cibernetica |
| Vitalidade | VIT | Resistencia, HP |

### Skills (8)

- Armas Leves (AGI)
- Armas Pesadas (FOR)
- Furtividade (AGI)
- Investigacao (INT)
- Hacking (HAC)
- Medicina (INT)
- Pilotagem (AGI)
- Engenharia (INT)

### Arquetipos

| Arquetipo | Bonus | Especializacao |
|-----------|-------|----------------|
| Netrunner | +2 HAC, +1 INT | Hacking |
| Street Samurai | +2 FOR, +1 AGI | Armas Leves |
| Techie | +2 INT, +1 HAC | Engenharia |
| Face | +2 CAR, +1 INT | Social |
| Operative | +2 AGI, +1 INT | Furtividade |
| Rigger | +2 HAC, +1 AGI | Pilotagem |

### Formulas Importantes

```typescript
// HP
maxHP = 10 + (vitalidade * 3) + (nivel * 2)

// Iniciativa
iniciativa = agilidade + roll("1d10")

// Defesa
defesa = 10 + Math.floor(agilidade / 2) + armadura

// Dano Melee
danoMelee = arma.dano + Math.floor(forca / 2)

// Dano Ranged
danoRanged = arma.dano + Math.floor(agilidade / 2)

// EXP para proximo nivel
expParaProximoNivel = nivelAtual * 100
```

### Dados

Suportados: d4, d6, d8, d10, d12, d20, d100

```typescript
// Notacao de dados
"2d6+3"   // 2 dados de 6 lados + 3
"1d20"    // 1 dado de 20 lados
"3d8-2"   // 3 dados de 8 lados - 2
```

---

## Arquitetura de Microservicos

### Rules Engine

Responsavel por:
- Rolagem de dados
- Calculos de combate
- Verificacoes de skill
- Progressao de personagem

```typescript
// Exemplo de uso
import { RulesEngine } from '@neonrealms/rules-engine';

const result = RulesEngine.roll("2d6+3");
const check = RulesEngine.skillCheck(character, "hacking", DC: 15);
const attack = RulesEngine.attackRoll(attacker, target, weapon);
```

### Narrative Engine (IA)

Responsavel por:
- Geracao de narrativa
- Controle de NPCs
- Resolucao de acoes
- Memoria de contexto

```typescript
// Exemplo de uso
import { NarrativeEngine } from '@neonrealms/narrative-engine';

const narration = await NarrativeEngine.narrate(gameContext);
const npcResponse = await NarrativeEngine.npcDialogue(npc, context);
const combatDescription = await NarrativeEngine.describeCombat(result);
```

**IMPORTANTE**: A IA NUNCA deve agir pelo jogador sem permissao explicita.

### Theme Engine

Responsavel por:
- Carregar temas (cyberpunk, fantasia, etc)
- Fornecer arquetipos, itens, inimigos
- Customizar UI por tema

---

## Convencoes de Codigo

### TypeScript

```typescript
// Sempre tipar explicitamente
interface Character {
  id: string;
  name: string;
  archetype: Archetype;
  attributes: Attributes;
  skills: Skills;
  level: number;
  experience: number;
  hp: number;
  maxHp: number;
}

// Usar enums para valores fixos
enum Archetype {
  NETRUNNER = 'netrunner',
  STREET_SAMURAI = 'street_samurai',
  TECHIE = 'techie',
  FACE = 'face',
  OPERATIVE = 'operative',
  RIGGER = 'rigger'
}
```

### Nomenclatura

- **Arquivos**: kebab-case (`character-service.ts`)
- **Componentes React**: PascalCase (`CharacterSheet.tsx`)
- **Funcoes/Variaveis**: camelCase (`calculateDamage`)
- **Constantes**: SCREAMING_SNAKE_CASE (`MAX_INVENTORY_SLOTS`)
- **Types/Interfaces**: PascalCase (`CharacterAttributes`)

### Testes

- Unitarios: `*.test.ts` ou `*.spec.ts`
- E2E: `*.e2e.ts`
- Cobertura minima: 80% para rules-engine

---

## Fluxos Principais

### 1. Criacao de Campanha

```
1. Usuario autenticado clica em "Nova Campanha"
2. Preenche nome, descricao
3. IA faz onboarding:
   - "Qual o tom da campanha?"
   - "Nivel de dificuldade?"
   - "Mais combate ou narrativa?"
4. Campanha criada com inviteCode unico
5. Usuario compartilha link com amigos
```

### 2. Criacao de Personagem

```
1. Jogador entra na campanha
2. Wizard de criacao:
   a. Escolhe arquetipo
   b. Distribui pontos de atributo (bonus do arquetipo aplicado)
   c. Escolhe skills iniciais
   d. Define nome e backstory (IA pode sugerir)
3. Ficha criada e associada a campanha
```

### 3. Loop de Jogo Assincrono

```
1. IA posta evento/narracao
2. Jogadores respondem quando puderem
3. IA processa acoes:
   - Chama Rules Engine para rolagens
   - Gera narrativa do resultado
   - Atualiza estado do mundo
4. Notificacoes enviadas
5. Repete
```

### 4. Combate

```
1. IA inicia combate
2. Calcula iniciativa de todos
3. Por turno:
   a. Jogador atual recebe notificacao
   b. Escolhe acao (atacar, usar item, hackear, correr)
   c. Rules Engine resolve
   d. IA narra resultado
   e. Proximo turno
4. Fim: vitoria, derrota ou fuga
```

---

## Integracao com IA (LLM)

### Prompts do Sistema

O Mestre IA usa prompts estruturados:

```typescript
const SYSTEM_PROMPT = `
Voce e o Mestre de uma campanha de RPG cyberpunk chamada NeonRealms.

REGRAS:
1. NUNCA jogue pelo jogador sem permissao
2. Mantenha coerencia com decisoes anteriores
3. Seja justo mas desafiador
4. Descreva cenas de forma imersiva
5. Use o tema cyberpunk (neon, megacorps, implantes)

CONTEXTO DA CAMPANHA:
{campaignContext}

PERSONAGENS:
{characterSheets}

HISTORICO RECENTE:
{recentHistory}
`;
```

### Rate Limiting

- Max 10 chamadas/minuto por campanha
- Cache de respostas similares (Redis)
- Fallback para modelo mais barato se necessario

---

## Banco de Dados

### Entidades Principais

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  avatar        String?
  provider      String
  providerId    String
  campaigns     CampaignMember[]
  characters    Character[]
}

model Campaign {
  id          String   @id @default(cuid())
  name        String
  theme       String   @default("cyberpunk")
  settings    Json
  inviteCode  String   @unique
  ownerId     String
  members     CampaignMember[]
  messages    Message[]
}

model Character {
  id          String   @id @default(cuid())
  name        String
  archetype   String
  level       Int      @default(1)
  attributes  Json
  skills      Json
  hp          Int
  maxHp       Int
  inventory   Json
  userId      String
  campaignId  String
}
```

---

## Comandos Uteis

```bash
# Desenvolvimento
npm run dev          # Inicia todos os apps
npm run dev:web      # Apenas frontend
npm run dev:api      # Apenas backend

# Build
npm run build        # Build de producao
npm run typecheck    # Verificacao de tipos

# Testes
npm run test         # Todos os testes
npm run test:rules   # Apenas rules-engine

# Docker
docker-compose up    # Ambiente completo
docker-compose down  # Parar tudo

# Database
npm run db:migrate   # Rodar migrations
npm run db:seed      # Popular com dados de teste
npm run db:studio    # Abrir Prisma Studio
```

---

## Issues e Epicos

### Epicos da V1

- #2 - Setup e Infraestrutura
- #3 - Sistema de Autenticacao
- #4 - Sistema de Campanhas
- #5 - Sistema de Personagens
- #6 - Motor de Regras
- #7 - Motor Narrativo (IA)
- #8 - Sistema de Chat
- #9 - Sistema de Combate
- #10 - Sistema de Inventario
- #11 - Motor de Temas
- #12 - Sistema de Notificacoes
- #13 - Frontend Web

### Ordem de Implementacao Sugerida

1. Setup inicial (monorepo, Docker) - #14, #15
2. Banco de dados - #16
3. Autenticacao - #17
4. Rules Engine basico - #18, #20
5. Sistema de campanhas - #4
6. Sistema de personagens - #5
7. Chat em tempo real - #21
8. Integracao com IA - #19
9. Sistema de combate - #9
10. Frontend completo - #13

---

## Seguranca

### Checklist

- [ ] Tokens OAuth armazenados de forma segura
- [ ] Validacao de input em todas as APIs
- [ ] Rate limiting em endpoints publicos
- [ ] Sanitizacao de markdown no chat
- [ ] Permissoes de sala verificadas
- [ ] API keys de IA em variaveis de ambiente
- [ ] CORS configurado corretamente

### Variaveis de Ambiente Sensiveis

```env
# NUNCA commitar esses valores
DATABASE_URL=
REDIS_URL=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_SECRET=
DISCORD_CLIENT_SECRET=
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
```

---

## Dicas para Agentes

1. **Leia o PRD completo** antes de fazer alteracoes significativas
2. **Consulte as issues** para entender o escopo de cada tarefa
3. **Mantenha os types atualizados** em `packages/types`
4. **Teste o Rules Engine** extensivamente - e o coracao do jogo
5. **A IA Mestre nunca age pelo jogador** - esta e uma regra inviolavel
6. **Prefira composicao sobre heranca** no codigo
7. **Documente decisoes arquiteturais** em `docs/architecture/`
8. **Use feature flags** para funcionalidades experimentais

---

## Links Uteis

- [GitHub Issues](https://github.com/9-realms-koder/prompts-and-dragons/issues)
- [Milestone V1](https://github.com/9-realms-koder/prompts-and-dragons/milestone/1)
- [Turborepo Docs](https://turbo.build/repo/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Claude API](https://docs.anthropic.com)
