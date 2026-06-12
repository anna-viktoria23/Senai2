// Busca no HTML o <p> com id="boas-vindas" usando um seletor de CSS (#).
const saudacao = document.querySelector('#boas-vindas')

// Busca no HTML a primeira tag <img> que tenha o id="foto-destaque".
const fotoPrato1 = document.querySelector('#foto-destaque')

// Busca no HTML o <article> que representa o card da lasanha (id="card-lasanha").
const cardLasanha = document.querySelector('#card-lasanha')


// --- LÓGICA DINÂMICA (Manipulando o conteúdo do HTML) ---

// Cria um objeto de data e extrai a hora atual do sistema do usuário.
const agora = new Date()
const hora = agora.getHours()

// Estrutura condicional que decide qual texto injetar no HTML baseado na hora:
if (hora >= 1 && hora < 12){
    // Altera o texto "Carregando..." do HTML para "Bom dia!!"
    saudacao.textContent = "Bom dia!!" 
}
else if (hora >= 12 && hora < 18){
    // Altera para "Boa tarde!!"
    saudacao.textContent = "Boa tarde!!"
}
else if (hora >= 18 && hora <= 24){
    // Altera para "Boa noite!!"
    saudacao.textContent = "Boa noite!!" 
}
else {
    // Caso o relógio marque algo impossível ou 0h.
    saudacao.textContent = "A hora do seu computador está com erro"
}

// ACESSIBILIDADE: Altera o atributo 'alt' da imagem no HTML via código.
// Isso ajuda leitores de tela e SEO sem precisar mudar o arquivo .html manualmente.
fotoPrato1.alt = "Destaque do dia: Lasanha Bolonhesa"


// --- MANIPULAÇÃO DE ESTILO (Conexão Direta com o CSS) ---

// Altera o CSS diretamente (estilo inline): substitui o fundo do título.
// Isso ignora o 'background-color' definido no arquivo .css e aplica este novo.
titulo.style.backgroundColor = '#2e0505'

// A MÁGICA DA INTEGRAÇÃO:
// O JavaScript "injeta" a classe '.em-promocao' (que você criou no arquivo CSS) 
// dentro da tag <article id="card-lasanha"> no HTML. 
// Assim, o card ganha instantaneamente a borda, o zoom e a sombra definidos no CSS.
cardLasanha.classList.add('em-promocao')