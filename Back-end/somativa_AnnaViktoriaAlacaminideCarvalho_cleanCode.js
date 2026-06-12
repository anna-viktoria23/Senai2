
// =============================================================================
// MÉTODO PARA ATUALIZAR PRODUTO NO BANCO
// =============================================================================


const validarExistencia = (resultado, res, tipo) => {
    if (resultado.length === 0) {
        res.status(404).json({
            sucesso: false,
            mensagem: `${tipo} não encontrado`
        })
        return false
    }
}

// validação de existencia e tipo
const validarDados = (preco, nome) => {
    if (!preco || !nome){
        return "Preço e nome são obrigatórios"
    }

    if (typeof preco != "number" || preco <= 0){
        return "O valor de preço é inválido, tente novamente"
    }
}


app.put('/produto/:id', async (req, res) => {
    try {
        const id = req.params.id
        const dadosParaAtualização = req.body
        const apuracaoDados = validarDados(req.body)

        //verifica a existencia no banco
        const produto = await queryAsync("SELECT * FROM produtos WHERE id = ?", [id])

        if (!validarExistencia(produto, res, "produtos")){
            return
        }

        // verifica se já houve algum dado enviado
        if (Object.keys(dadosParaAtualização).length === 0){
            return res.status(400).json({
                sucesso: false,
                mensagem: "Nenhum dado foi enviado"
            })
        }

        //verificar os tipos de dados e se os campos estão preenchidos corretamente
        if (apuracaoDados){
            return res.status(400).json({
                sucesso: false,
                mensagem: apuracaoDados
            })
        }

        
        await queryAsync("UPDATE produtos SET ? WHERE id = ?", [dadosParaAtualização, id])

        res.status(200).json ({
            sucesso: true,
            mensagem: "O produto foi atualizado com sucesso"
        })
    } catch (erro) {
        res.status(500).json ({
            sucesso: false,
            mensagem: "Erro ao atualizar produto",
            erro: erro.message
        })
    }
})
