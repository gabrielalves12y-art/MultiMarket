# 🧠 Regras de Desenvolvimento — Projeto UC07

## 📌 Descrição

Aplicação web de e-commerce integrada à Platzi Fake Store API, desenvolvida como simulação de entrega profissional.

---

## 🚀 Tecnologias

* [ ] HTML5 semântico
* [ ] CSS3 (Flexbox + Grid + Responsivo)
* [ ] JavaScript puro (sem frameworks)
* [ ] Fetch API
* [ ] localStorage (JWT)
* [ ] Git + GitHub
* [ ] Deploy (GitHub Pages ou Vercel)

---

## 🌳 Estratégia de Branch

* ❌ **Nunca trabalhar diretamente na `main`**
* ✅ A `main` é **somente para código estável**
* ✅ Todo desenvolvimento deve ser feito em branches

### 📌 Padrão de nome das branches

```bash
feature/carrinho
feature/autenticacao
feature/filtro-produtos
fix/erro-login
refactor/api-service
```

---

## 🔁 Fluxo de Trabalho (OBRIGATÓRIO)

Antes de começar qualquer tarefa:

```bash
git checkout main
git pull origin main
```

Depois:

```bash
git checkout -b feature/nome-da-feature
```

Durante o desenvolvimento:

```bash
git add .
git commit -m "feat: descrição clara do que foi feito"
```

Ao finalizar:

```bash
git push origin feature/nome-da-feature
```

---

## 🔀 Pull Requests (PR)

* Todo código deve passar por PR antes de entrar na `main`
* ❌ Proibido dar merge direto sem revisão
* ✅ O Líder Técnico revisa antes de aprovar

### 📌 Regras do PR:

* Explicar o que foi feito
* Listar endpoints alterados
* Informar possíveis impactos

---

## 🧾 Padrão de Commits (Conventional Commits)

### Tipos permitidos:

* `feat:` nova funcionalidade
* `fix:` correção de bug
* `refactor:` melhoria interna (sem mudar comportamento)
* `style:` mudanças visuais/CSS
* `docs:` documentação
* `chore:` tarefas internas

### ✅ Exemplos:

```bash
feat: adicionar listagem de produtos
fix: corrigir erro ao buscar categorias
refactor: reorganizar funções da API
style: ajustar layout responsivo da vitrine
```

### ❌ Evitar:

```bash
"arrumei coisa"
"update"
"teste"
```

---

## ⚠️ Regras Importantes

### 🔒 Segurança de código

* Nunca subir código quebrado
* Testar antes de commitar
* Sem erros no console

---

### 🧼 Qualidade

* Código deve ser legível
* Funções com nomes claros
* Sem código morto
* Sem console.log desnecessário

---

### 🔄 Sincronização

* Sempre dar `pull` antes de começar
* Sempre dar `pull` antes de abrir PR
* Resolver conflitos com atenção

---

### 🚫 Proibições

* ❌ Commit direto na `main`
* ❌ Merge sem PR
* ❌ Código não testado
* ❌ Ignorar erros da API
* ❌ Trabalhar em cima de código desatualizado

---

## 👥 Responsabilidade da Equipe

### 💻 Desenvolvedores

* Criar branch própria
* Fazer commits claros
* Testar tudo antes de subir
* Participar da revisão

---

### 🧠 Líder Técnico

* Revisar PRs
* Garantir padrão de código
* Validar funcionamento
* Garantir que ninguém quebre a main

---

## 🚀 Boas Práticas (Diferencial)

* Commits pequenos e frequentes
* Uma feature por branch
* Nome de branch descritivo
* Sempre explicar mudanças no PR

---

## 🧪 Regra de Ouro

> “Se quebrou algo na main, a equipe inteira para para corrigir.”

---

## 📊 Fluxo Visual (Resumo)

```text
main (estável)
   ↑
merge via PR
   ↑
feature/nome-da-feature
```

---

### 🔍 Checklist antes do PR

* [ ] Testei tudo manualmente
* [ ] Sem erros no console
* [ ] Código organizado
* [ ] Segui padrão de commits
* [ ] Atualizei a main antes

---

# 📁 Estrutura de Pastas do Projeto

## 📦 Padrão Base

