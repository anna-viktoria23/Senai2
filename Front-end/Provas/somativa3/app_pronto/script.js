/* ============================================================
   SCRIPT.JS — Lista de Filmes
   ⚠ ESTE ARQUIVO TEM 2 BUGS QUE VOCÊ PRECISA ENCONTRAR E
   CORRIGIR. Veja a prova para detalhes.
   ============================================================ */


const CHAVE_STORAGE = "meus_filmes";


/* ============================================================
   1) INICIALIZAÇÃO
   ============================================================ */
document.addEventListener("DOMContentLoaded", function () {
  configurarFormulario();
  renderizarFilmes();
});


/* ============================================================
   2) CONFIGURAR SUBMIT DO FORMULÁRIO
   ============================================================ */
function configurarFormulario() {
  const form = document.querySelector("#form-filme");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const filme = {
      titulo:     document.querySelector("#input-titulo").value,
      diretor:    document.querySelector("#input-diretor").value,
      nota:       Number(document.querySelector("#input-nota").value),
      genero:     document.querySelector("#input-genero").value,      comentario: document.querySelector("#input-comentario").value,
    };

    salvarFilme(filme);
    form.reset();
    renderizarFilmes();
  });
}


/* ============================================================
   3) SALVAR FILME NO LOCALSTORAGE
   ============================================================ */
function salvarFilme(filme) {
  const lista = JSON.parse(localStorage.getItem(CHAVE_STORAGE)) || [];
  lista.push(filme);

  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(lista)); //erro
}


/* ============================================================
   4) MOSTRAR OS FILMES NA TELA
   ============================================================ */
function renderizarFilmes() {
  const lista = JSON.parse(localStorage.getItem(CHAVE_STORAGE)) || [];
  const ul = document.querySelector("#lista-filmes");
  const msgVazio = document.querySelector("#msg-vazio");
  const contador = document.querySelector("#contador")

  ul.innerHTML = "";

  if (lista.length === 0) {
    msgVazio.style.display = "block";
    return;
  }
  msgVazio.style.display = "none";

  lista.forEach(function (filme, indice) {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${filme.titulo}</strong>
      <div class="meta">Diretor: ${filme.diretor} • Genero: ${filme.genero} - Nota: ${filme.nota}/5</div>
      <div class="comentario">"${filme.comentario}"</div>
      <button class="btn-excluir" id="btn-exluir">Excluir</button>
    `;
    ul.appendChild(li);
  });
  
  contador.textContent= `Você tem ${lista.length} filmes`

}


/* ============================================================
   5) DELEGAÇÃO DE EVENTOS — BOTÃO EXCLUIR
   ============================================================ */
document.querySelector("#btn-excluir").addEventListener("click", function (event) { if (event.target === "btn-excluir") {
    excluirFilme;
  }
})
 // 🐛 ATENÇÃO: tem um bug aqui. O botão Excluir não funciona.
  //    Olhe com atenção como o botão é criado no innerHTML acima (função 4).

/* ============================================================
   6) EXCLUIR FILME
   ============================================================ */
function excluirFilme(indice) {
  const botao = document.querySelector("#btn-limpar")
  
  const lista = JSON.parse(localStorage.getItem(CHAVE_STORAGE)) || [];
  lista.splice(indice, 1);
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(lista));
  renderizarFilmes();
}
