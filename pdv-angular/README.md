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

1. Faça o build para GitHub Pages:
   ```bash
   npm run build:github
   ```

2. Copie o conteúdo de `dist/pdv-angular/browser` para a pasta `docs` na raiz do projeto

3. Configure o GitHub Pages no repositório para usar a pasta `docs`

4. Ou use o GitHub Actions para automatizar o deploy

## Notas

- Este é um projeto POC, todos os dados são mockados
- O projeto está configurado para funcionar no GitHub Pages com baseHref `/pdv/`
- Se o repositório tiver outro nome, ajuste o `baseHref` no `angular.json`
