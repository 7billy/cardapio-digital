let carrinho = [];

function adicionarAoCarrinho(item, preco) {
  carrinho.push({ item, preco });
  atualizarCarrinho();
}

function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  let lista = document.getElementById("carrinho");
  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach((produto, index) => {
    total += produto.preco;
    let li = document.createElement("li");
    li.innerHTML = `${produto.item} - R$${produto.preco.toFixed(2)} 
      <button onclick="removerDoCarrinho(${index})">X</button>`;
    lista.appendChild(li);
  });

  document.getElementById("total").textContent = `Total: R$ ${total.toFixed(2)}`;

  // Habilita/desabilita o botão de enviar pedido
  document.getElementById("btnEnviar").disabled = carrinho.length === 0;
}

function enviarPedido() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  let telefone = "5511999999999"; // Número do WhatsApp do restaurante
  let mensagem = "Olá, quero fazer um pedido:\n";

  carrinho.forEach(produto => {
    mensagem += `- ${produto.item} R$${produto.preco.toFixed(2)}\n`;
  });

  let total = carrinho.reduce((acc, item) => acc + item.preco, 0);
  mensagem += `\nTotal: R$ ${total.toFixed(2)}`;

  let link = `https://api.whatsapp.com/send?phone=${telefone}&text=${encodeURIComponent(mensagem)}`;
  window.open(link, "_blank");
}
