const express = require("express");
const pool = require("./config/database");

const app = express();
<<<<<<< HEAD

app.use(express.json());

const queryAsync = (sql, values = []) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};


// MÉTODOS DE FILME

app.get("/", (req, res) => {
  res.send("A API cinema está funcionando");
});

app.get("/filme", async (req, res) => {
  try { //Significa "tente". Ele delimita um bloco de código que você suspeita que possa gerar um erro (como uma conexão com o banco de dados que pode falhar).
    const filmes = await queryAsync("SELECT * FROM filme"); //Significa "espere". É usado antes de funções que devolvem uma Promise (promessa). Ele avisa ao Node.js: "Pare a execução desta rota e espere o banco de dados responder antes de continuar para a próxima linha". Sem ele, o código tentaria usar os dados antes mesmo de eles chegarem do banco.
=======
app.use(express.json());

const queryAsync = (sql, values = []) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

app.get("/", (req, res) => {
  res.send("API CINEMA");
});

app.get("/filmes", async (req, res) => {
  try {
    const filmes = await queryAsync("SELECT * FROM filme");
>>>>>>> 234b1ebac7a349209b1f6c96b40e4f2f14f08218
    res.json({
      sucesso: true,
      dados: filmes,
      total: filmes.length,
    });
<<<<<<< HEAD
  } catch (erro) { //Significa "capturar". Se qualquer erro ocorrer dentro do bloco try, o JavaScript "pula" imediatamente para o catch. Ele evita que sua aplicação trave e permite que você exiba uma mensagem de erro amigável.
    console.error("Erro ao listar filmes: ", erro);
    res.status(500).json({
      //Erro de servidor
=======
  } catch (erro) {
    console.error("Erro ao listar filmes:", erro);
    res.status(500).json({
>>>>>>> 234b1ebac7a349209b1f6c96b40e4f2f14f08218
      sucesso: false,
      mensagem: "Erro ao listar filmes",
      erro: erro.message,
    });
  }
});

<<<<<<< HEAD
app.get("/filme/:id", async (req, res) => {
  try { //Significa "tente". Ele delimita um bloco de código que você suspeita que possa gerar um erro (como uma conexão com o banco de dados que pode falhar).
    const { id } = req.params;

    if (!id || isNaN //Abreviação de "Is Not a Number" (Não é um Número). É uma função que retorna true se o valor testado não puder ser convertido em número. Útil para validar IDs que chegam pela URL (que sempre chegam como texto).
        (id)) {
=======
app.get("/filmes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
>>>>>>> 234b1ebac7a349209b1f6c96b40e4f2f14f08218
      return res.status(400).json({
        sucesso: false,
        mensagem: "ID de filme inválido",
      });
    }
<<<<<<< HEAD

    const filme = await queryAsync("SELECT * FROM filme WHERE id = ?", [id]); //Significa "espere". É usado antes de funções que devolvem uma Promise (promessa). Ele avisa ao Node.js: "Pare a execução desta rota e espere o banco de dados responder antes de continuar para a próxima linha". Sem ele, o código tentaria usar os dados antes mesmo de eles chegarem do banco.
=======
    const filme = await queryAsync("SELECT * FROM filme WHERE id = ?", [id]);
>>>>>>> 234b1ebac7a349209b1f6c96b40e4f2f14f08218

    if (filme.length === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: "Filme não encontrado",
      });
    }

    res.json({
      sucesso: true,
      dados: filme[0],
    });
<<<<<<< HEAD
  } catch (erro) { //Significa "capturar". Se qualquer erro ocorrer dentro do bloco try, o JavaScript "pula" imediatamente para o catch. Ele evita que sua aplicação trave e permite que você exiba uma mensagem de erro amigável.
=======
  } catch (erro) {
>>>>>>> 234b1ebac7a349209b1f6c96b40e4f2f14f08218
    console.error("Erro ao listar filmes:", erro);
    res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao listar filmes",
      erro: erro.message,
    });
  }
});

<<<<<<< HEAD
app.post("/filme", async (req, res) => {
  try { //Significa "tente". Ele delimita um bloco de código que você suspeita que possa gerar um erro (como uma conexão com o banco de dados que pode falhar).
=======
app.post("/filmes", async (req, res) => {
  try {
>>>>>>> 234b1ebac7a349209b1f6c96b40e4f2f14f08218
    const { titulo, genero, duracao, classificacao, data_lancamento } =
      req.body;

    if (!titulo || !genero || !duracao) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "Título, gênero e duração são obrigatórios",
      });
    }

<<<<<<< HEAD
    if (typeof //É um operador que retorna uma string dizendo qual é o tipo da variável. No seu código, typeof duracao !== "number" verifica se o que o usuário enviou é realmente um número e não um texto ou booleano.
        duracao !== "number" || duracao <= 0) {
=======
    if (typeof duracao !== "number" || duracao <= 0) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "Duração deve ser um número positivo",
      });
    }

    if (typeof disponivel !== "bo0lean") {
>>>>>>> 234b1ebac7a349209b1f6c96b40e4f2f14f08218
      return res.status(400).json({
        sucesso: false,
        mensagem: "Duração deve ser um número positivo",
      });
    }

    const novoFilme = {
<<<<<<< HEAD
      titulo: titulo.trim(), // Um método de strings que remove espaços em branco inúteis no início e no fim de um texto. 
      genero: genero.trim(), // Um método de strings que remove espaços em branco inúteis no início e no fim de um texto. 
      duracao: duracao,
      classificacao: classificacao || null, //informação não obrigatória
      data_lancamento: data_lancamento || null, //informação não obrigatória
    };

    const resultado = await queryAsync("INSERT INTO filme SET ?", [novoFilme]); //Significa "espere". É usado antes de funções que devolvem uma Promise (promessa). Ele avisa ao Node.js: "Pare a execução desta rota e espere o banco de dados responder antes de continuar para a próxima linha". Sem ele, o código tentaria usar os dados antes mesmo de eles chegarem do banco.
=======
      titulo: titulo.trim(),
      genero: genero.trim(),
      duracao: duracao,
      classificacao: classificacao || null,
      data_lancamento: data_lancamento || null,
    };

    const resultado = await queryAsync("INSERT INTO filme SET ?", [novoFilme]);
>>>>>>> 234b1ebac7a349209b1f6c96b40e4f2f14f08218

    res.status(201).json({
      sucesso: true,
      mensagem: "Filme criado com sucesso",
      id: resultado.insertId,
    });
<<<<<<< HEAD
  } catch (erro) { //Significa "capturar". Se qualquer erro ocorrer dentro do bloco try, o JavaScript "pula" imediatamente para o catch. Ele evita que sua aplicação trave e permite que você exiba uma mensagem de erro amigável.
    console.error("Erro ao criar filmes: ", erro);
    res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao criar filmes",
      message: erro.message,
=======
  } catch (erro) {
    console.error("Erro ao listar filmes:", erro);
    res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao listar filmes",
      erro: erro.message,
>>>>>>> 234b1ebac7a349209b1f6c96b40e4f2f14f08218
    });
  }
});

