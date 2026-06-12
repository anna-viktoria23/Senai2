// Missão 1: Painel de Bordo (Manipulação Estática e Date)
// No arquivo src/scripts/script.js, crie uma lógica utilizando new Date().getHours(). Capture o parágrafo com o ID status-oficina.
// Regra: Se for antes das 12h, altere o texto para "Pé na estrada, bom dia!". Entre 12h e 18h, "Tarde perfeita para um test-drive!". Após as 18h, "Oficina fechada, boa noite!".

const saudacao = document.querySelector('#status-oficina')

const dia = new Date()
const hora = dia.getHours()

if (hora >= 1 && hora < 12) {
    saudacao.textContent= "Pé na estrada, Bom dia!"
}
else if (hora >= 12 && hora < 18) {
    saudacao.textContent = "Tarde perfeita para um test-drive!"
}
else if (hora >= 18 && hora <= 24) {
    saudacao.textContent = "oficina fechada, boa noite!"
}
else {
    saudacao.textContent = "A hora do seu computador está com erro!!"
}

//Missão 2: Modo Corrida (Eventos de Mouse e ClassList)
//Capture a seção com o ID banner-esportivo.
//Adicione um evento de mouseover (quando o mouse entra): utilize classList.add() para injetar a classe .modo-corrida na seção.
//Adicione um evento de mouseout (quando o mouse sai): utilize classList.remove() para retirar a classe .modo-corrida.

const corrida = document.querySelector('#banner-esportivo')

corrida.addEventListener('mouseover', () => {
    corrida.classList.add('modo-corrida')
})

corrida.addEventListener('mouseout', () => {
    corrida.classList.remove('modo-corrida')
})

//Missão 3: Consumo de Viagem (Evento Input e Divisão)
//Um dos nossos modelos faz exatamente 12km por litro. Capture o campo numérico (ID km-viagem).
//Crie um evento do tipo input nele. A cada número digitado, pegue o .value, divida por 12 e mostre o resultado (litros necessários) em tempo real no span com o ID resultado-combustivel

const pegar = document.querySelector('#km-viagem')

const mostrar = document.querySelector('#resultado-combustivel')

pegar.addEventListener('keyup', () => {
    let conta = pegar.value / 12

    mostrar.textContent = `${conta}`
})

//Missão 4: Lista de Interessados (Click, innerHTML e Easter Egg)
//Capture o botão "Tenho Interesse" (ID btn-interessado), o campo de texto (ID modelo-carro) e a div (ID lista-carros).
//Adicione um evento de click no botão.
//Easter Egg (Regra Oculta): Faça um if. Se o valor digitado pelo cliente for exatamente a palavra "Fusca", dispare um window.alert("Relíquia encontrada!") na tela (e permita que ele seja adicionado normalmente à lista).
//Injete o interesse na tela usando innerHTML +=. A string deve ser: <article class="card-interesse"><h3>🚗 Carro: [NOME DO CARRO DIGITADO] - INTERESSADO 🏁</h3></article>.

const capture = document.querySelector('#btn-interessado')

const texto = document.querySelector('#modelo-carro')

const lista = document.querySelector('#lista-carros')

capture.addEventListener('click', () => {

    texto.addEventListener('keyup', () => {
        let textoNovo = texto.value
        if (textoNovo === "Fusca") {
        window.alert("Relíquia encontrada!")

        lista.innerHTML += '<article class="card-interesse"><h3>🚗 Carro: [NOME DO CARRO DIGITADO] - INTERESSADO 🏁</h3></article>'
    } else {
        lista.innerHTML += '<article class="card-interesse"><h3>🚗 Carro: [NOME DO CARRO DIGITADO ] - INTERESSADO 🏁</h3></article>'
    }
    })
})


//Missão 5: Reset do Sistema (Limpeza e Focus)
//O sistema concluiu as vendas! Capture o botão "Reiniciar Painel" (ID btn-reset).
//Crie um evento de click nele que realize 3 ações consecutivas:
//Esvazie completamente a div da lista (ID lista-carros), deixando o innerHTML vazio "".
//Esvazie também o texto do input do modelo do carro (mudando o .value para "").
//Utilize a função focus() no campo de texto do modelo do carro para que o cursor do teclado volte a piscar lá dentro.

const reset = document.querySelector('#btn-reset')

reset.addEventListener('click', () => {
    lista.InnerHtml += ""
    texto.value = ""
    texto.addEventListener('focus', () => {
        texto
    })
})

