import { StyleSheet, Text, View } from "react-native";

export default function ExercicioView08() {
  return  <View style={styles.container}>
    <View style={{flexDirection: 'row', flex: 1}}> 
        
        <View style={[styles.redBox, {backgroundColor: "grey", width: 80}]}>
            <Text style={[styles.textStyle]}>Sidebar</Text>
        </View>

        <View style={{flexDirection: 'column', flex: 1, padding: 10, gap: 8}}>
            <View style={[styles.greenBox, {height: 100, flex: 1}]}>
            <Text style={[styles.textStyle]}>card 1</Text>
        </View> 
            
        <View style={[styles.orangeBox, {height: 100, flex: 1}]}>
            <Text style={[styles.textStyle]}>card 2</Text>
        </View>

        <View style={[styles.blueBox, {height: 100, flex: 1}]}>
            <Text style={[styles.textStyle]}>card 3</Text>
        </View>
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