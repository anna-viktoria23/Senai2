document.addEventListener("DOMContentLoaded", function(){ 
    exibirBoasVindas()
    exibirDataFooter()
    fecharMenuAoNavegar()
}) // espera o conteudo da pagina carregar para que seja executado o DOM
function exibirBoasVindas(){
    const agora = new Date();
    const hora = agora.getHours();
    const minutos = agora.getMinutes();
    const horaExata = hora + minutos / 60;

    let saudacao;
    if (horaExata >= 5 && horaExata < 12) {
        saudacao = "☀️ Bom dia! Qual o seu pedido?";
    } else if (horaExata >= 12 && horaExata < 18) {
        saudacao = "🌤️ Boa tarde! Confira nosso cardápio.";
    } else {
        saudacao = "🌙 Boa noite! Ainda dá tempo de pedir.";
    }

    const elemSaudacao = document.querySelector("#boas-vindas");
    if (elemSaudacao) elemSaudacao.textContent = saudacao;

    const elemFooter = document.querySelector("#data-hora-footer");
    if (!elemFooter) return;

    const dataFormatada = agora.toLocaleDateString("pt-BR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    elemFooter.textContent = dataFormatada;
}


function exibirDataFooter() {
    const elemFooter = document.querySelector("#data-hora-footer");
    if (!elemFooter) return;

    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString("pt-BR", {
        weekday: "long",
        year:    "numeric",
        month:   "long",
        day:     "numeric"
     });

    elemFooter.textContent = dataFormatada;
}

function fecharMenuAoNavegar(){
    // valida se a tela tem um determinado tamamho
    const isMoblie = window.matchMedia("(max-width: 660px)").matches

    if (!isMoblie) return

    const linksMenu = document.querySelectorAll("#menu a") // all pq está pegano coisa do a, não do menu (id)

    linksMenu.forEach(function(link){
        link.addEventListener("click", function(){
            const checkbox = document.querySelector("bt-menu")
            if (checkbox) checkbox.checked = false //tira o click e fecha o menu
        })
    })
}