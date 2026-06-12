document.addEventListener("DOMContentLoaded", function(){
    inicializarSubtotal()
    inicializarHoverCards()
    inicializarVitrine()
})

function inicializarSubtotal(){
    const inputQtd = document.querySelector("#qtd-lasanha");
    const precoTexto = document.querySelector("#preco-lasanha");
    const subTexto = document.querySelector("#sub-lasanha");

    if (!inputQtd || !precoTexto) return;

    inputQtd.addEventListener("input", function () {
    const precoUnitario = 45.0;
    const quantidade = Number(inputQtd.value);

    if (isNaN(quantidade) || quantidade < 1) return;

    const total = quantidade * precoUnitario;
    precoTexto.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
    precoTexto.style.color = total > 150 ? "#c0392b" : "#e67e22";

    if (subTexto) {
      subTexto.textContent =
        quantidade > 1
          ? `${quantidade}x R$ ${precoUnitario.toFixed(2).replace(".", ",")}`
          : "";
    }
  });
}


function inicializarHoverCards(){
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
}

function inicializarVitrine(){
    const main = document.querySelector("main")

    if (!main) return

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
        const quantidade = Number(card.querySelector(".qtd-valor").textContent)
        const precoExibido = parseFloat(card.querySelector(".preco").getAttribute("data-preco"))

        clicado.textContent = "☑️ adicionado"
        clicado.style.backgroundColor = "#56f7"
        clicado.disabled = true

        // faz voltar ao normal
        setTimeout(() =>{
            clicado.textContent = "pedir agora"
            clicado.style.backgroundColor = ""
            clicado.disabled = false

            const box = card.querySelector(".quantidade-box")
            if (box){
                const spanQtd = box.querySelector(".qtd-valor")
                if (spanQtd) spanQtd.textContent = "1"
                atualizarPrecoCard(box)
            }

        }, 1500) //milisegundos


        //continua - aula passada 
        const badgeExistente = card.querySelector(".badge-adicionado")

        if (badgeExistente) badgeExistente.remove() //beackup
            
        card.insertAdjacentHTML(
             "beforeend",
             "<span class='badge-adicionado'> ☑️ no resumo </span>"
        )

        setTimeout(function(){
            const badge = card.querySelector(".badge-adicionado")
            if (badge) badge.remove()
        }, 2000)
        
    
        //função feita depois
        salvarPedido({nome: nomePrato, preco: precoExibido, qtd: quantidade});

        atualizarContadorPedidos()
    } //fechamento btn-pedido
})
}

function atualizarPrecoCard(box){
    const card = box.parentElement
    const spanPreco = card.querySelector(".preco")
    const precoUnitario = parseFloat(spanPreco.getAttribute("data-preco"))
    const quantidade = Number(box.querySelector(".qtd-valor").textContent);
    const total = precoUnitario * quantidade

    spanPreco.textContent = "R$ " + total.toFixed(2).replace(".",",") // o que era ponto, vira uma virgula
    spanPreco.style.color = total > 150 ? "#c0392b" : "#e67e22" //se preço for maior q 150, vai mudar do vermelho para o laranja
}


//função para inserir as informações do prato
function salvarPedido(pedido){
    const lista = JSON.parse(localStorage.getItem("techfood_pedidos") || "[]")

    pedido.subtotal = pedido.preco * pedido.qtd
    lista.push(pedido)

    localStorage.setItem("techfood_pedidos", JSON.stringify(lista)) //trnasforma objeto em string
}

//bolinha que aparece o total de pedidos
function atualizarContadorPedidos() {
    
    const lista = JSON.parse(localStorage.getItem("techfood_pedidos") || "[]");
    
    const total = lista.reduce(function (acc, p) { return acc + p.qtd; }, 0);

    const linkMenu = document.querySelector("#menu a[href='pedidos.html']");
    if (!linkMenu) return;

    let badge = linkMenu.querySelector(".badge-menu");
    if (!badge) {
        linkMenu.insertAdjacentHTML("beforeend", "<span class='badge-menu'>0</span>");
        
        badge = linkMenu.querySelector(".badge-menu");
  }

    badge.textContent = total;
    linkMenu.classList.add("menu-ativo");
}

function exibirPedidos(){
 // pega do colega
}

function exibirLinksPedidos(){
 // continua
}