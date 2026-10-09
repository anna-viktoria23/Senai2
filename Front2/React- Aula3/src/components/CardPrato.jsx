function CardPrato ({nome, preco, categoria}) {
    const precoFormatado = preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
    return(
    <aticle classname="card-prato">
        <span className="categoria">{categoria}</span>
        <h2>{nome}</h2>
        <p className="preco">R$ {preco.toFixed(2)}</p>
    </aticle>
    )
 }   

 export default CardPrato;