<<<<<<< HEAD
app.put("/filme/:id", async (req, res) => {
  try { //Significa "tente". Ele delimita um bloco de código que você suspeita que possa gerar um erro (como uma conexão com o banco de dados que pode falhar).
=======
app.put("/filmes/:id", async (req, res) => {
  try {
>>>>>>> 234b1ebac7a349209b1f6c96b40e4f2f14f08218
    const { id } = req.params;
    const { titulo, genero, duracao, classificacao, data_lancamento } =
      req.body;

<<<<<<< HEAD
    if (!id || isNaN //Abreviação de "Is Not a Number" (Não é um Número). É uma função que retorna true se o valor testado não puder ser convertido em número. Útil para validar IDs que chegam pela URL (que sempre chegam como texto).
        (id)) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "ID de filme inválido",
      });
    }

    const filmeExiste = await queryAsync("SELECT * FROM filme WHERE id = ?", [id,]); //Significa "espere". É usado antes de funções que devolvem uma Promise (promessa). Ele avisa ao Node.js: "Pare a execução desta rota e espere o banco de dados responder antes de continuar para a próxima linha". Sem ele, o código tentaria usar os dados antes mesmo de eles chegarem do banco.
=======
    if (!id || isNaN(id)) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "ID de filme inválido.",
      });
    }

    const filmeExiste = await queryAsync("SELECT * FROM filme WHERE id = ?", [
      id,
    ]);
