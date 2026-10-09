// T4: as props chegam num objeto; pegamos cada uma pelo nome, entre { }
function CardMaterial({ nome, lixeira, precoKg }) {
return (
<article className="card">
<span className="lixeira">Lixeira {lixeira}</span>
<h2>{nome}</h2>
<p className="preco">{precoKg} por kg</p>
</article>
);
}
export default CardMaterial;