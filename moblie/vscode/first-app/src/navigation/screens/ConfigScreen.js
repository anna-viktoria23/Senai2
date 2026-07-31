// 1. Importa os componentes nativos do React Native necessários para construir a tela
import { StyleSheet, Text, View } from "react-native";

// 2. Define e exporta o componente funcional da tela de Configurações
export default function ConfigScreen() {
  return (
    /* A 'View' principal funciona como a "página" ou caixa que segura todo o conteúdo */
    <View style={styles.container}>
      
      {/* O 'Text' exibe a string "Configuracoes" com a estilização de título */}
      <Text style={styles.titulo}>Configuracoes</Text>
      
    </View>
  );
}

// 3. Criação da folha de estilos (StyleSheet) para otimização de performance nativa
const styles = StyleSheet.create({
  container: {
    flex: 1,                 // Faz o container ocupar 100% da largura e altura disponíveis da tela
    justifyContent: "center", // Alinha o conteúdo verticalmente no centro
    alignItems: "center",     // Alinha o conteúdo horizontalmente no centro
    gap: 16,                 // Aplica um espaçamento de 16px caso novos elementos sejam adicionados abaixo
    padding: 24,             // Adiciona uma margem interna de segurança para o conteúdo não colar nas bordas físicas do celular
  },
  titulo: {
    fontSize: 22,            // Define o tamanho da letra como 22 pixels
    fontWeight: "bold",      // Deixa o texto em negrito (destacado)
  },
});




















// // ============================================
// // TELA: ConfigScreen
// // ============================================

// import { StyleSheet, Text, View } from "react-native";

// export default function ConfigScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.titulo}>Configuracoes</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 16,
//     padding: 24,
//   },
//   titulo: {
//     fontSize: 22,
//     fontWeight: "bold",
//   },
// });