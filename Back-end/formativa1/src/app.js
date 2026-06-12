//Anna Viktoria

const express = require('express')
const pool = require('./config/database')

const app = express();
app.use(express.json())

const queryAsync = (sql, values = []) => {
    return new Promise ((resolve, reject) => {
        pool.query (sql, values, (err, results) => {
            if (err) reject (err);
            else resolve(results)
        });
    });
};

app.get("/", (req, res) => {
    res.send("API DO SABOR DIGITAL!!")
})

app.get("/produtos", async (req, res) => {
    try {
        const produtos = await queryAsync ("SELECT * FROM  produto")
        res.json({
            sucesso: true,
            dados: produtos,
            total: produtos.length,
        });
    } catch (erro) {
        console.erro("Erro ao listar os produtos: ", erro)
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao listar os produtos",
            erro: erro.message,
        });
    }
});

app.get("/produtos/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "Id de produto é invalido"
            })
        } 

        const produto = await queryAsync("SELECT * FROM produto WHERE id = ?", [id])

        if (produto.length === 0) {
            return res.status(404).json ({
                sucesso: false,
                mensagem: "Produto não encontrado"
            })
        }

        res.json({
            sucesso: true,
            dados: produto[0],
        }); 
    } catch (erro) {
        console.error("Erro ao listar produtos: ", erro)
        res.status(500).json ({
            sucesso: false,
            mensagem: "Erro so listar produtos",
            erro: erro.message
        });
    }
})

app.post("/produtos", async (req, res) => {
    try {
        const {nome, descricao, preco, disponivel } = req.body;

        if (!nome || !descricao || !preco || disponivel == undefined) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "Os campos são orbigatórios",
                nome: disponivel
            })
        }

        if (typeof preco !== "number" || preco <= 0) {
            return res.status(400).json({
                sucessso: false,
                mensgaem: "O preço tem que ser um número positivo"
            })
        }

         if (typeof disponivel !== "boolean") {
            return res.status(400).json({
                sucesso: false,
                mensagem: "tem que ter um status",
            });
        }

        const novoProduto = {
            nome: nome.trim(),
            descricao: descricao.trim(),
            preco: preco,
            disponivel: disponivel,
        };

        const resultado = await queryAsync("INSERT INTO produto SET ?", [novoProduto]);

        res.status(201).json({
            sucesso: true,
            mensagem: "Produto cadastrado com sucesso!!",
            id: resultado.insertId,
        })
    } catch (erro) {
        console.error("Erro ao listar produtos: ", erro)
        res.status(500).json({
            sucesso: false,
            mensgaem: "Erro os listar produtos",
            erro: erro.message
        })
    }
});


app.put("/produtos/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const {nome, descricao, preco, disponivel } = req.body;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "Id de produto é invalido",
            })
        }

        const produtoExiste = await queryAsync("SELECT * FROM produto WHERE id = ?", [id]);

        if (produtoExiste.length === 0 ){
            return res.status(404).json({
                sucesso: false,
                mensagem: "Produto não encontrado"
            })
        }

        const produtoAtualizado = {};

        if (nome !== undefined) produtoAtualizado.nome = nome.trim();
        if (descricao !== undefined) produtoAtualizado.descricao = descricao.trim();
        if (preco !== undefined) {
            if (typeof preco !== "number" || preco <= 0)
                return res.status(400).json({
                    sucesso: false,
                    mensagem: "Preco tem que ser um número positivo"
                });
        } produtoAtualizado.preco = preco;
        if (disponivel !== undefined) {
            if (typeof disponivel !== "boolean") {
            return res.status(400).json({
                sucesso: false,
                mensagem: "tem que ter um status",
            });
        }
    }

        if(Object.keys(produtoAtualizado).length === 0) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "Nenhum campo para atualizar"
            });
        }

        await queryAsync("UPDATE produto SET ? WHERE id = ?", [produtoAtualizado, id])
        res.json({
            sucesso: true,
            mensagem: "Produto atualizado com sucesso"
        })
    } catch (erro) {
        console.error("Erro ao atualizar produtos: ", erro)
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao atualizar produto",
            erro: erro.message
        })
    }
});

app.delete("/produtos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        if (!id || isNaN(id)) {
            return res.status(400).json({
                sucesso:false,
                mensagem: "id de produto é inválido"
            });
        };

        const produtoExistente = await queryAsync("SELECT * FROM produto WHERE id = ?", [id]);

        if (produtoExistente.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: "Produto não encontrado"
            })
        };

        await queryAsync("DELETE FROM produto WHERE id = ?", [id]);
        res.json({
            sucesso: true,
            mensagem: "O produto foi apagado"
        });
    } catch (erro) {
        console.error("Erro ao deletar a produto: ", erro)
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao deletar produto",
            erro: erro.message,
        })
    };
})

module.exports = app