# MultiMarket — Projeto UC07

## 🟥 TO DO (A Fazer)

### 🧱 Setup Inicial

* [ ] Estrutura base do projeto (HTML/CSS/JS)
* [ ] Configurar repositório Git
* [ ] Definir padrão de commits
* [ ] Criar layout base (header, main, footer)

---

### 📦 Vitrine (Base do projeto)

* [ ] GET /products (listar produtos)
* [ ] Renderizar cards (imagem, título, preço, categoria)
* [ ] Loading state
* [ ] Empty state

---

### 📂 Categorias

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

* [ ] ...

---

# ⚙️ Como usar isso na prática (importante)

### 🔁 Fluxo correto

1. Pegou tarefa → move pra **DOING**
2. Terminou → move pra **DONE**
3. Não pode ter:

   * muita coisa em DOING (máx. 2 por pessoa)

---

### 👥 Distribuição inteligente (baseado no projeto)

Divide assim:

* Dev 1 → Vitrine + Paginação
* Dev 2 → Filtros + Busca
* Dev 3 → Detalhe + Relacionados
* Dev 4 → CRUD + Auth
* Líder → Testes + revisão + organização

---

### 💡 Dica de ouro (isso ganha projeto)

Cria subtarefas com responsáveis:

```
[ ] GET /products — @João
[ ] Filtro por categoria — @Maria
```

---

### 🚨 Erro comum que faz perder ponto

* Fazer tudo junto sem organizar
* Não mover tarefas no Kanban
* Não saber explicar quem fez o quê

---
