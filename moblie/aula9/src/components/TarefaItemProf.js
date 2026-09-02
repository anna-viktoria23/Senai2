// Componente responsável por renderizar UM item da lista de tarefas.
// Recebe a tarefa e duas funções (callbacks) vindas do componente pai (a screen)
// para avisar quando o usuário quer concluir ou excluir essa tarefa.
export default function TarefaItem({ tarefa, aoAlternarConcluida, aoExcluir }) {
  return (
    // Container principal do item que alinha o texto e o botão de exclusão
    <View style={styles.item}>
      
      {/* Área clicável do texto da tarefa */}
      <TouchableOpacity
        style={styles.textoContainer}
        onPress={() => aoAlternarConcluida(tarefa.id)} // Dispara o callback passando o ID da tarefa
      >
        {/* Aplica o estilo padrão 'texto' e, se 'concluida' for true, aplica também 'textoConcluido' */}
        <Text style={[styles.texto, tarefa.concluida && styles.textoConcluido]}>
          {tarefa.texto} {/* Exibe o título/descrição da tarefa */}
        </Text>
      </TouchableOpacity>

      {/* Botão para remover a tarefa */}
      <TouchableOpacity
        style={styles.botaoExcluir}
        onPress={() => aoExcluir(tarefa.id)} // Dispara o callback de exclusão passando o ID da tarefa
      >
        <Text style={styles.textoBotaoExcluir}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
}