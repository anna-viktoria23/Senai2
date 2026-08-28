document.addEventListener("DOMContentLoaded", () => {
  // 1. Mensagem de Boas-Vindas Dinâmica
  const boasVindas = document.getElementById("boas-vidas");
  if (boasVindas) {
    const hora = new Date().getHours();
    let saudacao = "Bem-vindo(a)!";

    if (hora >= 5 && hora < 12) {
      saudacao = "Bom dia! Seja bem-vindo(a)!";
    } else if (hora >= 12 && hora < 18) {
      saudacao = "Boa tarde! Seja bem-vindo(a)!";
    } else {
      saudacao = "Boa noite! Seja bem-vindo(a)!";
    }

    boasVindas.textContent = saudacao;
  }

  // 2. Fechar o menu mobile ao clicar em um link
  const checkboxMenu = document.getElementById("bt_menu");
  const linksMenu = document.querySelectorAll("#menu a");

  linksMenu.forEach((link) => {
    link.addEventListener("click", () => {
      if (checkboxMenu) checkboxMenu.checked = false;
    });
  });

  // 3. Manipulação e Validação do Formulário
  const formCadastro = document.getElementById("form-cadastro-prato");
  const divMensagem = document.getElementById("mensagem");

  if (formCadastro) {
    formCadastro.addEventListener("submit", async (event) => {
      event.preventDefault();

      // Coleta dos dados do formulário
      const nome = document.getElementById("nome").value.trim();
      const descricao = document.getElementById("descricao").value.trim();
      const preco = parseFloat(document.getElementById("preco").value);
      const categoria = document.getElementById("categoria").value;

      // Validação básica de preço
      if (isNaN(preco) || preco <= 0) {
        exibirMensagem("Por favor, insira um preço válido maior que zero.", "erro");
        return;
      }

      const novoPrato = {
        nome,
        descricao,
        preco,
        categoria,
      };

      try {
        // Exemplo usando requisição HTTP POST para uma API backend:
        /*
        const response = await fetch("https://sua-api.com/pratos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(novoPrato),
        });

        if (!response.ok) throw new Error("Erro ao cadastrar");
        */

        // Simulação de salvamento local (localStorage) para testes sem backend:
        const pratosSalvos = JSON.parse(localStorage.getItem("pratos") || "[]");
        pratosSalvos.push(novoPrato);
        localStorage.setItem("pratos", JSON.stringify(pratosSalvos));

        // Feedback visual e limpeza do formulário
        exibirMensagem(`Prato "${nome}" cadastrado com sucesso!`, "sucesso");
        formCadastro.reset();
      } catch (error) {
        exibirMensagem("Ocorreu um erro ao cadastrar o prato.", "erro");
        console.error(error);
      }
    });
  }

  // Função auxiliar para exibir mensagens de feedback
  function exibirMensagem(texto, tipo) {
    if (!divMensagem) return;

    divMensagem.textContent = texto;
    divMensagem.className = `mensagem-${tipo}`;

    // Estilo inline básico (pode ser ajustado no seu CSS)
    divMensagem.style.padding = "10px";
    divMensagem.style.marginTop = "15px";
    divMensagem.style.borderRadius = "4px";
    divMensagem.style.fontWeight = "bold";

    if (tipo === "sucesso") {
      divMensagem.style.backgroundColor = "#d4edda";
      divMensagem.style.color = "#155724";
    } else {
      divMensagem.style.backgroundColor = "#f8d7da";
      divMensagem.style.color = "#721c24";
    }

    // Oculta a mensagem após 4 segundos
    setTimeout(() => {
      divMensagem.textContent = "";
      divMensagem.style.padding = "0";
    }, 4000);
  }
});