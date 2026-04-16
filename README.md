# MFE Carrinho

Microfrontend Angular do estudo de arquitetura (TCC), preparado para integracao via Module Federation.

## Resumo

- Projeto: `mfe-carrinho`
- Stack principal: Angular 15 + TypeScript
- Builder: `ngx-build-plus`
- Federacao: `@angular-architects/module-federation`
- Porta de execucao local: `4201`

## Tecnologias

| Tecnologia | Versao |
|-----------|--------|
| Angular | ^15.2.0 |
| Angular CLI | ~15.2.11 |
| TypeScript | ~4.9.4 |
| RxJS | ~7.8.0 |
| Module Federation | ^21.2.2 |
| Karma + Jasmine | 6.4 / 4.5 |

## Scripts

| Script | Descricao |
|--------|-----------|
| `npm start` | Sobe o app em desenvolvimento (`ng serve`) |
| `npm run build` | Gera build de producao |
| `npm run watch` | Build continuo em modo desenvolvimento |
| `npm test` | Executa testes unitarios |

## Como executar

### 1. Instalar dependencias

```bash
npm install
```

### 2. Rodar em desenvolvimento

```bash
npm start
```

Acesse: `http://localhost:4201`

### 3. Build

```bash
npm run build
```

Saida: `dist/mfe-carrinho`

### 4. Testes

```bash
npm test
```

## Module Federation

Configuracao atual em `webpack.config.js`:

- `name`: `cartoes`
- `exposes`:
	- `./Module` -> `./src/app/app.module.ts`

Endpoint esperado do remoto em dev:

`http://localhost:4201/remoteEntry.js`

## Estrutura resumida

```text
mfe-carrinho/
|-- src/
|   |-- app/
|   |   |-- app.module.ts
|   |   |-- app-routing.module.ts
|   |   |-- app.component.*
|   |-- main.ts
|   |-- bootstrap.ts
|   |-- styles.scss
|-- angular.json
|-- webpack.config.js
|-- webpack.prod.config.js
|-- package.json
`-- README.md
```

## Observacoes

- O projeto esta configurado para servir em `4201` via `angular.json`.
- O nome federado atual (`cartoes`) deve estar alinhado com o shell que consome este remoto.

---

Ultima atualizacao: Abril de 2026
