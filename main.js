const API = 'https://6a315dac7bc5e1c612659eb2.mockapi.io/materiais';

async function carregarMateriais() {
  const tbody = document.getElementById('tbody-materiais');
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error();
    const materiais = await res.json();

    if (materiais.length === 0) {
      tbody.innerHTML = '<tr><td colspan="2" class="empty-state">Nenhum material cadastrado.</td></tr>';
      return;
    }

    tbody.innerHTML = materiais.map(m => `
      <tr>
        <td>${m.nome}</td>
        <td><span class="badge-qtd">${m.quantidade}</span></td>
      </tr>
    `).join('');
  } catch {
    tbody.innerHTML = '<tr><td colspan="2" class="empty-state">Falha ao carregar materiais.</td></tr>';
  }
}

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

carregarMateriais();