>>>>>>> 234b1ebac7a349209b1f6c96b40e4f2f14f08218

    if (filmeExiste.length === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: "Filme não encontrado",
      });
    }

    const filmeAtualizado = {};

<<<<<<< HEAD
    if (titulo !== undefined) filmeAtualizado.titulo = titulo.trim(); // Um método de strings que remove espaços em branco inúteis no início e no fim de um texto. 
    if (genero !== undefined) filmeAtualizado.genero = genero.trim(); // Um método de strings que remove espaços em branco inúteis no início e no fim de um texto. 
    if (duracao !== undefined) {
      if (typeof //É um operador que retorna uma string dizendo qual é o tipo da variável. No seu código, typeof duracao !== "number" verifica se o que o usuário enviou é realmente um número e não um texto ou booleano.
        duracao !== "number" || duracao <= 0)
        return res.status(400).json({
          sucesso: false,
          mensagem: "Duração deve ser um número positivo",
        });
      filmeAtualizado.duracao = duracao;
    }

    if (classificacao !== undefined)
      filmeAtualizado.classificacao = classificacao.trim(); // Um método de strings que remove espaços em branco inúteis no início e no fim de um texto. 
=======
    if (titulo !== undefined) filmeAtualizado.titulo = titulo.trim();
    if (genero !== undefined) filmeAtualizado.genero = genero.trim();
    if (duracao !== undefined) {
      if (typeof duracao !== "number" || duracao <= 0)
        return res.status(400).json({
          sucesso: false,
          mensagem: "Duração deve ser um número positivo.",
        });
      filmeAtualizado.duracao = duracao;
    }
    if (classificacao !== undefined)
      filmeAtualizado.classificacao = classificacao.trim();
>>>>>>> 234b1ebac7a349209b1f6c96b40e4f2f14f08218
    if (data_lancamento !== undefined)
      filmeAtualizado.data_lancamento = data_lancamento;

    if (Object.keys(filmeAtualizado).length === 0) {
      return res.status(400).json({
        sucesso: false,
<<<<<<< HEAD
        mensagem: "Não há nenhuma informação para ser atualizada",
      });
    }

    await queryAsync("UPDATE filme SET ? WHERE id = ?", [filmeAtualizado, id]); //Significa "espere". É usado antes de funções que devolvem uma Promise (promessa). Ele avisa ao Node.js: "Pare a execução desta rota e espere o banco de dados responder antes de continuar para a próxima linha". Sem ele, o código tentaria usar os dados antes mesmo de eles chegarem do banco.
=======
        mensagem: "Nenhum campo para atualizar",
      });
    }

    await queryAsync("UPDATE filme SET ? WHERE id = ?", [filmeAtualizado, id]);
>>>>>>> 234b1ebac7a349209b1f6c96b40e4f2f14f08218
    res.json({
      sucesso: true,
      mensagem: "Filme atualizado!",
    });
<<<<<<< HEAD
  } catch (erro) { //Significa "capturar". Se qualquer erro ocorrer dentro do bloco try, o JavaScript "pula" imediatamente para o catch. Ele evita que sua aplicação trave e permite que você exiba uma mensagem de erro amigável.
    console.error("Erro ao atulizar filme: ", erro);
    res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao atualizar filme",
      message: erro.message,
=======
  } catch (erro) {
    console.error("Erro ao atualizar filme", erro);
    res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao atualizar filme",
      erro: erro.message,
>>>>>>> 234b1ebac7a349209b1f6c96b40e4f2f14f08218
    });
  }
});

<<<<<<< HEAD
app.delete("/filme/:id", async (req, res) => {
  try { //Significa "tente". Ele delimita um bloco de código que você suspeita que possa gerar um erro (como uma conexão com o banco de dados que pode falhar).
    const { id } = req.params;

    if (!id || isNaN //Abreviação de "Is Not a Number" (Não é um Número). É uma função que retorna true se o valor testado não puder ser convertido em número. Útil para validar IDs que chegam pela URL (que sempre chegam como texto).
        (id)) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "ID de filme inválido",
      });
    }

    const filmeExiste = await queryAsync("SELECT * FROM filme WHERE id = ?", [id,]); //Significa "espere". É usado antes de funções que devolvem uma Promise (promessa). Ele avisa ao Node.js: "Pare a execução desta rota e espere o banco de dados responder antes de continuar para a próxima linha". Sem ele, o código tentaria usar os dados antes mesmo de eles chegarem do banco.
