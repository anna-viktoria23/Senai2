import { StyleSheet, Text, View } from "react-native";

export default function ExercicioView04() {
  return  <View style={styles.container}>
    <View style={{flexDirection: 'row', gap:8, justifyContent:"center", flex: 1, alignItems: "center"}}>
      <View style={[styles.redBox, {width: 120, height: 120, backgroundColor:"orange"}]}>
        <Text style={styles.textStyle}>Centro</Text>
      </View>
    </View>
  </View>;
}

const styles = StyleSheet.create({
  container: {
    alignItems:"center",
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
    height: 80,
    width: 80,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  blueBox: {
    height: 80,
    width: 80,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
});