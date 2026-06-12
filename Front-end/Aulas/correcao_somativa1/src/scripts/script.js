const horaAtual = new Date().getHours();
const saudacao = document.querySelector("#status-oficina");

if (horaAtual < 12) {
  saudacao.textContent = "Pé na estrada, bom dia!";
} else if (horaAtual < 18) {
  saudacao.textContent = "Tarde perfeita para um test-drive!";
} else {
  saudacao.textContent = "Oficina fechada, boa noite!";
}

const banner = document.querySelector("#banner-esportivo");
banner.addEventListener("mouseover", () => {
  banner.classList.add("modo-corrida");
});
banner.addEventListener("mouseout", () => {
  banner.classList.remove("modo-corrida");
});

const kmViagem = document.querySelector("#km-viagem");
const resultadoCombustivel = document.querySelector("#resultado-combustivel");
kmViagem.addEventListener("input", () => {
  resultadoCombustivel.textContent = Number(kmViagem.value) / 12;
});

const btnInteressado = document.querySelector("#btn-interessado");
const modeloCarro = document.querySelector("#modelo-carro");
const listaCarros = document.querySelector("#lista-carros");

btnInteressado.addEventListener("click", () => {
  if (modeloCarro.value === "Fusca" || modeloCarro.value === "fusca") {
    alert("Relíquia encontrada!");
  }
  listaCarros.innerHTML += `<article class="card-interesse"><h3>🚗 Carro: ${modeloCarro.value} - INTERESSADO 🏁</h3></article>`;
});

const btnReset = document.querySelector("#btn-reset");
btnReset.addEventListener("click", () => {
  listaCarros.innerHTML = "";
  modeloCarro.value = "";
  modeloCarro.focus();
});