=======
app.delete("/filmes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "ID de filme inválido.",
      });
    }

    const filmeExiste = await queryAsync("SELECT * FROM filme WHERE id = ?", [
      id,
    ]);
>>>>>>> 234b1ebac7a349209b1f6c96b40e4f2f14f08218

    if (filmeExiste.length === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: "Filme não encontrado",
      });
    }

    await queryAsync("DELETE FROM filme WHERE id = ?", [id]);
<<<<<<< HEAD

    res.json({
      sucesso: true,
      mensagem: "Filme deletado com sucesso!",
    });
  } catch (erro) { //Significa "capturar". Se qualquer erro ocorrer dentro do bloco try, o JavaScript "pula" imediatamente para o catch. Ele evita que sua aplicação trave e permite que você exiba uma mensagem de erro amigável.
    console.error("Erro ao atulizar filme: ", erro);
    res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao atualizar filme",
      message: erro.message,
    });
  }
});


// MÉTODOS DE SALA

app.get("/sala", async (req, res) => {
  try { //Significa "tente". Ele delimita um bloco de código que você suspeita que possa gerar um erro (como uma conexão com o banco de dados que pode falhar).
    const salas = await queryAsync("SELECT * FROM sala");
    res.json({
      sucesso: true,
      dados: salas,
      total: salas.length,
    });
  } catch (erro) {
    console.error("Erro ao listar salas: ", erro);
    res.status(500).json({
      //Erro de servidor
      sucesso: false,
      mensagem: "Erro ao listar salas",
=======
    res.json({
      sucesso: true,
      mensagem: "O Filme foi apagado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao Deletar filme", erro);
    res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao Deletar filme",
>>>>>>> 234b1ebac7a349209b1f6c96b40e4f2f14f08218
      erro: erro.message,
    });
  }
});

<<<<<<< HEAD
app.get("/sala/:id", async (req, res) => {
  try { //Significa "tente". Ele delimita um bloco de código que você suspeita que possa gerar um erro (como uma conexão com o banco de dados que pode falhar).
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "ID de sala inválido",
      });
    }

    const sala = await queryAsync("SELECT * FROM sala WHERE id = ?", [id]);

    if (sala.length === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: "Sala não encontrada",
      });
    }

    res.json({
      sucesso: true,
      dados: sala[0],
    });
  } catch (erro) { //Significa "capturar". Se qualquer erro ocorrer dentro do bloco try, o JavaScript "pula" imediatamente para o catch. Ele evita que sua aplicação trave e permite que você exiba uma mensagem de erro amigável.
    console.error("Erro ao encontrar sala:", erro);
    res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao encontrar sala",
      erro: erro.message,
    });
  }
});

app.post("/sala", async (req, res) => {
  try { //Significa "tente". Ele delimita um bloco de código que você suspeita que possa gerar um erro (como uma conexão com o banco de dados que pode falhar).
    const { nome, capacidade } = req.body;

    if (!capacidade || !nome) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "Nome e capacidade da sala são obrigatórios",
      });
    }

    if (typeof capacidade !== "number" || capacidade <= 0) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "Capacidade deve ser um número positivo",
      });
    }

    const novaSala = {
      nome: nome.trim(),
      capacidade: capacidade,
    };

    const resultado = await queryAsync("INSERT INTO sala SET ?", [novaSala]);

    res.status(201).json({
      sucesso: true,
      mensagem: "Sala criada com sucesso",
      id: resultado.insertId,
    });
  } catch (erro) { //Significa "capturar". Se qualquer erro ocorrer dentro do bloco try, o JavaScript "pula" imediatamente para o catch. Ele evita que sua aplicação trave e permite que você exiba uma mensagem de erro amigável.
    console.error("Erro ao criar salas: ", erro);
    res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao criar salas",
      message: erro.message,
    });
  }
});

