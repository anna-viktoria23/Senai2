
import { StyleSheet, Text, View, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Home</Text>
      
      {/* Componente de Botão do React Native */}
      <Button 
        title="Ir para tela de Detalhes" 
        onPress={() => 
          navigation.navigate("Detalhe", {
            titulo: "Pedido 1",
            descricao: "Lasanha"
          })
        } 
      />  {/*Fecha a button */}
      
    </View>
  );
}

// 3. Estilização da interface (Flexbox centralizado)
const styles = StyleSheet.create({
  container: {
    flex: 1,                 // Ocupa todo o espaço visível da tela
    justifyContent: "center", // Centraliza os elementos verticalmente
    alignItems: "center",     // Centraliza os elementos horizontalmente
    gap: 16,                 // Cria um espaçamento de 16 pixels entre o Texto e o Botão
    padding: 24,             // Margem interna de segurança nas bordas da tela
  },
  titulo: {
    fontSize: 22,            // Tamanho da fonte do título
    fontWeight: "bold",      // Deixa o texto em negrito
  },
});