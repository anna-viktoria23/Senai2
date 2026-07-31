import { StyleSheet, Text, View } from "react-native";

export default function ExercicioView11() {
  return  <View style={styles.container}>

    <View style={{height: 50, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center',}}>
        <Text style={[styles.textStyle]}>Header</Text>
    </View>

    <View style={{flex: 1, padding: 8, gap: 8}}> 
        
        <View style= {{flexDirection: 'row',gap: 8}}>
            
            <View style={[styles.redBox, {flex: 1, height: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', borderRadius: 10 }]}>1</View>
            
            <View style={[styles.redBox, {flex: 1, height: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue', borderRadius: 10 }]}>2</View>
            
            <View style={[styles.redBox, {flex: 1, height: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow',  borderRadius: 10 }]}>3</View>     
        </View>

        <View style={{flexDirection: 'row', gap: 8, flex: 1}}>
            <View style={[styles.blueBox, {justifyContent: 'center',alignItems: 'center', flex: 2, backgroundColor: '#ffa5ef', borderRadius: 10 }]}></View>

            <View style={[]}>
        </View>
    </View>

    <View style={{}}></View>


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