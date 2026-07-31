// Desafio - Componente de Botão
import {TouchableOpacity, Text, View, StyleSheet} from "react-native";

export default function Botao() {
  return (
    <View style={styles.card}>
      <Botao titulo="Entrar" />
      <Botao titulo="Sair" />
      <Botao titulo="Cadastrar" />
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botao: {
    backgroundColor: '#000000',
    padding: 12,
    borderRadius: 8,
    marginVertical: 5,
    width: 150,
    alignItems: 'center',
  },
  texto: {
    color: '#ff8308',
    fontSize: 16,
    fontWeight: 'bold',
  },
});