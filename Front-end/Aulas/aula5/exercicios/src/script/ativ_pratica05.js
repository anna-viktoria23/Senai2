//Atividade de Dom estatico

//exercicio 1: Selecione o #nome-usuario e mude o texto para o seu nome completo.
const nome = document.querySelector('#nome-usuario')
nome.textContent = "Anna Viktoria Alacamini de Carvalho"


//Exercicio 2: Troque o src da foto de perfil por uma URL de imagem real.
const foto = document.querySelector('#foto-perfil')
foto.src = "https://lh3.googleusercontent.com/IDBTg2VIRuBRBHnLU6bxMBF6BDIZWEYEBkxVVYiK4GpewtsUiBQEPCLdhapP8uPrAcqC4-bPaB7lpjdq2k8KPEuo=s172"


//exercicio 3: Altere a cor de fundo do #container-perfil através do JavaScript.
const mudaCor = document.querySelector('#container-perfil')
mudaCor.style.backgroundColor= "#de8282"

//Exercicio 4:  Adicione a classe .online ao #badge-status e mude o texto para "Status: Ativo".
const Status = document.querySelector('#badge-status')
Status.classList.add('online')
Status.textContent = "Online"

//Exercicio 5: Use querySelectorAll para contar quantas skills o usuário possui e exiba o total no console.
const conta = document.querySelectorAll('.skill')
console.log("O número de skills é:", conta.length)