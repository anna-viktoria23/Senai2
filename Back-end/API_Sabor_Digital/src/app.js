const express = require('express')
const app = express()
const routes = require('./routes')

app.use(express.json())

app.use('/', routes) //direcionando tudo para routes

module.exports = app

const queryAsync = (sql,values = []) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, values, (err, results) => {
            if(err) reject(err)
            else resolve(results)
        })
    })
}

// GET - Rota inicial de teste
app.get('/', (req,res) => {
    res.send("API SABOR DIGITAL")
})

//Listar todos os produtos (ordenados por ID decrescente).
app.get('/produtos', async (req,res) => {
    try{
        const produtos = await queryAsync('SELECT * FROM produto ORDER BY id DESC') //orderna por id decrescente

        res.json({
            sucesso: true,
            dados: produtos, 
            total: produtos.length
        })

    } catch (erro) {
        console.error('Erro ao listar produtos:', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao listar produtos',
            erro: erro.message
        })
    }
})

//Buscar um produto específico (validar se o ID é numérico).
app.get('/produtos/:id', async (req, res) => {
    try {
        const { id } = req.params
        const idNum = parseInt(id)

        if (!id || isNaN(idNum)) { //valida se o id é númerico
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID de produto inválido'
            })
        }

        const produto = await queryAsync(
            'SELECT * FROM produto WHERE id = ?',
            [idNum]
        )

        if (produto.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Produto não encontrado'
            })
        }

        res.json({
            sucesso: true,
            dados: produto[0]
        })

    } catch (erro) {
        console.error('Erro ao buscar produto:', erro)

        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao buscar produto',
            erro: erro.message
        })
    }
})


app.post('/produtos', async(req, res) => {
    try {
        const {id, nome, descricao, preco, disponivel} = req.body

        // validação dos campos obrigatórios
        if(!nome || !descricao || !preco || !disponivel){ 
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Nome, Descrição, Preço e Disponibilidade são obrigatórios.'
            })
        }

        // validação do preço
        if(typeof preco !== 'number' || preco <= 0){ 
            return res.status(400).json ({
                sucesso: false,
                mensagem: 'Preço deve ser um número positivo'
            })
        }

        const novoProduto = {
            nome: nome.trim(),
            descricao: descricao.trim(),
            preco: preco,
            disponivel: disponivel
        }

        const resultado = await queryAsync('INSERT INTO produto SET ?', [novoProduto])

        res.status(201).json({
            sucesso: true,
            mensagem: 'Produto criado com sucesso',
            id: resultado.insertId
        })

    } catch(erro){
        console.error('Erro ao listar produtos:', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao listar produtos',
            erro: erro.message
        })
    }
})


app.put('/produtos/:id', async (req,res) =>{
    try {
        const {id} = req.params
        const {nome, descricao, preco, disponivel} = req.body

        if(!id || isNaN(id)) {
            return res.status(400).json({
                sucesso: false, 
                mensagem: 'ID de produto inválido'
            })
        }

         // valida existência do produto
        const produtoExiste = await queryAsync('SELECT * FROM produto WHERE id = ?', [id]) 
        if(produtoExiste.length === 0){
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Produto não encontrado'
            })
        }

        const produtoAtualizado = {}
        // permite atualização parcial
        if(nome !== undefined) produtoAtualizado.nome = nome.trim()
        if(descricao !== undefined) produtoAtualizado.descricao = descricao.trim()
        if(preco !== undefined) {
            if(typeof preco !== 'number' || preco <= 0)
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'Preço deve ser um número positivo'
            })
            produtoAtualizado.preco = preco
        }
        if(disponivel !== undefined) produtoAtualizado.disponivel = disponivel

        if(Object.keys(produtoAtualizado).length === 0){
            return res.status(400).json ({
                sucesso: false,
                mensagem: 'Nenhum campo para atualizar'
            })
        }

        await queryAsync('UPDATE produto SET ? WHERE id = ?', [produtoAtualizado, id])
        res.json({
            sucesso: true,
            mensagem: 'Produto atualizado!'
        })

    } catch (erro) {
        console.error('Erro ao atualizar o produto', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao atualizar o produto', 
            erro: erro.message
        })
    }
})

// 5 deletar produto
app.delete('/produtos/:id',  async (req, res) => {
        try {
        const { id } = req.params

        if (!id || isNaN(id)) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "ID inválido"
            })
        }

        const existe = await queryAsync("SELECT * FROM produto WHERE id = ?", [id])
        if (existe.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: "Produto não encontrado"
            })
        }

        await queryAsync("DELETE FROM produto SET ? WHERE id = ?", [id])

        res.json({
            sucesso: true,
            mensagem: "Produto apagado com sucesso"
        })

     } catch (erro) {
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao deletar produto",
            erro: erro.message
        })
    }
})


module.exports = app