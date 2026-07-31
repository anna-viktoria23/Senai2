import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

export default function Telamoeda() {
    const [moedas, setMoedas] = useState(0);

    useEffect(() => {
        console.log("Clicou");
        if (moedas === 5) { //componente de alerta
            Alert.alert("Sucesso!", "Você desbloqueou o baú")
        }
    }, [moedas]); //estrutura padrão.

    return (
        <View style={styles.container}>
            <Text style={styles.Text}>Moedas coletadas: {moedas}</Text>
            <Button title="Pegar Moedas 🪙" onPress={() => setMoedas(moedas + 1)}/>
            <Button title="Resetar Moedas" onPress={() => setMoedas(0)}/>
        </View>
    )
}

const styles = StyleSheet.create({
container: { flex: 1, justifyContent: "center", alignItems: "center" },
texto: { fontSize: 24, marginBottom: 20 },
});