app.put("/sala/:id", async (req, res) => {
  try { //Significa "tente". Ele delimita um bloco de código que você suspeita que possa gerar um erro (como uma conexão com o banco de dados que pode falhar).
    const { id } = req.params;
    const { nome, capacidade } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "ID de sala inválido",
      });
    }

    const salaExiste = await queryAsync("SELECT * FROM sala WHERE id = ?", [
      id,
    ]);

    if (salaExiste.length === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: "Sala não encontrada",
      });
    }

    const salaAtualizada = {};

    if (nome !== undefined) salaAtualizada.nome = nome.trim();
    if (capacidade !== undefined) {
      if (typeof capacidade !== "number" || capacidade <= 0)
        return res.status(400).json({
          sucesso: false,
          mensagem: "Capacidade deve ser um número positivo",
        });
      salaAtualizada.capacidade = capacidade;
    }

    if (Object.keys(salaAtualizada).length === 0) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "Não há nenhuma informação para ser atualizada",
      });
    }

    await queryAsync("UPDATE sala SET ? WHERE id = ?", [salaAtualizada, id]);
    res.json({
      sucesso: true,
      mensagem: "Sala atualizada!",
    });
  } catch (erro) { //Significa "capturar". Se qualquer erro ocorrer dentro do bloco try, o JavaScript "pula" imediatamente para o catch. Ele evita que sua aplicação trave e permite que você exiba uma mensagem de erro amigável.
    console.error("Erro ao atulizar sala: ", erro);
    res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao atualizar sala",
      message: erro.message,
    });
  }
});

app.delete("/sala/:id", async (req, res) => {
  try { //Significa "tente". Ele delimita um bloco de código que você suspeita que possa gerar um erro (como uma conexão com o banco de dados que pode falhar).
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "ID de sala inválido",
      });
    }

    const salaExiste = await queryAsync("SELECT * FROM sala WHERE id = ?", [
      id,
    ]);

    if (salaExiste.length === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: "Sala não encontrada",
      });
    }

    await queryAsync("DELETE FROM sala WHERE id = ?", [id]);

    res.json({
      sucesso: true,
      mensagem: "Sala deletada com sucesso!",
    });
  } catch (erro) { //Significa "capturar". Se qualquer erro ocorrer dentro do bloco try, o JavaScript "pula" imediatamente para o catch. Ele evita que sua aplicação trave e permite que você exiba uma mensagem de erro amigável.
    console.error("Erro ao atulizar sala: ", erro);
    res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao atualizar sala",
      message: erro.message,
    });
  }
});

app.get("/sessoes", async (req, res) => {
    try{ //Significa "tente". Ele delimita um bloco de código que você suspeita que possa gerar um erro (como uma conexão com o banco de dados que pode falhar).
        const sessoes = await queryAsync("SELECT * FROM sessao")
        res.json({
            sucesso: true,
            dados: sessoes,
            total: sessoes.length,
        })
    } catch (erro) { //Significa "capturar". Se qualquer erro ocorrer dentro do bloco try, o JavaScript "pula" imediatamente para o catch. Ele evita que sua aplicação trave e permite que você exiba uma mensagem de erro amigável.
        console.error("Erro os listar as sessões: ", erro)
        res.status(500).json({
            //erro no servidor
            sucesso: false,
            mensagem: "Erro ao listar sessões",
=======





//Sala
app.get("/salas", async (req, res) =>{
    try{
        const salas = await queryAsync("SELECT * FROM sala");
        res.json({
            sucesso: true,
            dados: salas,
            total: filmes.length,
        });
    } catch (erro) {
        console.error("Erro ao listar salas:", erro);
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao listar salas",
            erro: erro.message,
        })
    }
});

app.get("/salas/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                sucesso: false,
                mensage: "Id de sala invalido"
            });
        }
        const sala= await queryAsync ("SELECT * FROM sala WHERE id =", [id]);

        if (sala.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: "Sala não encontrada"
            })
        }

        res.json({
            sucesso: true,
            dados: sala[0],
        })
    } catch (erro) {
        console.erro("Erro ao listar as salas:", erro)
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao listar salas",
>>>>>>> 234b1ebac7a349209b1f6c96b40e4f2f14f08218
            erro: erro.message
        })
    }
})

