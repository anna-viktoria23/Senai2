//atividade 1: Ao clicar no botão "Curtir", incremente o número no contador de curtidas.
const curtir = document.querySelector('#btn-curtir')

const contar = document.querySelector('#contador')

let quantidadeCurtida = 0

curtir.addEventListener('click', function(){
   quantidadeCurtida += 1
    contar.textContent = quantidadeCurtida
})

//Atividade 2:  Sempre que o usuário digitar no campo de texto, o parágrafo de "Preview" deve mostrar o texto em tempo real. (slide)

const pegar = document.querySelector('#campo-texto')

const preview = document.querySelector('#preview-texto')

pegar.addEventListener('keyup', () => {
    let mudar = pegar.value 
    preview.textContent = mudar
})

//Atividade 3: Ao entrar com o mouse na caixa de cor, mude-a para azul. Ao sair, ela deve voltar à cor original. (slide)

const mude = document.querySelector('#caixa-cor')

mude.addEventListener('mouseover', () => {
    mude.style.backgroundColor = "#9a1414"
})

mude.addEventListener('mouseout', () => {
    mude.style.backgroundColor = "#95a5a6"
})

//Desafio extra: Crie um botão (ou use uma tecla) que limpe o input e zera o contador ao mesmo tempo.
