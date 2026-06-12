const saudacao = document.querySelector("#boas-vindas");
const hora = new Date().getHours();
if (saudacao) {
    saudacao.textContent =
        hora < 12
            ? "Bom dia! Qual o seu pedido?"
            : "Boa tarde! Confira nosso cardápio.";
}





const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
    // animação quando o mouse passar por cima dos cards
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-5px)";
    card.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
  });

  // tira a animação assim que o mouse sai dos cards
  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
    card.style.boxShadow = "none";
  });
});






const main = document.querySelector("main")
main.addEventListener('click', (event) =>{
    const clicado = event.target
    
    //adicionar e remover quantidade de itens
    //se o que foi ouvido foi o botão menos. Esse btn-menos serve para todos os do codigo. manipula a class que ele corresponde
    if (clicado.classList.contains("btn-menos")){
        //Pergunta quem é o pai
        const box = clicado.parentElement 

        //usa o pai da quantidade como referencia para alterar os numeros
        const spanQtd = box.querySelector(".qtd-valor")

        //guardar o valor atual
        const valorAtual = Number(spanQtd.textContent)
        
        spanQtd.textContent = Math.max(1, valorAtual - 1)
        atualizarPrecoCard(box);
        return;
    }

    if (clicado.classList.contains("btn-mais")){
        //Pergunta quem é o pai
        const box = clicado.parentElement 

        //usa o pai da quantidade como referencia para alterar os numeros
        const spanQtd = box.querySelector(".qtd-valor")

        //guardar o valor atual
        spanQtd.textContent = Number(spanQtd.textContent) + 1

        atualizarPrecoCard(box);
        return;
    }

    //solicitar pedido - item

    if(clicado.classList.contains("btn-pedido")){
        event.preventDefault()
        
        // pergunta quem é o pai
        const card = clicado.parentElement
        // usa o pai como a referencia para alterar
        const nomePrato = card.querySelector("h3").textContent
        const quantidade = card.querySelector(".qtd-valor").textContent
        const precoExibido = card.querySelector(".preco").textContent

        clicado.textContent = "☑️ adicionado"
        clicado.style.backgroundColor = "#56f7"
        clicado.disabled = true

        // faz voltar ao normal
        setTimeout(() =>{
            clicado.textContent = "pedir agora"
            clicado.style.backgroundColor = ""
            clicado.disabled = false
        }, 1500) //milisegundos


        if(!card.querySelector(".badge-adicionado")){
            card.insertAdjacentHTML(
                "beforeend",
                "<span class='badge-adicionado'> ☑️ no resumo </span>"
            )
        }
    
        //função para inserir as informações do prato
        adicionarItemAoResumo(nomePrato, quantidade, precoExibido, card);
    } //fechamento btn-pedido

})




function atualizarPrecoCard(box){
    const card = box.parentElement
    const spanPreco = card.querySelector(".preco")
    const precoUnitario = parseFloat(spanPreco.getAttribute("data-preco"))
    const quantidade = Number(box.querySelector(".qtd-valor").textContent);
    const total = precoUnitario * quantidade

    spanPreco.textContent = "R$ " + total.toFixed(2).replace(".",",") // o que era ponto, vira uma virgula
    spanPreco.style.color = total > 150 ? "#c0392b" : "#e67e22" //se preço for maior q 150, vai mudar do vermelho para o laranja
}



//Adiciona itens ao resumo
function adicionarItemAoResumo(nome, qtd, preco, cardOrigem) { // nome das variaveis não importa 
    const secaoResumo = document.querySelector("#secao-resumo");
    const listaResumo = document.querySelector("#lista-resumo");

    if (!secaoResumo || !listaResumo) return;//se não tiver nada do reumo, ele encerra


    // Exibe a seção que estava oculta (display:none no CSS)
    secaoResumo.style.display = "block";

    //cria algo não existente no html, nesse caso vamos criar uma lista
    const itemLi = document.createElement("li");
    itemLi.classList.add("item-resumo");// pega a estilização da class no css

    //inserir os dados  
    const textoSpan = document.createElement("span");
    textoSpan.textContent = qtd + "x " + nome + " — " + preco;


    // botão para remover
    const btnRemover = document.createElement("button")
    btnRemover.textContent = "❌"
    btnRemover.classList.add("btn-remover")
   
   
    // ação para ouvir o botão
    btnRemover.addEventListener("click", ()=> {
        itemLi.remove() // pega o itemLi porque queremos remover esse item da lista
        const badge = cardOrigem.querySelector(".badge-adicionado") // class do check
        if (badge) badge.remove()

        if (listaResumo.children.length === 0){// procura quantos filhos essa lista tem
            secaoResumo.style.display = "none" // faz desaparecer
        } 
    }) // fechou o evento de click desse btnRemover

    itemLi.appendChild(textoSpan) //adiciona a infromação no html
    itemLi.appendChild(btnRemover)
    listaResumo.appendChild(itemLi) //informa que a UL (a lista) tem novos filhos (item da lista)
} // fim da função



// botão de limpar
const btnLimpar = document.querySelector("#btn-limpar")

if (btnLimpar){
    btnLimpar.addEventListener("click", () => {
        const listaResumo = document.querySelector("#lista-resumo")
        const secaoResumo = document.querySelector("#secao-resumo")

        document.querySelectorAll(".badge-adicionado").forEach((excluir) => excluir.remove())

        while(listaResumo.firstElementChild){
            listaResumo.firstElementChild.remove()
        }

        secaoResumo.style.display = "none"
    })
}