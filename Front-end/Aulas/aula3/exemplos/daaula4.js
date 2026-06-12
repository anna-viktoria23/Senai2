class Prato{
    costructor(nome, preco){
        this.nome= nome
        this.preco= preco
    }
    
    exibirComMoeda(){
    return "R$" + this.preco.toFixed(2)
    }
}

const lasanha = new Prato("Lasanha Bolonhesa", 45.00 )

let qtd = prompt("Simulação: quantas unidades de " + lasanha.nome + "você deseja?")

let total = lasanha.preco * qtd

alert("Resumo da simulação: \nPrato: " + lasanha.nome + "\nTotal: " + lasanha.exibirComMoeda())