```bash
/
├── index.html
├── src/
│   ├── css/
│   │   ├── main.css
│   │   ├── home.css
│   │   ├── catalog.css
│   │   ├── cart.css
│   │   ├── auth.css
│   │   └── ...
│   │
│   ├── js/
│   │   ├── app.js
│   │   ├── home.js
│   │   ├── catalog.js
│   │   ├── cart.js
│   │   ├── auth.js
│   │   ├── api.js
│   │   ├── storage.js
│   │   └── ...
│   │
│   └── assets/
│       ├── img/
│           ├── nome-decritivo.png
│       └── icons/
│           ├── nome-decritivo.svg
```

---

## 🔗 Endpoints (OBRIGATÓRIOS)

### 📦 Produtos

* [ ] GET /products (listar produtos)
* [ ] GET /products?offset=N&limit=12 (paginação)
* [ ] GET /products?categoryId=:id (filtro por categoria)
* [ ] GET /products?title=:q (busca)
* [ ] GET /products?price_min=X&price_max=Y (filtro por preço)
* [ ] GET /products/:id (detalhe do produto)
* [ ] GET /products/:id/related (produtos relacionados)
* [ ] POST /products (criar produto)
* [ ] PUT /products/:id (editar produto)
* [ ] DELETE /products/:id (deletar produto)

### 📂 Categorias

* [ ] GET /categories (listar categorias)

### 👤 Usuários

* [ ] POST /users (criar usuário)
* [ ] POST /users/is-available (verificar e-mail)

### 🔐 Autenticação

* [ ] POST /auth/login
* [ ] GET /auth/profile

---

## 🔑 Observações Técnicas

* Token JWT deve ser salvo no localStorage
* Requests autenticados devem usar:

```js
headers: {
  Authorization: 'Bearer ' + localStorage.getItem('token')
}
```

---

## 🧠 Regra de Organização

### 📌 1. Separação por responsabilidade

* `index.html` → estrutura principal
* `css/` → estilos separados por funcionalidade
* `js/` → lógica separada por feature
* `assets/` → arquivos estáticos

---

## 🧩 Modularização (REGRA IMPORTANTE)

Cada funcionalidade deve ter **seu próprio arquivo JS e CSS**.

### ✅ Exemplo correto:

```bash
catalog.js
catalog.css

cart.js
cart.css

auth.js
auth.css
```

---

### ❌ Errado (bagunça futura):

```bash
app.js com 1000 linhas
main.css com tudo misturado
```

---

## ⚙️ Arquivos principais

### 🔹 `app.js`

* Arquivo central da aplicação
* Inicializa tudo
* Controla navegação geral

---

### 🔹 `api.js`

* Responsável por todas as chamadas `fetch`
* Centraliza endpoints

---

### 🔹 `storage.js`

* Gerencia localStorage (token, dados do usuário)

---

## 🔄 Padrão de crescimento

Sempre que criar uma nova feature:

1. Criar JS:

```bash
feature-nome.js
```

2. Criar CSS:

```bash
feature-nome.css
```

3. Integrar no HTML ou `app.js`

---

## 🧼 Regras de Código

### 📌 Nomeação de arquivos

* Sempre em **kebab-case**

```bash
product-detail.js
user-profile.js
```

---

### 📌 Organização interna do JS

Cada arquivo deve conter:

* Funções relacionadas à feature
* Manipulação de DOM da feature
* Consumo da API (via api.js)

---

## ⚠️ Regras importantes

* ❌ Não misturar lógica de diferentes features no mesmo arquivo
* ❌ Não criar arquivos genéricos sem necessidade
* ❌ Não duplicar código entre arquivos
* ✅ Reutilizar funções sempre que possível

---

## 🔥 Baseado no seu print (ajuste profissional)

Você já está próximo do ideal, mas recomendo padronizar:

### ❌ Atual (problema)

* Muitos `index-*`
* Nomes inconsistentes
* Mistura de responsabilidade

---

### ✅ Ideal (padronizado)

```bash
js/
├── app.js
├── home.js
├── catalog.js
├── product.js
├── cart.js
├── auth.js
├── profile.js
├── api.js
├── storage.js
```

---

## 💡 Regra de ouro

> "Um arquivo = uma responsabilidade clara"

---

## 🚀 Extra (nível Tech Lead de verdade)

Define isso pra equipe:

### 📌 Limite saudável

* JS: até ~300 linhas por arquivo
* CSS: até ~300–500 linhas

Se passar disso → quebrar em módulos

---

## 📊 Benefício disso

* Evita conflito no Git
* Facilita manutenção
* Equipe trabalha em paralelo sem se atrapalhar
* Código fica profissional (isso pesa na avaliação)

---
