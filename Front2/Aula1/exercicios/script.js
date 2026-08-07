class Prato {
  constructor(nome, preco, categoria) {
    this.nome = nome;
    this.preco = preco;
    this.categoria = categoria;
  }

  formatarPreco() {
    return `R$ ${this.preco.toFixed(2).replace('.', ',')}`;
  }
}



const cardapio = [
  new Prato("Feijoada Completa",  42.90, "Prato Principal"),
  new Prato("Coxinha Artesanal",   8.50, "Petisco"),
  new Prato("Brigadeiro Gourmet",  6.00, "Sobremesa"),

];


const containerCardapio = document.querySelector('#cardapio');

function criarCardPrato(prato) {
  const card = document.createElement('article');
  card.className = 'card-prato col-12 col-md-6 col-lg-4 p-4 bg-white rounded-3 shadow-sm'; //só aplica nele porque é nesse que vai aplicar os cards.

  card.innerHTML = `
    <h3 class="fs-4 fw-bold text-dark mb-2">${prato.nome}</h3>
    <span class="categoria fs-6 d-block mb-3">${prato.categoria}</span>
    <div class="preco fs-5 fw-bold text-success">${prato.formatarPreco()}</div>
  `;
  card.addEventListener('click', () => {
    alert(
      `🍽️ ${prato.nome}\n\n` +
      `Categoria: ${prato.categoria}\n` +
      `Preço: ${prato.formatarPreco()}`
    );
  });
  return card;
}
function renderizarCardapio() {
  containerCardapio.innerHTML = '';
  cardapio.forEach(prato => {
    containerCardapio.appendChild(criarCardPrato(prato));
  });

  // const mudanca = containerCardapio.firstElementChild
  // mudanca.style.fontSize = '50px';
  // mudanca.style.width = '700px';
}
renderizarCardapio();