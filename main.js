const API = 'https://6a315dac7bc5e1c612659eb2.mockapi.io/materiais';

// Função Obrigatória da Sprint 2 - Valida se a retirada é possível
function validarRetirada(estoqueAtual, quantidadeRetirada) {
  if (quantidadeRetirada <= 0 || isNaN(quantidadeRetirada)) return false;
  if (quantidadeRetirada > estoqueAtual) return false;
  return true;
}

// Sprint 3 - Guarda todos os materiais carregados da API para permitir
// a busca/filtragem sem precisar consultar o servidor a cada tecla digitada.
let materiaisCache = [];

// Limite a partir do qual o estoque é considerado baixo (estoque crítico).
const ESTOQUE_MINIMO = 10;

async function carregarMateriais() {
  const tbody = document.getElementById('tbody-materiais');
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error();
    materiaisCache = await res.json();

    atualizarDashboard(materiaisCache);
    aplicarFiltro(); // Renderiza a tabela respeitando o termo da busca
  } catch (erro) {
    tbody.innerHTML = '<tr><td colspan="3" class="empty-state">Falha ao carregar materiais.</td></tr>';
    const totalEl = document.getElementById('total-itens');
    if (totalEl) totalEl.textContent = '0';
  }
}

// Sprint 3 - Dashboard: exibe o total de materiais cadastrados.
function atualizarDashboard(lista) {
  const totalEl = document.getElementById('total-itens');
  if (totalEl) totalEl.textContent = lista.length;
}

// Sprint 3 - Barra de pesquisa: filtra o cache pelo nome do material.
function aplicarFiltro() {
  const inputBusca = document.getElementById('input-busca');
  const termo = (inputBusca ? inputBusca.value : '').toLowerCase().trim();

  const filtrados = materiaisCache.filter(m =>
    m.nome.toLowerCase().includes(termo)
  );

  renderizarTabela(filtrados);
}

// Sprint 3 - Renderiza as linhas da tabela e marca o estoque crítico.
function renderizarTabela(lista) {
  const tbody = document.getElementById('tbody-materiais');

  if (lista.length === 0) {
    tbody.innerHTML = '<tr><td colspan="3" class="empty-state">Nenhum material encontrado.</td></tr>';
    return;
  }

  // Injeção dos botões de Baixar e Excluir com suas respectivas classes.
  // Itens com estoque abaixo do mínimo recebem a classe "estoque-critico".
  tbody.innerHTML = lista.map(m => {
    const critico = m.quantidade < ESTOQUE_MINIMO ? 'estoque-critico' : '';
    return `
      <tr class="${critico}">
        <td>${m.nome}</td>
        <td class="text-center"><span class="badge-qtd">${m.quantidade}</span></td>
        <td class="text-right">
          <button class="btn-baixar" onclick="baixarMaterial('${m.id}', ${m.quantidade})">Baixar</button>
          <button class="btn-excluir" onclick="excluirMaterial('${m.id}')">Excluir</button>
        </td>
      </tr>
    `;
  }).join('');
}

// Função para fazer a Baixa no estoque (PUT)
async function baixarMaterial(id, estoqueAtual) {
  const inputRetirada = document.getElementById('input-retirada');
  const quantidadeRetirada = parseInt(inputRetirada.value);

  // Usa a função de validação para verificar as regras
  if (!validarRetirada(estoqueAtual, quantidadeRetirada)) {
    alert("Quantidade inválida! Verifique se o valor é maior que zero e menor ou igual ao estoque atual.");
    return;
  }

  const novaQuantidade = estoqueAtual - quantidadeRetirada;

  try {
    const res = await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantidade: novaQuantidade })
    });
    
    if (!res.ok) throw new Error();
    
    inputRetirada.value = ''; // Limpa o campo após o sucesso
    await carregarMateriais(); // Atualiza a tabela
  } catch (erro) {
    alert('Erro ao realizar a baixa no estoque. Tente novamente.');
  }
}

// Função para Excluir o material (DELETE)
async function excluirMaterial(id) {
  if (!confirm("Tem certeza que deseja excluir este material permanentemente?")) return;

  try {
    const res = await fetch(`${API}/${id}`, {
      method: 'DELETE'
    });
    
    if (!res.ok) throw new Error();
    
    await carregarMateriais(); // Atualiza a tabela
  } catch (erro) {
    alert('Erro ao excluir o material. Tente novamente.');
  }
}

// Lógica de Cadastro (Sprint 1 - mantida)
document.getElementById('btn-cadastrar').addEventListener('click', async () => {
  const inputNome = document.getElementById('input-nome');
  const inputQtd  = document.getElementById('input-quantidade');
  const feedback  = document.getElementById('feedback');
  const btn       = document.getElementById('btn-cadastrar');

  const nome      = inputNome.value.trim();
  const quantidade = parseInt(inputQtd.value);

  if (!nome || !quantidade || quantidade < 1) {
    feedback.textContent = 'Preencha o nome e a quantidade antes de cadastrar.';
    feedback.className = 'feedback erro';
    return;
  }

  btn.disabled = true;
  feedback.textContent = '';

  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, quantidade })
    });
    if (!res.ok) throw new Error();

    inputNome.value = '';
    inputQtd.value  = '';
    feedback.textContent = `"${nome}" cadastrado com sucesso!`;
    feedback.className = 'feedback sucesso';

    await carregarMateriais();
  } catch (erro) {
    feedback.textContent = 'Erro ao cadastrar. Tente novamente.';
    feedback.className = 'feedback erro';
  } finally {
    btn.disabled = false;
  }
});

// Sprint 3 - Filtra a tabela em tempo real conforme o usuário digita.
document.getElementById('input-busca').addEventListener('input', aplicarFiltro);

// Inicializa a aplicação
carregarMateriais();