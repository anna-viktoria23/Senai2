const ProdutoService = require('../services/produtoService')

class ProdutoController{ //resposnavel por gerenciar qual server chama e quem é que vai responder
    async Listar(req, res){
        try {
            const resultado = await ProdutoService.listarProdutos()
            res.json(resultado)
        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro
            })
        }
    }

    async BuscarporId (req, res){
        try {
            const resultado = await ProdutoService.buscarProdutoPorId(req.params.id) //vai ter que acessar alguem de produto service, e vai ser o BuscarProdutoPorId
            res.json(resultado)
        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro
            })
        }
    }

    async cadastrar (req, res){
        try {
            const resultado = await ProdutoService.cadastrarProduto(req.body) //no body envia as informações
            res.status(201).json(resultado) //codigo de criado
        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro
            })
        }
    }

    async atualizar (req, res){
        try {
            const resultado = await ProdutoService.atualizarProduto(req.params.id, req.body) //no corpo atualiza
            res.status(200).json(resultado)
        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro
            })
        }
    }

    async deletar (req, res){
        try {
            const resultado = await ProdutoService.deletarProduto(req.params.id)
            res.status(500).json(resultado)
        } catch (Erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro
            })   
        }
    }
}

module.exports = new ProdutoController()