<<<<<<< HEAD
app.get("/sessoes/:id", async (req, res) =>{
    try{
        const {id} = req.params

        if (!id || isNaN (id)) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "ID de sessao invalido"
            })
        }

        const sessao = await queryAsync("SELECT * FROM sessao WHERE id = ?", [id])

        if (sessao.length === 0) {
            return res.ststus(404).json({
                sucesso: false,
                mensagem: "Sessão não encontrada",
            })
        }

        res.json({
            sucesso: true,
            dados: sessao[0],
        })
    } catch (erro) {
        console.error("Erro ao listar sessões:", erro)
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao listar sessões",
            erro: erro.massage
        })
    }
})

app.post("/sessoes", async (req, res) => {
    try {
        const {sala_id, filme_id, data_hora, preco} = req.body

        //se não forem colocados
        if (!filme_id || !sala_id || !data_hora || !preco) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "ID de sala/filme, data, hora e preço precisam ser colocados"
            })
        }

        //validando o preço
        if (preco <= 0 || isNaN(preco)) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "O preço da sessão precisa ser maior que 0"
            })
        }

        //validando a chave estrangeira de sala
        const salaExiste = await queryAsync("SELECT id FROM sala WHERE id = ?", [sala_id])

        if (salaExiste.length === 0) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "ID de sala não é existente",
            })
        }

        //validando a cahve estrangeira de filme
        const filmeExistente = await queryAsync("SELECT id FROM filme WHERE id = ?", [filme_id])

        if (filmeExistente.length === 0) {
            return resizeTo.status(400).json({
                sucesso: false,
                mensagem: "ID de filme não existe"
            })
        }

        const novaSessao = {
            sala_id: sala_id,
            filme_id: filme_id,
            data_hora: data_hora,
            preco: preco,
        }

        const resultado = await query("INSERT INTO sessao SET ?", [novaSessao])

        res.status(201).json({
            sucesso: true,
            mensagem: "Sessão criada com sucesso",
            id: resultado.insertId,
        })
    } catch (erro) {
        console.error("Erro ao criar a sessão: ", erro)
        return res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao criar a sessão",
            erro: erro.message
        })
    }
})

app.put("/sessoes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { sala_id, filme_id, data_hora, preco } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "ID de sessão inválido",
      });
    }

    const sessaoExiste = await queryAsync("SELECT * FROM sessao WHERE id = ?", [
      id,
    ]);

    if (sessaoExiste.length === 0) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "Sessão não encontrada",
      });
    }

    const sessaoAtulizada = {};

    if (!isNaN(sala_id) || sala_id !== undefined)
      sessaoAtulizada.sala_id = sala_id;
    
   
    if (!isNaN(filme_id) || filme_id !== undefined)
      sessaoAtulizada.filme_id = filme_id;
   
   
    if (data_hora !== undefined) sessaoAtulizada.data_hora = data_hora;
   
   
    if (preco !== undefined) {
      if (preco <= 0 || isNaN(preco))
        return res.status(404).json({
          sucesso: false,
          mensagem: "Preço deve ser um número positivo",
        });
      sessaoAtulizada.preco = preco;
    }

    if (Object.keys(sessaoAtulizada).length === 0) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "Não há nenhuma informação para ser atualizada",
      });
    }

    await queryAsync("UPDATE sessao SET ? WHERE id = ?", [sessaoAtulizada, id]);
    res.json({
      sucesso: true,
      mensagem: "Atualização feita com sucesso",
    });
  } catch (erro) {
    console.error("Erro ao atulizar sessão", erro);
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao atualizar sessão",
      erro: erro.message,
    });
  }
});

app.delete("/sessoes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "ID de sessão inválido",
      });
    }

    const sessaoExiste = await queryAsync("SELECT * FROM sessao WHERE id = ?", [
      id,
    ]);

    if (sessaoExiste.length === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: "Sessão não encontrada",
      });
    }

    await queryAsync("DELETE FROM sessao WHERE id = ?", [id]);

    res.json({
      sucesso: true,
      mensagem: "Sessão deletada com sucesso",
    });
  } catch (erro) {
    console.error("Erro ao excluir sessão: ", erro);
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao excluir sessão",
      erro: erro.message,
    });
  }
});


