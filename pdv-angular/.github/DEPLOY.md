# Guia de Deploy no GitHub Pages

## Configuração Inicial

### 1. Habilitar GitHub Pages

1. Vá para o repositório no GitHub
2. Acesse **Settings** > **Pages**
3. Em **Source**, selecione **GitHub Actions** (não "Deploy from a branch")
4. Salve as configurações

### 2. Configurar o baseHref

O projeto está configurado com `baseHref: '/pdv/'` no `angular.json`.

**Se o nome do seu repositório for diferente de `pdv`:**

1. Edite `angular.json`
2. Na configuração `github-pages`, altere o `baseHref`:
   ```json
   "github-pages": {
     "baseHref": "/nome-do-seu-repositorio/",
     ...
   }
   ```

### 3. Fazer o Primeiro Deploy

1. Adicione e faça commit dos arquivos:
   ```bash
   git add .
   git commit -m "Configurar deploy automático"
   git push origin main
   ```

2. O workflow será executado automaticamente

3. Verifique o progresso em **Actions** no GitHub

4. Após o deploy, o site estará disponível em:
   ```
   https://[seu-usuario].github.io/pdv/
   ```

## Como Funciona

O workflow `.github/workflows/deploy.yml`:

1. **Trigger**: Executa automaticamente em push para `main` ou `master`
2. **Build**: 
   - Instala dependências com `npm ci`
   - Faz build com `npm run build:github`
   - Gera os arquivos em `dist/pdv-angular/browser`
3. **Deploy**: 
   - Faz upload dos arquivos para GitHub Pages
   - O deploy é feito automaticamente

## Deploy Manual (Opcional)

Se precisar fazer deploy manual:

```bash
cd pdv-angular
npm run build:github
# Os arquivos estarão em dist/pdv-angular/browser
```

## Troubleshooting

### O site não carrega

- Verifique se o `baseHref` está correto no `angular.json`
- Verifique se o GitHub Pages está habilitado
- Veja os logs em **Actions** > **Deploy to GitHub Pages**

### Erro de build

- Verifique se todas as dependências estão no `package.json`
- Execute `npm install` localmente para testar
- Verifique os logs do workflow em **Actions**

### Rotas não funcionam

- Certifique-se de que o `baseHref` está configurado corretamente
- O Angular Router precisa do `baseHref` para funcionar no GitHub Pages

## Estrutura do Workflow

```
.github/workflows/deploy.yml
├── Trigger: push para main/master
├── Job: build
│   ├── Checkout código
│   ├── Setup Node.js 20
│   ├── Install dependencies
│   ├── Build projeto
│   └── Upload artifact
└── Job: deploy
    └── Deploy para GitHub Pages
```
