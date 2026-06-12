class Prato{
    costructor(nome, preco){
        this.nome= nome
        this.preco= preco
    }


    exibirComMoeda(resultado){
    //return "R$" + this.preco.toFixed(2)
    // return "R$" + resultado.toFixed(2)
    if(resultado) {
        return "R$" + resultado.toFixed(2);
    }
    else {
        return "R$" + this.preco.toFixed(2);
    }
    }
}

// const lasanha = new Prato("Lasanha Bolonhesa", 45.00 )

// let qtd = prompt("Simulação: quantas unidades de "+ lasanha.nome + "você deseja?")

// let total = lasanha.preco * qtd

// alert("Resumo da simulação: \nPrato: " + lasanha.nome + "\nTotal: " + lasanha.exibirComMoeda(total))

alert("Bem vido ao restaurante!!!")

const cliente = prompt("para um atendimento personalizado, digite seu nome: ")

let clienteFormatado =  cliente.trim().toUpperCase()

alert("Bem vindo " + clienteFormatado+ "ao restaurante sabor e saber")