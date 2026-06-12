// 1. Selecionamos o elemento (Aula 5)

const btn = document.querySelector('.btn-pedido');


const inputQtdLasanha = document.querySelector("#qtd-lasanha")

const textoPreco = document.querySelector("#preco-lasanha")

if (inputQtdLasanha && textoPreco){
    inputQtdLasanha.addEventListener("input",() =>{
        const precoUnitario = 45.0
        const total = Number(inputQtdLasanha.value) * precoUnitario
        
        textoPreco.textContent = `R$ ${total.toFixed(2)}`
        textoPreco.style.color= total > 150? "#c0392b" : "#e67e22";
    })
}

// 2. Adicionamos o 'ouvinte' (Evento, Função)
btn.addEventListener('click', function() {
    // LINHA A LINHA: Quando o clique ocorrer, este bloco será executado
    console.log("O vigia detectou um clique no botão!");
    btn.textContent = "Processando..."; 
})//muda o texto

//3. Adicionando o ouvinte compartilhado (classe) EVENT.TARGET
const massas = document.querySelector('#secao-massas')

massas.addEventListener('click', (event)=>{
    const clicado = event.target
    
    if (clicado.classList.contains('btn-pedido')){
        console.log("Você clicou em um botão de um pedido de Massa!")
    }
})//ouve as funções

/
// 4. EVENTO de clique para todos os botões - Modelo Geral QuerySelectorAll
const botoesPedido = document.querySelectorAll(".btn-pedido")
botoesPedido.forEach((botao) =>{
    botao.addEventListener("click", (event) =>{
        // Evita qualquer comportamento padrão do NAVEGADOR
        event.preventDefault()

        //Efeito Visual no botão após o clique
        botao.textContent = "✓ Pedido enviado"
        botao.style.backgroundColor = "red"
        // 
        botao.disabled = true
    })
})


// 5. AÇÕES INTERATIVIDADE CARDS
const cards = document.querySelectorAll(".card")
cards.forEach((card) =>{
    card.addEventListener("mouseenter", ()=>{
        card.style.transform = "translateY(-5px)"
        card.style.boxShadow = "0 10px 10px #1111"
    })

    card.addEventListener("mouseleave", ()=>{
        card.style.transform = "translateY(0)"
        card.style.boxShadow = "none"
    })
})

