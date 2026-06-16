const API = 'https://6a315dac7bc5e1c612659eb2.mockapi.io/materiais';

// Função Obrigatória da Sprint 2 - Valida se a retirada é possível
function validarRetirada(estoqueAtual, quantidadeRetirada) {
  if (quantidadeRetirada <= 0 || isNaN(quantidadeRetirada)) return false;
  if (quantidadeRetirada > estoqueAtual) return false;
  return true;
}

async function carregarMateriais() {
  const tbody = document.getElementById('tbody-materiais');
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error();
    const materiais = await res.json();

    if (materiais.length === 0) {
      tbody.innerHTML = '<tr><td colspan="3" class="empty-state">Nenhum material cadastrado.</td></tr>';
      return;
    }

    // Injeção dos botões de Baixar e Excluir com suas respectivas classes
    tbody.innerHTML = materiais.map(m => `
      <tr>
        <td>${m.nome}</td>
        <td><span class="badge-qtd">${m.quantidade}</span></td>
        <td>
          <button class="btn-baixar" onclick="baixarMaterial('${m.id}', ${m.quantidade})">Baixar</button>
          <button class="btn-excluir" onclick="excluirMaterial('${m.id}')">Excluir</button>
        </td>
      </tr>
    `).join('');
  } catch {
    tbody.innerHTML = '<tr><td colspan="3" class="empty-state">Falha ao carregar materiais.</td></tr>';
  }
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
  } catch {
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
  } catch {
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
  } catch {
    feedback.textContent = 'Erro ao cadastrar. Tente novamente.';
    feedback.className = 'feedback erro';
  } finally {
    btn.disabled = false;
  }
});

// Inicializa a aplicação
carregarMateriais();