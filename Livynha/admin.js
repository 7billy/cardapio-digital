document.addEventListener("DOMContentLoaded", carregarItens);

let menu = [];

function carregarItens() {
  fetch("menu.json")
    .then(response => response.json())
    .then(data => {
      menu = data;
      exibirItens();
    });
}

function exibirItens() {
  let lista = document.getElementById("listaItens");
  lista.innerHTML = "";
  menu.forEach((item, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
            <strong>${item.nome}</strong> - R$${item.preco}
            <button onclick="removerItem(${index})">Remover</button>
        `;
    lista.appendChild(li);
  });
}

document.getElementById("addForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let novoItem = {
    id: menu.length + 1,
    nome: document.getElementById("nome").value,
    preco: parseFloat(document.getElementById("preco").value),
    descricao: document.getElementById("descricao").value,
    imagem: document.getElementById("imagem").value
  };

  menu.push(novoItem);
  exibirItens();
});

function removerItem(index) {
  menu.splice(index, 1);
  exibirItens();
}