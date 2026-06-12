// Aula06

// --- 1. CÁLCULO DINÂMICO (Relacionando Inputs e Textos) ---
// Seleciona o botão, o campo de quantidade (input) e o texto do preço no HTML
const btn = document.querySelector('.btn-pedido');
const inputQtdLasanha = document.querySelector("#qtd-lasanha")
const textoPreco = document.querySelector("#preco-lasanha")

// Se os elementos existirem no HTML, o JS "fica de vigia" no input
if (inputQtdLasanha && textoPreco){
    // "input" é o evento que dispara toda vez que o usuário digita um número
    inputQtdLasanha.addEventListener("input",() =>{
        const precoUnitario = 45.0
        // Cálculo: transforma o valor do input em número e multiplica pelo preço
        const total = Number(inputQtdLasanha.value) * precoUnitario
        
        // Atualiza o texto no HTML com o novo total (toFixed(2) garante os centavos)
        textoPreco.textContent = `R$ ${total.toFixed(2)}`
        
        // RELAÇÃO COM CSS: Se o total passar de 150, muda a cor para vermelho escuro via JS
        textoPreco.style.color= total > 150? "#c0392b" : "#e67e22";
    })
}

// --- 2. OUVINTE DE CLIQUE INDIVIDUAL ---
// Adiciona uma ação específica ao primeiro botão encontrado com a classe .btn-pedido
btn.addEventListener('click', function() {
    console.log("O vigia detectou um clique no botão!");
    // Muda o texto do botão no HTML para dar feedback ao usuário
    btn.textContent = "Processando..."; 
})

// --- 3. DELEGAÇÃO DE EVENTOS (Ouvinte Compartilhado) ---
// Em vez de colocar um ouvinte em cada botão, ouvimos a SEÇÃO inteira (#secao-massas)
const massas = document.querySelector('#secao-massas')

massas.addEventListener('click', (event)=>{
    // event.target identifica exatamente onde o usuário clicou dentro da seção
    const clicado = event.target
    
    // Se o que foi clicado possui a classe CSS 'btn-pedido', executa a lógica
    if (clicado.classList.contains('btn-pedido')){
        console.log("Você clicou em um botão de um pedido de Massa!")
    }
})

// --- 4. MANIPULAÇÃO EM MASSA (querySelectorAll) ---
// Seleciona TODOS os botões de pedido da página de uma vez
const botoesPedido = document.querySelectorAll(".btn-pedido")

// Para cada botão encontrado, adicionamos as mesmas regras
botoesPedido.forEach((botao) =>{
    botao.addEventListener("click", (event) =>{
        // Impede que a página recarregue (comportamento padrão de alguns botões)
        event.preventDefault()

        // Muda o visual: o texto vira um check e a cor de fundo (CSS) vira vermelha
        botao.textContent = "✓ Pedido enviado"
        botao.style.backgroundColor = "red"
        
        // Desativa o botão para evitar que o usuário clique 10 vezes no mesmo pedido
        botao.disabled = true
    })
})

// --- 5. EFEITOS VISUAIS DE HOVER (Relacionamento com CSS Transform) ---
// Seleciona todos os elementos com a classe .card
const cards = document.querySelectorAll(".card")

cards.forEach((card) =>{
    // Quando o mouse entra no card (mouseenter)
    card.addEventListener("mouseenter", ()=>{
        // Aplica o estilo CSS de subir 5 pixels (Efeito de flutuar)
        card.style.transform = "translateY(-5px)"
        // Adiciona uma sombra suave via JS
        card.style.boxShadow = "0 10px 10px #1111"
    })

    // Quando o mouse sai do card (mouseleave)
    card.addEventListener("mouseleave", ()=>{
        // Volta o card para a posição original (0) e remove a sombra
        card.style.transform = "translateY(0)"
        card.style.boxShadow = "none"
    })
})

