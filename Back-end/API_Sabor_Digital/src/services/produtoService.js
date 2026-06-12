//pega da controller - cuida das regras de negocio

const ProdutoRepository = require('../repositories/produtoRepository')

class ProdutoService {
    async listarProdutos(){ //não precisa de try catch
        const listaProdutos = await ProdutoRepository.listarTodosProdutos()
        return {
            sucesso: true,
            dados: listaProdutos,
            //total: listaProdutos.length
        }
    }

    async buscarProdutoPorId(id){
        if (!id || isNaN(id)){
            throw { 
                status: 400,
                mensagem: "ID inválido"
            }
        } //muda o estado para trazer as validações de erro - throw traz uma excessão, serve para retornar as excessões e retorna como status de erro

        const produto = await ProdutoRepository.buscarPorId(id)

        if (!produto){ //valida a existencia
            throw{ 
                status: 404,
                mensagem: "Produto não encontrado"
            }
        }
        return{
            sucesso: true,
            dados: produto
        }
    }

    async cadastrarProduto(dados) {
        const {nome, descricao, preco, categoria, disponivel} = dados

        if (!nome || !decricao || preco === undefined){
            throw { 
                status: 400,
                mensagem: "Nome, descrição ou preço são obrigatórios"
            }
        }

        if ( typeof preco !== "number" || preco <= 0){
            throw {
                status: 400,
                mensagem: "Preço deve ser um número positivo"
            }
        }

        const novoProduto = {
            nome: nome.trim(),
            descricao: descricao.trim(),
            preco,
            categoria: categoria || null,
            disponivel: disponivel ?? true //outra forma de validar se quer disponivel ou outra informação
        }

        //cadastrando o produto
        const id = await ProdutoRepository.cadastrarNovoProduto(novoProduto)

        return {
            sucesso: true,
            mensagem: "produto cadastrado com sucesso", id: id
        }
    }

    async atualizarProduto(id, dados){
        //valida id
        if (!id || isNaN(id)){
            throw {
                status: 400,
                mensagem: 'Id inválido'
            }
        }

        const produto = await ProdutoRepository.buscarPorId(id)

        //valida produto
        if (!produto){
            throw {
                status: 404,
                mensagem: "Produto não encotrado"
            }
        }

        const produtoAtualizado = {} //muda os dados
        const {nome, descricao, preco, categoria, disponivel} = dados

        //como o put atualiza todo o objeto,  ou parte dele, ele está verificando se a informação foi eviada ou não. Caso não tenha sido enviada, ele irá manter o anterior, caso contrario, irá atualizar os dados modificados. Por isto, cada um dos itens tem um If, para fazer essa verificação em cada elemento
        if (nome !== undefined) produtoAtualizado.nome = nome.trim() 
        if (descricao !== undefined) produtoAtualizado.descricao.trim()
        if (preco !== undefined) {
            if (typeof preco !== 'number' || preco <= 0){
                throw {
                    status: 400,
                    mensagem: 'Preço deve ser um numero maior que 0'
                }
            }
            produtoAtualizado.preco = preco
        }
        if (categoria !== undefined) produtoAtualizado.categoria = categoria
        if (disponivel !== undefined) produtoAtualizado.disponivel = disponivel

        //verificando se tem algo para atualização
        if(Object.keys(produtoAtualizado).length === 0){
            throw{
                status: 400,
                mensagem: "Nada para atualizar"
            }
        }

        //atualizando o banco
        await ProdutoRepository.atualizarProdutoPorId(id, produtoAtualizado)

        return{
            sucesso: true,
            mensagem: 'Produto atualizaso com sucesso'
        }
    }

    async deletarProduto(id){
        //valida id
        if (!id || isNaN(id)){
            throw {
                status: 400,
                mensagem: 'Id inválido'
            }
        }

        const produto = await ProdutoRepository.buscarPorId(id)

        if (!produto){
            throw {
                status: 404,
                mensagem: "Produto não encontrado"
            }
        }

        await ProdutoRepository.deletarProdutoPorId(id)

        return{
            sucesso: true,
            mensagem: "Produto deletado com sucesso!!"
        }
    }
}

module.exports = new ProdutoService()