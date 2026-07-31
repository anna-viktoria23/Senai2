//Exercício 1 - Complete o Componente
import { Text, View, StyleSheet} from "react-native";

export function CardProduto (props) {
    return(

        <View style={styles.card}>
            <Text> Produto: {props.produto}</Text>
            <Text> Preço: R$ {props.preco}</Text>
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

  produto: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },

  preco: {
    fontSize: 14,
    color: "#6b7280",
  },

});