// MÉTODOS DE INGRESSO 

app.get ('/ingresso', async (req, res) => {
  try {
    const ingresso = await queryAsync ("SELECT * FROM ingresso")

    res.json ({
      sucesso: true,
      dados: ingresso,
      total: ingresso.length
    })
  } catch (erro) {
    console.error ("Erro ao listar ingressos: ", erro)
    res.status(400).json ({
      sucesso: false,
      mensagem: "Erro ao listar ingressos",
      erro: erro.message
    })
  }
})

app.get ('/ingresso/:id', async (req, res) => {
  try {
    const {id} = req.params

    if(!id || isNaN(id)) {
      res.status(400).json ({
        sucesso: false,
        mensagem: "ID de ingresso é inválido",
      })
    }

    const ingresso = await queryAsync ("SELECT * FROM ingresso WHERE id = ?", [id])

    if(ingresso.length === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: "Ingresso não encontrado",
      })
=======
app.post("/salas", async (req, res) => {
    try {
        const {nome, capacidade} = req.body;

        if (!nome || !capacidade) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "Nome e capacidade são obrigatórios!!"
            })
        }

        if (typeof capacidade !=="number" || capacidade <= 0) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "Capacidade deve ser um número positivo"
            })
        }

        const novaSala = {
            nome: nome.trim(),
            capacidade: capacidade
        }

        const resultado = await queryAsync("INSERT INTO sala SET ?",
            [novaSala]
        )

        res.status(201).json({
            sucesso: true,
            mensagem: "Sala adcionada com sucesso",
            id: resultado.insertId,
        })
    } catch (erro) {
        console.error("Erro ao listar salas:", erro);
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao listar salas",
            erro: erro.massage,
        })
    }
});

app.put("/salas/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { nome, capacidade} = req.body;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "Id de sala é invalido"
            })
        }

        const salaExistente = await queryAsync("SELECT * FROM sala WHERE id = ?", [
            id,
        ])

        if (salaExistente.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: "Sala não encontrada",
            })
        }

        const salaAtualizada = {}

        if (nome !== undefined) salaAtualizada.nome = nome.trim();
        if (capacidade !== undefined) {
            if (typeof capacidade !=="number" || capacidade <=0)
                return res.status(400).json({
            sucesso: false,
            mensagem: "Capacidade DEVE ser um número positivo"
        })
        salaAtualizada.capacidade = capacidade
        }

        if(Object.keys(salaAtualizada).length === 0) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "Nenhum campo para atualizar"
            });
        }

        await queryAsync("UPDATE sala SET ? WHERE id = ?",
            [salaAtualizada, id])
            res.json({
                sucesso: true,
                mensagem: "Sala atualizada com sucesso",
            })
    } catch (erro) {
        console.error("Erro ao atualixar filme", erro);
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao atualizar a sala",
            erro: erro.message,
        })
    }
});

app.delete("/filme/:id", async (req, res) => {
    try{
        const { id } = req.params;
        if (!id || isNaN(id)) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "ID de sala inválido"
            })
        }

        const salaExistente = await queryAsync("SELECT * FROM sala WHERE id = ?", [
            id,
        ]);

        if (salaExistente.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: "Sala não encontrada"
            })
        }

        await queryAsync("DELETE FROM sala WHERE id = ?", [id]);
        res.json({
            sucesso: true,
            mensagem: "A sala foi apagada"
        })
    } catch (erro){
        console.error("Erro ao deleter sala:", erro)
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao deletar sala",
            erro: erro.message,
        });
    }
});


//sessão
app.get("/sessoes", async (req, res) => {
  try {
    const sessoes = await queryAsync("SELECT * FROM sessao");
    res.json({
      sucesso: true,
      dados: sessoes,
      total: sessoes.length,
    });
  } catch (erro) {
    console.error("Erro ao listar as sessões:", erro);
    res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao listar sessões",
      erro: erro.message,
    });
  }
});

app.get("/sessoes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "ID de sessão inválido",
      });
    }
    const sessao = await queryAsync("SELECT * FROM sessao WHERE id = ?", [id]);

    if (sessao.length === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: "Sessão não encontrado",
      });
