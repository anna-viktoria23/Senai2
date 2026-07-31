import { StyleSheet, Text, View } from "react-native";

export default function ExercicioView09() {
  return  <View style={styles.container}>
    
    <View style={[styles.blueBox,{ flexDirection: 'column', alignItems: "center", justifyContent: 'space-evenly', borderRadius: 10, width: 150, height: 300, backgroundColor: 'black'}]}>

        <View style={[styles.redBox, {width: 80, height: 80, borderRadius: 40}]}></View>

        <View style={[styles.orangeBox, {width: 80, height: 80, borderRadius: 40, backgroundColor: "yellow"}]}></View>

        <View style={[styles.greenBox, {width: 80, height: 80, borderRadius: 40}]}></View>

    </View>


    </View>;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: "center",
    flex: 1,
    gap: 18,
  },
  textStyle: {
    color: "black",
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