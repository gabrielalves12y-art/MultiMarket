# MultiMarket — Projeto UC07

### 👥 Distribuição inteligente (baseado no projeto)

---

👤 André (UI + base visual)
Filtros + Busca (já definido)
Loading + Empty State
Responsividade
👉 3 tarefas (leve/médio → ok)

---

👤 Amsterdam (backend heavy)
CRUD Produtos
Auth
Categorias (API + integração)
👉 3 tarefas (pesado → ok, mas coerente)

---

👤 Emerson (fluxo de listagem)
Vitrine
Paginação
👉 2 tarefas (médio/pesado → equilibrado)

---

👤 Pedro (detalhamento)
Detalhe do Produto
Produtos Relacionados
👉 2 tarefas (médio → ok)

---

# ⚙️ Como usar isso na prática (importante)

### 🔁 Fluxo correto

1. Pegou tarefa → move pra **DOING**
2. Terminou → move pra **DONE**
3. Não pode ter:

   * muita coisa em DOING (máx. 2 por pessoa)


## 🟥 TO DO (A Fazer)

---

### 📦 Vitrine (Base do projeto)

* [ ] GET /products (listar produtos)
* [ ] Renderizar cards (imagem, título, preço, categoria)
* [ ] Loading state
* [ ] Empty state

---

### 📂 Categorias

* [ ] Tela categorias
* [ ] GET /categories
* [ ] Renderizar menu de categorias
* [ ] Filtro por categoria (sem reload)

---

### 📄 Paginação

* [ ] Implementar offset/limit
* [ ] Botão "Próxima"
* [ ] Botão "Anterior"

---

### 🔎 Busca e Filtros

* [ ] Busca por título
* [ ] Filtro por preço (min/max)
* [ ] Combinar filtros

---

### 📄 Detalhe do Produto

* [ ] GET /products/:id
* [ ] Página de detalhe
* [ ] Exibir imagens
* [ ] Exibir descrição
* [ ] GET /products/:id/related

---

### 🛠️ CRUD Produtos

* [ ] Formulário de cadastro
* [ ] POST /products
* [ ] Feedback visual (erro/sucesso)
* [ ] GET categorias no select
* [ ] Tela de edição
* [ ] PUT /products/:id
* [ ] DELETE /products/:id (com confirmação)

---

### 👤 Usuários

* [ ] Cadastro de usuário
* [ ] Verificar e-mail disponível

---

### 🔐 Autenticação

* [ ] Login
* [ ] Salvar token (localStorage)
* [ ] GET /auth/profile
* [ ] Logout

---

### 🧼 Qualidade

* [ ] try/catch em todas requisições
* [ ] Tratamento de erro na UI
* [ ] Remover console.log
* [ ] Código limpo

---

### 📱 Responsividade

* [ ] Layout mobile
* [ ] Layout desktop

---

### 🚀 Entrega

* [ ] Deploy (Vercel/GitHub Pages)
* [ ] README final
* [ ] Screenshots
* [ ] Revisão geral

---

## 🟨 DOING (Em andamento)

*(Mover tarefas aqui quando alguém começar)*

* [ ] ...

---

## 🟩 DONE (Concluído)

*(Mover tarefas finalizadas pra cá)*

### 🧱 Setup Inicial

* [X] Estrutura base do projeto (HTML/CSS/JS)
* [X] Configurar repositório Git
* [X] Definir padrão de commits
* [X] Criar layout base (header, main, footer)

### 🔐 Autenticação

* [x] Login
* [x] Salvar token (localStorage)
* [x] GET /auth/profile

### 👤 Usuários

* [x] Cadastro de usuário

---

### 🚨 Erro comum que faz perder ponto

* Fazer tudo junto sem organizar
* Não mover tarefas no TASKS.md
* Não saber explicar quem fez o quê

---
