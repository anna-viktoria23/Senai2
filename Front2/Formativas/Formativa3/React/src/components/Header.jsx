function Header({ totalItens, totalPreco, onLimparPedido }) {
  const precoTotalFormatado = (totalPreco || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <header className="header">
      <h1>TechFood - Sabor & Saber</h1>
      <p>O sabor que ensina</p>
      <div className="carrinho">
        <p>Itens no pedido: {totalItens}</p>
        <p>Total: {precoTotalFormatado}</p>
        {totalItens > 0 && (
          <button type="button" className="btn-limpar" onClick={onLimparPedido}>
            🗑️ Limpar pedido
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;