>>>>>>> 234b1ebac7a349209b1f6c96b40e4f2f14f08218
    }

    res.json({
      sucesso: true,
<<<<<<< HEAD
      dados: ingresso [0],
    })

  } catch (erro) {
    console.error("Erro ao encontrar ingresso: ", erro)
    return res.status(500).json ({
      sucesso: false,
      mensagem: "Erro ao encontrar ingresso",
      erro: erro.message,
    })
  }
})

app.post ('/ingresso', async (req, res) => {
  try {
    const {sessao_id, numero_assento, tipo, valor_pago, status} = req.body

    if (!sessao_id || !numero_assento || !tipo || !valor_pago) {
      return res.status(400).json ({
        sucesso: false,
        mensagem: "ID da sessão, número do assento, tipo de ingresso e valor pago são obrigatórios",
      })
    }

    if(!sessao_id || isNaN(sessao_id)) {
      return res.status(400).json ({
        sucesso: false, 
        mensagem: "ID de ingresso inválido",
      })
    }
   }
})
=======
      dados: sessao[0],
    });
  } catch (erro) {
    console.error("Erro ao listar as sessões:", erro);
    res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao listar sessão",
      erro: erro.message,
    });
  }
});

app.post("/sessoes", async (req, res) => {
  try {
    const { id, filme_id, sala_id, data_hora, preco} =
      req.body;

    if (!titulo || !genero || !duracao) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "Título, gênero e duração são obrigatórios",
      });
    }

    if (typeof duracao !== "number" || duracao <= 0) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "Duração deve ser um número positivo",
      });
    }

    const novoFilme = {
      titulo: titulo.trim(),
      genero: genero.trim(),
      duracao: duracao,
      classificacao: classificacao || null,
      data_lancamento: data_lancamento || null,
    };

    const resultado = await queryAsync("INSERT INTO filme SET ?", [novoFilme]);

    res.status(201).json({
      sucesso: true,
      mensagem: "Filme criado com sucesso",
      id: resultado.insertId,
    });
  } catch (erro) {
    console.error("Erro ao listar filmes:", erro);
    res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao listar filmes",
      erro: erro.message,
    });
  }
});

app.put("/filmes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, genero, duracao, classificacao, data_lancamento } =
      req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "ID de filme inválido.",
      });
    }

    const filmeExiste = await queryAsync("SELECT * FROM filme WHERE id = ?", [
      id,
    ]);

    if (filmeExiste.length === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: "Filme não encontrado",
      });
    }

    const filmeAtualizado = {};

    if (titulo !== undefined) filmeAtualizado.titulo = titulo.trim();
    if (genero !== undefined) filmeAtualizado.genero = genero.trim();
    if (duracao !== undefined) {
      if (typeof duracao !== "number" || duracao <= 0)
        return res.status(400).json({
          sucesso: false,
          mensagem: "Duração deve ser um número positivo.",
        });
      filmeAtualizado.duracao = duracao;
    }
    if (classificacao !== undefined)
      filmeAtualizado.classificacao = classificacao.trim();
    if (data_lancamento !== undefined)
      filmeAtualizado.data_lancamento = data_lancamento;

    if (Object.keys(filmeAtualizado).length === 0) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "Nenhum campo para atualizar",
      });
    }

    await queryAsync("UPDATE filme SET ? WHERE id = ?", [filmeAtualizado, id]);
    res.json({
      sucesso: true,
      mensagem: "Filme atualizado!",
    });
  } catch (erro) {
    console.error("Erro ao atualizar filme", erro);
    res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao atualizar filme",
      erro: erro.message,
    });
  }
});

app.delete("/filmes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "ID de filme inválido.",
      });
    }

    const filmeExiste = await queryAsync("SELECT * FROM filme WHERE id = ?", [
      id,
    ]);

    if (filmeExiste.length === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: "Filme não encontrado",
      });
    }

    await queryAsync("DELETE FROM filme WHERE id = ?", [id]);
    res.json({
      sucesso: true,
      mensagem: "O Filme foi apagado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao Deletar filme", erro);
    res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao Deletar filme",
      erro: erro.message,
    });
  }
});



>>>>>>> 234b1ebac7a349209b1f6c96b40e4f2f14f08218
module.exports = app;