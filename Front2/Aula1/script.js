class Prato {
    constructor (nome, preco, categoria){
        this.nome = nome
        this.preco = preco
        this.categoria = categoria  
    }

    formatarPreco(){ 
        return `R$ ${this.preco.toFixed(2).replace('.',',')}`
    }

    aplicarDesconto(percentual){
        this.preco = this.preco * (1 - percentual/100)
    }
}//ação

const cardapio = [
    new Prato("Feijoada completa", 42.90,"Prato Principal"),
    new Prato("Moqueca de Peixe", 58.00,"Prato principal"),
    new Prato("Coxinha Artesanal", 8.50, "Petisco"),
    new Prato("Brigadeiro Gourmet", 6.00, "Sobremesa"),
    new Prato("Morango do Amor (Pistache)", 15.00, "Sobremesa"),
    new Prato("Suco de Maracujá", 12.00, "Bebidas")
]

console.log("=== Pratos Criados ===")
cardapio.forEach(p => {
    console.log(`${p.nome} -> ${p.formatarPreco()}`)
})

const containerCardapio = document.querySelector('#cardapio')

function criarCardPrato(prato){
    const card = document.createElement('div')  //criar um elemento html
    card.className = 'card'

    card.innerHTML = `
    <h3>${prato.nome}</h3>
    <span class="categoria">${prato.formatarPreco()}</div>
    `

    card.addEventListener('click', () => {
        alert(//quebra de linha
            `🍽️${prato.nome} \n\n  
            Categoria: ${prato.categoria}
            Preco: ${prato.formatarPreco()}
            `
        )
    })
    return card
} // fim função criar prato

function renderizarCardapio(){
    containerCardapio.innerHTML = ''

    cardapio.forEach(prato => {
        const card = criarCardPrato(prato)
        containerCardapio.appendChild(card)
    })
} // fim da função renderizar

renderizarCardapio();

cardapio[1].aplicarDesconto(20);
renderizarCardapio()