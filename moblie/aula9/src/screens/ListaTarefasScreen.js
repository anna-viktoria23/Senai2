import { useEffect, useState } from "react";
import { Alert, FlatList, KeyboardAvoidingView, Modal, Platform, StyleSheet, Text,TextInput, TouchableOpacity, View,} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TarefaItem from "../components/TarefaItem";

export default function ListaTarefasScreen() {
  const [textoInput, setTextoInput] = useState(""); // Guarda o texto digitado para criar uma nova tarefa
  const [tarefas, setTarefas] = useState([]); // Guarda todas as tarefas
  const [carregou, setCarregou] = useState(false); // Diz se os dados já foram carregados do AsyncStorage
  const [tarefaEditando, setTarefaEditando] = useState(null);  // Guarda a tarefa que está sendo editada
  const [textoEdicao, setTextoEdicao] = useState("");   // Guarda o novo texto da tarefa que está sendo editada

  useEffect(() => { // Executa quando a tela abre
    carregarTarefas();
  }, []);

  useEffect(() => { // Salva as tarefas sempre que elas forem alteradas
    if (carregou) { // Só salva depois que terminou de carregar
      salvarTarefas();
    }

  }, [tarefas, carregou]);
  async function carregarTarefas() {
    try {
      const tarefasSalvas = await AsyncStorage.getItem("tarefas"); // Busca as tarefas salvas

      if (tarefasSalvas) {
        const tarefasConvertidas = JSON.parse(tarefasSalvas);   // Transforma o texto salvo em array

        
        const tarefasCorrigidas = tarefasConvertidas.map((tarefa) => ({ // Corrige tarefas antigas que possam ter usado "titulo"
          ...tarefa,
          texto: tarefa.texto || tarefa.titulo || "",
        }));
        
        setTarefas(tarefasCorrigidas); // Coloca as tarefas na tela
      }
    } catch (erro) {
      console.log("Erro ao carregar tarefas:", erro);
    } finally {
      setCarregou(true);// carregou
    }
  }

  // SALVAR TAREFAS
  async function salvarTarefas() {
    try { // Transforma o array em texto
      const tarefasTexto = JSON.stringify(tarefas); // Salva no AsyncStorage
      await AsyncStorage.setItem("tarefas", tarefasTexto);
    } catch (erro) {
      console.log("Erro ao salvar tarefas:", erro);
    }
  }

  // ADICIONAR TAREFA
  function adicionarTarefa() {
    if (textoInput.trim() === "") { // Verifica se o usuário deixou o campo vazio
      return;
    }

    
    const novaTarefa = { // Cria uma nova tarefa

      id: Date.now().toString(),   // ID único  
      texto: textoInput.trim(), // Texto da tarefa
      concluida: false, // Começa como não concluída
    };

    setTarefas((tarefasAtuais) => [...tarefasAtuais, novaTarefa]);   // Adiciona a nova tarefa
    setTextoInput(""); // Limpa o campo
  }

  // CONCLUIR / DESCONCLUIR
  function alternarConcluida(id) {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.map((tarefa) =>
        tarefa.id === id
          ? {
              ...tarefa,
              concluida: !tarefa.concluida,
            }
          : tarefa,
      ),
    );
  }

  // EXCLUIR UMA TAREFA
  function excluirTarefa(id) {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.filter((tarefa) => tarefa.id !== id),
    );
  }

  // ABRIR A EDIÇÃO
  function editarTarefa(id) {
    const tarefa = tarefas.find((tarefa) => tarefa.id === id); // Procura a tarefa pelo ID

    if (!tarefa) {   // Se não encontrar, para a função
      return;
    }
    setTarefaEditando(tarefa); // Coloca a tarefa encontrada como tarefa em edição
    setTextoEdicao(tarefa.texto);  // Coloca o texto atual no campo de edição
  }

  // SALVAR A EDIÇÃO
  function salvarEdicao() {
    if (textoEdicao.trim() === "") { // Não permite salvar vazio
      return;
    }

   
    setTarefas((tarefasAtuais) =>  // Altera somente a tarefa que está sendo editada
      tarefasAtuais.map((tarefa) => 
        tarefa.id === tarefaEditando.id
          ? {
              ...tarefa,
              texto: textoEdicao.trim(),
            }
          : tarefa,
      ),
    );

   
    setTarefaEditando(null);  // Fecha o Modal
    setTextoEdicao("");     // Limpa o campo de edição
  }

  // CANCELAR EDIÇÃO
  function cancelarEdicao() {
    setTarefaEditando(null);     // Fecha o Modal
    setTextoEdicao("");     // Limpa o campo
  }

  // LIMPAR TODAS
  function limparTodas() {
    Alert.alert(
      "Limpar tarefas",
      "Tem certeza que deseja apagar todas as tarefas?",

      [
        {
          text: "Cancelar",
          style: "cancel",
        },

        {
          text: "Apagar",
          style: "destructive",

          onPress: () => {
            // Deixa a lista vazia
            setTarefas([]);
          },
        },
      ],
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* TÍTULO */}
      <Text style={styles.titulo}>Lista de Tarefas</Text>

      {/* FORMULÁRIO */}
      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma nova tarefa..."
          value={textoInput}
          onChangeText={setTextoInput}
          onSubmitEditing={adicionarTarefa}
          returnKeyType="done"
        />

        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={adicionarTarefa}
        >
          <Text style={styles.textoBotaoAdicionar}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      {/* BOTÃO LIMPAR */}
      {tarefas.length > 0 && (
        <TouchableOpacity style={styles.botaoLimpar} onPress={limparTodas}>
          <Text style={styles.textoBotaoLimpar}>Limpar todas as tarefas</Text>
        </TouchableOpacity>
      )}

      {/* LISTA */}
      <FlatList
        data={tarefas}
        keyExtractor={(tarefa) => tarefa.id}
        renderItem={({ item }) => (
          <TarefaItem
            tarefa={item}
            aoAlternarConcluida={() => alternarConcluida(item.id)}
            aoExcluir={() => excluirTarefa(item.id)}
            aoEditar={() => editarTarefa(item.id)}
          />
        )}
        // Aparece quando não existem tarefas
        ListEmptyComponent={
          <Text style={styles.listaVazia}>
            Nenhuma tarefa cadastrada ainda.
          </Text>
        }
        contentContainerStyle={styles.listaConteudo}
      />

      {/* MODAL DE EDIÇÃO */}
      <Modal
        visible={tarefaEditando !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={cancelarEdicao}
      >
        {/* Fundo escuro */}
        <View style={styles.fundoModal}>
          {/* Caixa do modal */}
          <View style={styles.modal}>
            <Text style={styles.tituloModal}>Editar tarefa</Text>

            {/* Campo para editar */}
            <TextInput
              style={styles.inputEdicao}
              value={textoEdicao}
              onChangeText={setTextoEdicao}
              placeholder="Digite a nova tarefa..."
              autoFocus={true}
            />

            {/* Botões */}
            <View style={styles.botoesModal}>
              <TouchableOpacity
                style={styles.botaoCancelar}
                onPress={cancelarEdicao}
              >
                <Text style={styles.textoBotaoModal}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botaoSalvar}
                onPress={salvarEdicao}
              >
                <Text style={styles.textoBotaoModal}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingTop: 60,
    paddingHorizontal: 16,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },

  formulario: {
    flexDirection: "row",
    marginBottom: 10,
  },

  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },

  botaoAdicionar: {
    backgroundColor: "#2e86de",
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
  },

  textoBotaoAdicionar: {
    color: "#fff",
    fontWeight: "bold",
  },

  botaoLimpar: {
    backgroundColor: "#e74c3c",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
  },

  textoBotaoLimpar: {
    color: "#fff",
    fontWeight: "bold",
  },

  listaConteudo: {
    paddingBottom: 20,
    flexGrow: 1,
  },

  listaVazia: {
    textAlign: "center",
    color: "#888",
    marginTop: 24,
  },

  // FUNDO DO MODAL
  fundoModal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  // CAIXA DO MODAL
  modal: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },

  tituloModal: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },

  inputEdicao: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },

  botoesModal: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  botaoCancelar: {
    backgroundColor: "#777",
    padding: 10,
    borderRadius: 6,
    marginRight: 8,
  },

  botaoSalvar: {
    backgroundColor: "#2e86de",
    padding: 10,
    borderRadius: 6,
  },

  textoBotaoModal: {
    color: "#fff",
    fontWeight: "bold",
  },
});