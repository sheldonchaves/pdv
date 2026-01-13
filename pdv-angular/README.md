# PDV Angular - POC E-commerce

Projeto POC de um PDV (Ponto de Venda) para e-commerce desenvolvido em Angular.

## Funcionalidades

- 🏠 **Home**: Catálogo de produtos com categorias, busca e carrinho lateral
- 📦 **Detalhe do Produto**: Visualização detalhada com especificações e estoque por loja
- 💳 **Checkout**: Finalização de pagamento com múltiplas formas de pagamento

## Tecnologias

- Angular 21
- Tailwind CSS
- TypeScript
- RxJS (Signals)

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm start
```

A aplicação estará disponível em `http://localhost:4200`

## Build para Produção

```bash
npm run build
```

## Build para GitHub Pages

```bash
npm run build:github
```

Após o build, copie o conteúdo da pasta `dist/pdv-angular/browser` para a pasta `docs` do repositório (ou configure o GitHub Pages para usar a pasta `dist/pdv-angular/browser`).

## Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── home/              # Página principal com catálogo
│   │   ├── product-detail/   # Detalhes do produto
│   │   ├── checkout/         # Finalização de pagamento
│   │   └── shared/            # Componentes compartilhados (CartSidebar)
│   ├── models/               # Interfaces e modelos
│   ├── services/             # Services com dados mockados
│   └── app.routes.ts         # Configuração de rotas
├── styles.css                # Estilos globais (Tailwind)
└── index.html
```

## Dados Mockados

Todos os dados são mockados nos services:
- `ProductService`: Produtos e categorias
- `CartService`: Gerenciamento do carrinho
- `OrderService`: Pedidos e formas de pagamento
- `UserService`: Usuário logado

## Deploy no GitHub Pages

### Deploy Automático (Recomendado)

O projeto está configurado com GitHub Actions para deploy automático:

1. **Configure o GitHub Pages no repositório:**
   - Vá em Settings > Pages
   - Em "Source", selecione "GitHub Actions"

2. **Faça push para a branch main/master:**
   ```bash
   git add .
   git commit -m "Deploy inicial"
   git push origin main
   ```

3. O workflow `.github/workflows/deploy.yml` irá:
   - Fazer build do projeto automaticamente
   - Fazer deploy no GitHub Pages
   - O site estará disponível em: `https://[seu-usuario].github.io/pdv/`

### Deploy Manual

Se preferir fazer deploy manual:

1. Faça o build para GitHub Pages:
   ```bash
   npm run build:github
   ```

2. Copie o conteúdo de `dist/pdv-angular/browser` para a pasta `docs` na raiz do projeto

3. Configure o GitHub Pages no repositório para usar a pasta `docs`

### Configuração do baseHref

- O projeto está configurado para funcionar no GitHub Pages com `baseHref: '/pdv/'`
- Se o repositório tiver outro nome, ajuste o `baseHref` no `angular.json` na configuração `github-pages`
- Exemplo: se o repositório for `meu-pdv`, altere para `baseHref: '/meu-pdv/'`

## Notas

- Este é um projeto POC, todos os dados são mockados
- O deploy automático é feito a cada push na branch main/master
- O workflow usa Node.js 20 e npm ci para builds mais rápidos e confiáveis
