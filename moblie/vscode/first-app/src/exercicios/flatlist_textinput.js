import { useState } from "react";
import { View } from "react-native";

export default function ListaDeCompras(){
    const [produto, setProduto] = useState("")
    const [quantidade, setQuantidade] = useState("")
    const [produtos, setProdutos] = useState([])

    function handleAdicionar() {
        const novoProduto ={
            id: Data.now().toString(),
            nome: Produto,
            quantidade: quantidade,
        }

        setProdutos({...produtos, novoProduto})
        setProduto("")
        setQuantidade("")
    }
        function handleAdicionar(){
            if (tarefa.trim() === "") {
                Alert.alert("Atenção", "O nome da tarefa não pode ser vazio!");
                return;
            }
        }
    
    return (
        <View style={styles.container}>
            <TextInput
              style={styles.input}
              value={produtos}
              onChangeText={setProdutos}
              placeholder="Digite seu produto"
            />

            <TouchableOpacity style={styles.botao} onPress={handleAdicionar}>
              <Text style={styles.textoBotao}>Adicionar</Text>
            </TouchableOpacity>
        </View>
        
    )
}