document.addEventListener("DOMContentLoaded", function(){
    renderizarCardapio(); 
    inicializarVitrine();
    inicializarHoverCards();
})

/*
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
*/

async function renderizarCardapio() {
  const grid = document.querySelector("#grid-cardapio");
  if (!grid) return;

  grid.innerHTML = "<p class='loading'>Carregando cardápio...</p>";

  try {
    const produtos = await buscarProdutos(); // HTTP GET → http://localhost:3000/produtos

    grid.innerHTML = "";

    produtos.forEach(function (produto) {
      const card = document.createElement("article");
      card.classList.add("card");
      card.setAttribute("data-id", produto.id); //pega id do banco

      // const imgSrc = produto.imagem ? `src/images/${produto.imagem}` : "src/images/espaguete.png";
      card.innerHTML = //todo um card 
        `<h3>${produto.nome}</h3>` +
        `<p class='desc'>${produto.descricao}</p>` +
        `<div class='quantidade-box'>` +
          `<button class='btn-qtd btn-menos'>-</button>` +
          `<span class='qtd-valor'>1</span>` +
          `<button class='btn-qtd btn-mais'>+</button>` +
        `</div>` +
        `<span class='preco' data-preco='${produto.preco}'>` +
          `R$ ${parseFloat(produto.preco).toFixed(2).replace(".", ",")}` +
        `</span>` +
        `<button class='btn-pedido'>Pedir Agora</button>`;

      grid.appendChild(card);
    });
  } catch (erro) {
    grid.innerHTML = "<p class='loading erro'>Erro ao carregar o cardápio. Verifique se o servidor está rodando.</p>";
  }
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

/*
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
*/

function inicializarVitrine() {
  const main = document.querySelector("main");
  if (!main) return;

  main.addEventListener("click", function (event) {
    const clicado = event.target;

    // ── Botão MENOS  ─────────────────────────────────────
    if (clicado.classList.contains("btn-menos")) {
      const box    = clicado.parentElement;
      const spanQtd = box.querySelector(".qtd-valor");
      spanQtd.textContent = Math.max(1, Number(spanQtd.textContent) - 1);
      atualizarPrecoCard(box);
      return;
    }

    // ── Botão MAIS ──────────────────────────────────────
    if (clicado.classList.contains("btn-mais")) {
      const box    = clicado.parentElement;
      const spanQtd = box.querySelector(".qtd-valor");
      spanQtd.textContent = Number(spanQtd.textContent) + 1;
      atualizarPrecoCard(box);
      return;
    }

    if (clicado.classList.contains("btn-pedido")) {
      event.preventDefault();

      const card      = clicado.parentElement;
      const produtoId = Number(card.getAttribute("data-id"));
      const quantidade = Number(card.querySelector(".qtd-valor").textContent);

      salvarPedido(produtoId, quantidade, clicado);
    }
  });
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
function salvarPedido(produtoId, quantidade, botao) {
  const card    = botao.parentElement;
  const nome    = card.querySelector("h3").textContent;
  const preco   = parseFloat(card.querySelector(".preco").getAttribute("data-preco"));
  const subtotal = preco * quantidade;

  // Padrão Aula 8: ler → modificar → salvar
  const lista = JSON.parse(localStorage.getItem("techfood_pedidos") || "[]");
  lista.push({
    produto_id: produtoId,  // ⚠ novo em Aula 9 — usado pelo criarPedido()
    quantidade,             // ⚠ renomeado de qtd para quantidade (formato API)
    nome,
    preco,
    subtotal,
  });
  localStorage.setItem("techfood_pedidos", JSON.stringify(lista));

  // Feedback visual — igual Aula 8
  botao.textContent           = "✓ Adicionado!";
  botao.style.backgroundColor = "#27ae60";

  atualizarContadorPedidos();

  setTimeout(function () {
    botao.textContent           = "Pedir Agora";
    botao.style.backgroundColor = "";
    botao.disabled              = false;

    const box = card.querySelector(".quantidade-box");
    if (box) {
      box.querySelector(".qtd-valor").textContent = "1";
      atualizarPrecoCard(box);
    }
  }, 1500);
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

