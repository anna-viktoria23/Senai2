const validarExistencia = (resultado, res, tipo) => {
    if (resultado.length === 0) {
        res.status(404).json({
            sucesso: false,
            mensagem: `${tipo} não encontrado`
        })
        return false
    }
}

//Exercício 1
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await queryAsync("SELECT * FROM usuarios")

        res.json({
            sucesso: true,
            total: usuarios.length,
            dados: usuarios
        })
    } catch (erro) {
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao buscar usuários",
            erro: erro.message
        })
    }
})

app.get('/usuarios/:id', async (req, res) => {
    try {
        const id = req.params.id

        if (!id || isNaN(id)) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "ID inválido"
            })
        }

        const usuarios = await queryAsync(
            "SELECT * FROM usuarios WHERE id = ?", 
            [id]
        )

        if (usuarios.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: "Usuário não encontrado"
            })
        }

        res.json({
            sucesso: true,
            dados: usuarios[0]
        })
    } catch (erro) {
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao buscar usuário",
            erro: erro.message
        })
    }
})


//Exercício 2

const validandoDados = (cliente, valor) => {
    if (!cliente || !valor) {
        return "Cliente e valor são obrigatórios"
    }

    if (typeof valor != "number" || valor <= 0) {
        return "Valor inválido"
    }

    return null
}

app.post('/pedidos', async (req, res) => {

    try {
        const erro = validandoDados(req.body)

        if(erro) {
            return res.status(400).json ({
                sucesso: false,
                mensagem: erro
            })
        }

        await queryAsync("INSERT INTO pedido SET ?", (req,body))

        res.status(201).json({
            sucesso: true,
            mensagem: "Pedido cadastrado"

        })
        
    } catch (error) {
         res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao cadastrar pedido",
        })
    }
})


//Exercício 3
app.put('/salas/:id', async (req, res) => {
    try {
        const id = req.params.id
        const dadosAtualizacao = req.body

        const sala = await queryAsync("SELECT * FROM sala WHERE id = ?", [id])

        if(!validarExistencia(sala, res, "sala")){
            return 
        }

        if (Object.keys(dados).length === 0){  //se não mandou nada, não tem nenhuma chave. se for mandado, não entra no if
            return res.status(400).json({
                sucesso: false,
                mensagem: "Nenhum dado enviado"
            })
        }

        await queryAsync("UPDATE sala SET ? WHERE id = ?", [dados, id])

        res.status(200).json ({
            sucesso: true,
            mensagem: "Sala atualizada"
        })
    } catch (erro) {
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao atualizar sala",
            erro: erro.message
        })
    }
})


//Exercicio 4
app.delete('/salas/:id', async (req, res) => {
   try {

    const {id} = req.params.id

    const sala = await queryAsync(
        "SELECT * FROM sala WHERE id = ?", 
        [id]
    )

    if (validarExistencia(sala, res, "sala")){
        return
    }

    await queryAsync("DELETE FROM sala WHERE id = ?", [id])

    res.status(200).json({
        sucesso: true,
        mensagem: "Sala removida com sucesso"
        })
   } catch (error) {
        res.status(200).json({
            sucesso: false,
            mensagem: 'Erro ao remover sala'
        })
   }
})