// 1. Importa os componentes estruturais do React Native
import { StyleSheet, Text, View, Button } from "react-native";

export default function DetalheScreen({ navigation, route }) {

  const { titulo, descricao } = route.params ?? {};

  return (
    <View style={styles.container}>
      
      <Text style={styles.titulo}>{titulo ?? "Pedido vazio"}</Text>  
      
      <Text style={styles.titulo}>{descricao ?? "tente novamente"}</Text>

      <Button title="Voltar" onPress={() => navigation.goBack()} />
      
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,                 // Expande o container para ocupar a tela inteira do celular
    justifyContent: "center", // Centraliza os textos e o botão verticalmente
    alignItems: "center",     // Centraliza os textos e o botão horizontalmente
    gap: 16,                 // Cria um espaçamento firme de 16px entre cada elemento
    padding: 24,             // Adiciona uma margem interna de segurança nas bordas
  },
  titulo: {
    fontSize: 22,            // Aplica um tamanho de fonte destacado (estilo título)
    fontWeight: "bold",      // Modifica o peso do texto para negrito
  },
});