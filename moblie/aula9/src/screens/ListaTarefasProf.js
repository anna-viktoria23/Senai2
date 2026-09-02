import { useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import TarefaItem from "../components/TarefaItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Chave única usada para identificar o local de armazenamento no AsyncStorage
const CHAVE_STORAGE = "@rn-storage-lesson:tarefas";

export default function ListaTarefasScreen() {
  // Estado que guarda o array com todas as tarefas
  const [tarefas, setTarefas] = useState([]);

  // Estado que guarda o texto atual digitado no input
  const [textoInput, setTextoInput] = useState("");

  // Estado que indica se o app ainda está lendo os dados salvos no dispositivo
  const [carregando, setCarregando] = useState(true);

  // EFEITO 1: Executa apenas UMA vez no carregamento da tela para buscar os dados salvos
  useEffect(() => {
    async function carregarTarefas() {
      try {
        // Busca a string em formato JSON salva no AsyncStorage
        const tarefasSalvas = await AsyncStorage.getItem(CHAVE_STORAGE);
        
        // Se houver dados salvos, converte de JSON para array e atualiza o estado
        if (tarefasSalvas !== null) {
          setTarefas(JSON.parse(tarefasSalvas));
        }
      } catch (erro) {
        console.error("Erro ao carregar tarefas do storage:", erro);
      } finally {
        // Finaliza o estado de carregamento independente de ter ocorrido erro ou não
        setCarregando(false);
      }
    }

    carregarTarefas();
  }, []); // Array vazio faz o efeito rodar apenas ao montar o componente

  // EFEITO 2: Salva a lista no dispositivo sempre que 'tarefas' for alterado
  useEffect(() => {
    // Evita sobrescrever o storage com um array vazio enquanto o app ainda está carregando os dados
    if (carregando) return;

    // Converte o array de tarefas para JSON e salva localmente
    AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(tarefas)).catch(
      (erro) => {
        console.error("Erro ao salvar tarefas no storage: ", erro);
      },
    );
  }, [tarefas, carregando]); // Executa sempre que 'tarefas' ou 'carregando' mudarem

  // Função para adicionar uma nova tarefa à lista
  function adicionarTarefa() {
    // Remove espaços em branco do início e do fim do texto
    const texto = textoInput.trim();

    // Se o texto estiver vazio, não faz nada
    if (texto === "") return;

    // Cria o objeto da nova tarefa
    const novaTarefa = {
      id: Date.now().toString(), // Gera um ID único baseado na data/hora atual
      texto,
      concluida: false, // Tarefa inicia não concluída
    };

    // Adiciona a nova tarefa mantendo as anteriores
    setTarefas((tarefasAtuais) => [...tarefasAtuais, novaTarefa]);

    // Limpa o campo de texto do input
    setTextoInput("");
  }

  // Função para alternar o status de concluída (true/false) de uma tarefa
  function alternarConcluida(id) {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa,
      ),
    );
  }

  // Função para remover uma tarefa do array pelo seu ID
  function excluirTarefa(id) {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.filter((tarefa) => tarefa.id !== id),
    );
  }

  return (
    // Wrapper que ajusta a tela para o teclado não sobrepor os inputs no iOS
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.titulo}>Lista de Tarefas</Text>

      {/* Formulário de inserção da tarefa */}
      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma nova tarefa..."
          value={textoInput}
          onChangeText={setTextoInput} // Atualiza o estado ao digitar
          onSubmitEditing={adicionarTarefa} // Permite adicionar ao apertar "Enter" no teclado
          returnKeyType="done"
        />
        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={adicionarTarefa} // Executa a inclusão ao clicar no botão
        >
          <Text style={styles.textoBotaoAdicionar}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      {/* Renderização eficiente da lista de tarefas */}
      <FlatList
        data={tarefas} // Fonte dos dados
        keyExtractor={(tarefa) => tarefa.id} // Define a chave única de cada item
        renderItem={({ item }) => (
          // Renderiza o componente filho enviando os dados e funções via props
          <TarefaItem
            tarefa={item}
            aoAlternarConcluida={alternarConcluida}
            aoExcluir={excluirTarefa}
          />
        )}
        // Componente exibido quando a lista de tarefas estiver vazia
        ListEmptyComponent={
          <Text style={styles.listaVazia}>
            Nenhuma tarefa cadastrada ainda.
          </Text>
        }
        contentContainerStyle={styles.listaConteudo}
      />
    </KeyboardAvoidingView>
  );
}