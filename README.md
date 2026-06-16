[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/72Bdl6Wn)

# 📦 Nexus Almoxarifado - Gestão de Materiais

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

