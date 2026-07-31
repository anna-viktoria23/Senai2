import { StyleSheet, Text, View } from "react-native";

export default function ExercicioView07() {
  return  <View style={styles.container}>
    
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
  orangeBox: {
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
});