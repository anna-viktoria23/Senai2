// Exercício 4 - Perfil do Aluno
import { Text, View, StyleSheet} from "react-native";

export default function PerfilAluno({nome, turma, matricula}) {
  return (
    <View style={styles.card}>
      <Text style={styles.nome}>Nome: {nome}</Text> 
      <Text style={styles.turma}>Turma: {turma}</Text>
      <Text style={styles.matricula}>Matricula: {matricula}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  nome: {
    fontSize: 14,
    color: "#6b7280",
  },

  turma: {
    fontSize: 14,
    color: "#6b7280",
  },

  matricula: {
    fontSize: 14,
    color: "#6b7280",
  },
})