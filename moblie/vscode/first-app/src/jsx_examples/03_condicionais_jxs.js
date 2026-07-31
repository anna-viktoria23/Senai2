// ============================================
// Arquivo Base usado- Scaffold
// ============================================

import { View, Text, StyleSheet } from "react-native";

 Exemplo03() {
  const logado = false;
  const tenhoNotificacoes = true;
  
    return (
    <View style={styles.container}>
      
      <View style={styles.exemplo}>
        <Text style={styles.titulo}>Exemplo 3- Condicionais</Text>
        <Text style={styles.subtitulo}>Ternário</Text>
        <Text>Status: {logado ? "logado" : "Deslogado"} </Text>
      </View>

      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>OPERADOR &&</Text>
        <Text>Notificações:</Text>
        {tenhoNotificacoes && <Text>Você tem novas notifocações</Text>}
        {!tenhoNotificacoes && <Text>Você não tem nehuma notificação</Text>}
      </View>
      
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4285f4",
    marginBottom: 8,
  },
  exemplo: {
    width: "80%",
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
});