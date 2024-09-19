let totalDespesas = 0;

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const tipo = document.getElementById('tipo').value;

    adicionarLinha(descricao, valor, tipo);
    calcularTotal();
    
    this.reset();
});

function adicionarLinha(descricao, valor, tipo) {
    const tbody = document.getElementById('tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${descricao}</td>
        <td>${valor.toFixed(2)}</td>
        <td>${tipo}</td>
        <td>
            <button onclick="editarLinha(this)">Editar</button>
            <button onclick="deletarLinha(this)">Deletar</button>
        </td>
    `;
    tbody.appendChild(tr);
}

function calcularTotal() {
    const tbody = document.getElementById('tbody');
    totalDespesas = 0;

    Array.from(tbody.rows).forEach(row => {
        const valor = parseFloat(row.cells[1].innerText);
        if (row.cells[2].innerText === 'despesa') {
            totalDespesas += valor;
        }
    });

    document.getElementById('totalDespesas').innerText = totalDespesas.toFixed(2);
}

function editarLinha(button) {
    const row = button.parentNode.parentNode;
    const descricao = row.cells[0].innerText;
    const valor = parseFloat(row.cells[1].innerText);
    const tipo = row.cells[2].innerText;

    document.getElementById('descricao').value = descricao;
    document.getElementById('valor').value = valor;
    document.getElementById('tipo').value = tipo;
    
    row.remove();
    calcularTotal();
}

function deletarLinha(button) {
    const row = button.parentNode.parentNode;
    row.remove();
    calcularTotal();
}

document.getElementById('exportar').addEventListener('click', function() {
    const tabela = document.getElementById('tabela');
    const wb = XLSX.utils.table_to_book(tabela, {sheet: "Dados"});
    XLSX.writeFile(wb, 'receitas_despesas.xlsx');
});
