
import { StyleSheet, Text, View } from "react-native";


export default function PerfilScreen() {
  return (
    <View style={styles.container}>
      
      <Text style={styles.titulo}>Perfil</Text>
      
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,                 // Faz a tela ocupar todo o espaço vertical e horizontal disponível
    justifyContent: "center", // Alinha o conteúdo (o texto) verticalmente no centro da tela
    alignItems: "center",     // Alinha o conteúdo (o texto) horizontalmente no centro da tela
    gap: 16,                 // Cria um espaçamento automático de 16 pixels entre os elementos internos (caso houvesse mais de um)
    padding: 24,             // Adiciona um espaçamento interno de segurança nas bordas da tela
  },
  titulo: {
    fontSize: 22,            // Define o tamanho da fonte do texto (22 pixels)
    fontWeight: "bold",      // Deixa o texto em negrito
  },
});