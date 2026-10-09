//Aula 3

function Header({totalItens}) {
    return (
       <header className="header">
        <h1>TechFood - Sabor & Saber</h1>
        <p>O sabor que ensina</p>
        <p className="carrinho">Itens no pedido: {totalItens}</p>
    </header> 
    )
}

export default Header;