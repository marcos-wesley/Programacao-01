const notas = [];
const mediaMinima = 6.0; // Média mínima para aprovação

function adicionarNota() {
  const nome = document.getElementById('nome').value;
  const disciplina = document.getElementById('disciplina').value;
  const nota = parseFloat(document.getElementById('nota').value);

  if (!nome || !disciplina || isNaN(nota)) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  notas.push({ nome, disciplina, nota });
  document.getElementById('disciplina').value = '';
  document.getElementById('nota').value = '';
  gerarBoletim(nome);
}

function gerarBoletim(nome) {
  const boletimDiv = document.getElementById('boletim');
  boletimDiv.innerHTML = '';

  const notasFiltradas = notas.filter(nota => nota.nome === nome);
  if (notasFiltradas.length === 0) return;

  const tabela = document.createElement('table');
  tabela.innerHTML = `
    <tr>
      <th>Disciplina</th>
      <th>Nota</th>
    </tr>
  `;

  let somaNotas = 0;

  notasFiltradas.forEach(nota => {
    somaNotas += nota.nota;
    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td>${nota.disciplina}</td>
      <td>${nota.nota}</td>
    `;
    tabela.appendChild(linha);
  });

  const media = (somaNotas / notasFiltradas.length).toFixed(2);
  const linhaMedia = document.createElement('tr');
  linhaMedia.innerHTML = `
    <td><strong>Média Final</strong></td>
    <td><strong>${media}</strong></td>
  `;
  tabela.appendChild(linhaMedia);

  const status = document.createElement('p');
  if (media >= mediaMinima) {
    status.innerHTML = 'Status: <span class="status-aprovado">Aprovado</span>';
  } else {
    status.innerHTML = 'Status: <span class="status-reprovado">Reprovado</span>';
  }

  boletimDiv.appendChild(tabela);
  boletimDiv.appendChild(status);
}
