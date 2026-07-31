import { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function ContadorExample() {
    const [contador, setContador] = useState(0);
    return (
        <View style={styles.container}>
            <Text>(contador)</Text>
            <TouchableOpacity onPress={() => setContador(contador + 1)} style={styles.button}> 
                {/* o set vem de alterar o estado */}
                <Text style={styles.text}> Clique para acrescentar o valor </Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    button: {
        backgroundColor: "#4285f4",
        padding: 12,
        borderRadius: 8,
        marginTop: 16,
    },

    text: {
        color: "#fff",
    },
});
