console.log(window.location.href)

//titulo
const titulo = document.getElementById('titulo-site')

//paragrafo boas vindas
const saudacao = document.querySelector('#boas-vindas')

//foto
const fotoPrato1 = document.querySelector('#foto-destaque')

//card lasanha
const cardLasanha = document.querySelector('#card-lasanha')

//manipulando as horas
const agora = new Date()
const hora = agora.getHours()

if (hora >= 1 && hora < 12){
    saudacao.textContent = "Bom dia!!" //alterar informação de texto
}
else if (hora >= 12 && hora < 18){
    saudacao.textContent = "Boa tarde!!"//alterar informação de texto
}
else if (hora >= 18 && hora <= 24){
    saudacao.textContent = "Boa noite!!" //alterar informação de texto
}
else {
    saudacao.textContent = "A hora do seu computador está com erro//alterar informação de texto"
}

//mudando o alt da foto
fotoPrato1.alt = "Destaque do dia: Lasanha Bolonhosa"

//mudando a cor do titulo
titulo.style.color = '#2e0505'

cardLasanha.classList.add('em-promocao')