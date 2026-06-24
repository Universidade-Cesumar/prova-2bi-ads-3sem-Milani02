# Projeto Final - 2º Bimestre

**Acesse o projeto online:** https://universidade-cesumar.github.io/prova-2bi-ads-3sem-Milani02/

# 📦 Nexus Almoxarifado - Gestão de Materiais

> 🌐 **Projeto no ar:** https://SEU-USUARIO.github.io/prova-2bi-ads-3sem-Milani02/
> *(Substitua pelo link real após publicar — veja a seção [Deploy](#-deploy) no final.)*

Sistema de controle de estoque e inventário desenvolvido como avaliação prática para o curso de Análise e Desenvolvimento de Sistemas. A aplicação permite o cadastro, consulta, baixa e exclusão de materiais, garantindo a integridade dos dados através de regras de negócio estritas.

## 🚀 O que já foi implementado

O projeto está sendo construído em etapas (Sprints) e atualmente conta com as seguintes funcionalidades:

### ✅ Sprint 1: Fundação e Inventário
- **Interface Base:** Estruturação semântica do formulário de cadastro e da tabela de listagem.
- **Integração com API:** Conexão com o servidor MockAPI para persistência de dados (GET e POST).
- **Validação de Cadastro:** Bloqueio de submissão com campos vazios ou quantidade inferior a 1, com feedback visual (sucesso/erro).

### ✅ Sprint 2: Regras de Negócio e Saídas
- **Baixa de Estoque (PUT):** Atualização dinâmica da quantidade de itens no servidor e na interface.
- **Exclusão de Materiais (DELETE):** Remoção permanente de itens com alerta de confirmação.
- **Função `validarRetirada`:** Lógica de negócio rigorosa que garante que a operação só seja aprovada se o valor for válido (bloqueando números negativos, zero, ou valores superiores ao saldo atual). Aprovada 100% nos testes unitários com Jest.

### ✅ Sprint 3: Dashboard, Pesquisa e Publicação
- **Barra de Pesquisa (`#input-busca`):** Filtragem em tempo real dos materiais pelo nome, sem novas requisições ao servidor (busca sobre o cache local).
- **Dashboard de Total (`#total-itens`):** Exibição dinâmica da quantidade de materiais cadastrados no inventário.
- **Alerta de Estoque Crítico:** Itens com menos de 10 unidades recebem automaticamente, via JavaScript, a classe `.estoque-critico`, destacando visualmente a linha em vermelho.
- **Tratamento de Erros:** Todas as requisições `fetch` (GET, POST, PUT, DELETE) são protegidas por blocos `try/catch`, evitando quebras silenciosas em caso de falha de rede.

### ✨ Diferenciais de UI/UX
Para elevar a experiência do utilizador, a interface original foi substituída por um design moderno, contendo:
- Layout baseado em **Glassmorphism** e cartões elevados.
- Micro-interações de *hover* e *focus* com feedback visual claro (cores semânticas para perigo/sucesso).
- **Fundo Interativo 3D:** Implementação de um `ShaderPlane` e `EnergyRing` utilizando Vanilla **Three.js**, isolado para não interferir na usabilidade do sistema nem na execução dos testes do GitHub Classroom.

## 🛠️ Tecnologias Utilizadas

- **HTML5 & CSS3** (Variáveis nativas, Flexbox, Design Responsivo)
- **JavaScript (ES6+)** (Fetch API, Async/Await)
- **Three.js** (WebGL para fundo 3D)
- **Jest** (Testes automatizados da avaliação)
- **MockAPI** (Back-end e Base de Dados)

## 🚀 Deploy

A aplicação é 100% estática (HTML, CSS e JS puros), portanto pode ser publicada gratuitamente no **GitHub Pages**:

1. No GitHub, acesse **Settings → Pages**.
2. Em *Build and deployment*, selecione **Source: Deploy from a branch**.
3. Escolha a branch **`master`** e a pasta **`/ (root)`** e clique em **Save**.
4. Aguarde alguns instantes e copie o link gerado (algo como `https://SEU-USUARIO.github.io/prova-2bi-ads-3sem-Milani02/`).
5. Cole esse link no topo deste README, substituindo o endereço de exemplo.

## ✅ Como rodar os testes

```bash
npm install
npm run test:sprint1
npm run test:sprint2
npm run test:sprint3
```

