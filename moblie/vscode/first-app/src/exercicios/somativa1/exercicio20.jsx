import { StyleSheet, Text, View } from "react-native";

export default function ExercicioView20() {
  return  <View style={styles.container}>
        
        <View style={[styles.redBox, {height:80, backgroundColor: '#e74c3c', flexDirection: 'row', alignItems: 'center'}]}>
            <Text style={styles.textStyle}>Promoção</Text>
        </View>
        
        <View style={{flexDirection: 'row', gap: 8, alignItems: 'center', flexDirection: 'row', alignItems: 'center'}}>
            <View style={[styles.greenBox, {backgroundColor: '#2ecc71', height:150, flex: 1}]}>
                <Text style={styles.textStyle}>Card A</Text>
            </View>
            <View style={[styles.blueBox, {backgroundColor:'#3498db', flex:1, height:150}]}>
                <Text style={styles.textStyle}>Card B</Text>
            </View>
            <View style={[styles.orangeBox, {backgroundColor:'#f39c12', flex:2, height:150}]}>
                <Text style={styles.textStyle}>Card B</Text>
            </View>
        </View>;

        <View style={[styles.redBox, {backgroundColor:'#2c3e50', flex:1, alignItems:'center', flexDirection: 'column'}]}>
            <Text style={styles.textStyle}>Destaque</Text>
        </View>

        <View style={{height: 100, flexDirection: 'row', gap: 8, alignItems: 'center'}}>
            <View style={[styles.redBox, {backgroundColor:'#9b59b6', height: 100, flex: 1, alignItems: 'center'}]}>
                <Text style={styles.textStyle}>Cat 1</Text>
            </View>
            <View style={[styles.redBox, {backgroundColor:'#1abc9c', height: 100, flex: 1, alignItems: 'center'}]}>
                <Text style={styles.textStyle}>Cat 2</Text>
            </View>
            <View style={[styles.redBox, {backgroundColor:'#e67e22', height: 100, flex: 1, alignItems: 'center'}]}>
                <Text style={styles.textStyle}>Cat 3</Text>
            </View>
        </View>

    </View>
}


const styles = StyleSheet.create({
  container: {
    padding: 8,
    gap: 8,
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    flexDirection: 'column',
    flex: 1,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
  },
  redBox: {
    backgroundColor: "red",
    justifyContent: "center",
  },
  greenBox: {
    backgroundColor: "green",
    justifyContent: "center",
  },
  blueBox: {
    backgroundColor: "blue",
    justifyContent: "center",
  },
  orangeBox: {
    backgroundColor: "orange",
    justifyContent: "center",
  },
});