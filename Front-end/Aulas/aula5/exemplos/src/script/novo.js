const tituloNhoque = document.querySelector("#card-nhoque h3");

const botoesCompra = document.querySelectorAll(".btn-pedido");

const terceiroCard = document.querySelector(".card:nth-child(3)");

const nomeCompleto = document.querySelector('#nome')

console.log("1. Mostrando o Título NHOQUE (pelo ID)", tituloNhoque);

console.log("2. Quantidade de botões de pedido: ", botoesCompra.length);

console.log(" 3. A terceira posição da class .card: ", terceiroCard);

const imgLasanha = document.querySelector('img[alt="Lasanah Tech"]')

if(tituloNhoque){
    console.log("Título CAPTURADO: ", tituloNhoque.innerText)
}

const saudacao = document.querySelector('#boas-vindas')

const agora = new Date()
const hora = agora.getHours()

saudacao.textContent = hora < 18 ? "Bem vindo, bom almoço" : "Bem vindo, boa janta"

nomeCompleto.innerHTML = "<strong>Ana Katy</strong> <em>Romão</em> Vasconcellos" 

const imagem_card_um = document.querySelector('#foto-destaque')
imagem_card_um.src = 'esgotado.jpg.jpg'