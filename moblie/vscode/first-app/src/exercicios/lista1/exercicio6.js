import { StyleSheet, Text, View } from "react-native";

export default function ExercicioView06() {
  return  <View style={styles.container}>
    <View style={{flexDirection: 'column', flex: 1}}>
        
        <View style={[styles.greenBox, {height: 80}]}>
            <Text style={[styles.textStyle]}>Header</Text>
        </View> 
        
        <View style={[styles.redBox, {flex: 1, backgroundColor: "grey"}]}>
            <Text style={[styles.textStyle]}>Main Content</Text>
        </View>
        
        <View style={[styles.blueBox, {height: 80}]}>
            <Text style={[styles.textStyle]}>Footer</Text>
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