import { StyleSheet, Text, View } from "react-native";

export default function ExercicioView05() {
  return  <View style={styles.container}>
    <View style={{flexDirection: 'row', gap:8, flex: 1}}>
        <View style={[styles.blueBox, {flex: 1}]}>
            <Text style={[styles.textStyle]}>Coluna 1</Text>
        </View>
        <View style={[styles.greenBox, {flex: 1}]}>
            <Text style={[styles.textStyle]}>Coluna 2</Text>
        </View>
    </View>
  </View>;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    gap: 18,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
  redBox: {
    height: 80,
    width: 80,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  greenBox: {
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  blueBox: {
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
});