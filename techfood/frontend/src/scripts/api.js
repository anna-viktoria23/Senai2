const BASE_URL = "http://localhost:3000" //centralizador

//busca dos produtos
async function buscarProdutos() { 
    const response = await fetch(`${BASE_URL}/produtos`)
    const dados = await response.json() //busca
    if(!response.ok) throw new Error(dados.erro || `Erro ${response.status}`)
    return dados.dados
}

async function criarPedido(cliente, itens){
    const response = await fetch(`${BASE_URL}/pedidos`, 
        {method: "POST",
        headers: {"Content-Type": "appication/json"},
        body: JSON.stringify({cliente, itens}),
})

    const dados = await response.json()
    if(!response.ok) throw new Error(dados.erro || `Erro ${response.status}`)
    return dados.dados
}

//buscar pedidos que foram inseridos no banco
async function buscarPedidos() {
    const response = await fetch(`${BASE_URL}/pedidos`)
    const dados = await response.json()
    
    if(!response.ok) throw new Error(dados.erro || `Erro ${response.status}`)

    return dados
}

//Deletar pedido no banco de dados
async function deletarPedido(id){
    const response = await fetch(`${BASE_URL}/pedidos/${id}`,
        {method: "DELETE",
})
    const dados = await response.json()
    if(!response.ok) throw new Error(dados.erro || `Erro ${response.status}`)
    return dados
}

//atualizar o status do pedido para cozinha
async function atualizarStatusPedido(id, novoStatus){
      const response = await fetch(`${BASE_URL}/pedidos/${id}/status`,
        {method: "Patch",
        headers: {"Content-Type": "appication/json"},
        body: JSON.stringify({status, novoStatus}),
    })
    const dados = await response.json()
    if(!response.ok) throw new Error(dados.erro || `Erro ${response.status}`)
    return dados

}