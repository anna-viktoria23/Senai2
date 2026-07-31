import { StyleSheet, Text, View } from "react-native";

export default function ExercicioView21() {
  return  <View style={styles.container}>
    {/* header */}
    <View style={{height: 60, backgroundColor: '#2c3e50', flexDirection:'row'}}>
             <Text style={styles.textStyle}>Header</Text>
    </View>

      {/* corpo*/}
    <View style={{flexDirection: 'row', flex: 1}}>

      {/* sidebar */}
       <View style={[styles.redBox, {backgroundColor: "#95a5a6", width: 80, flexDirection: 'column'}]}>
      <Text style={[styles.textStyle]}>Sidebar</Text>
      </View>

        {/* AreaPrincipal */}
      <View style={{flex: 1, flexDirection: 'column'}}>
        
        {/* sessão superiror */}
        <View style={{flexDirection: 'row', gap: 8, flex: 1, alignItems: 'center'}}>
          <View style={[styles.greenBox, {flex: 1}]}>
             <Text style={styles.textStyle}>Card A</Text>
          </View>
          <View style={[styles.blueBox, {flex: 1}]}>
             <Text style={styles.textStyle}>Card B</Text>
          </View>
        </View>

          {/* divisor */}
        <View style={[styles.greenBox, {height:8, backgroundColor: '#34495e' }]}></View>

        {/* seção inferior */}
        <View styles={{flexDirection: 'row', gap: 8}}>
          <View styles={[styles.blueBox, {backgroundColor: 'red', flex: 1, height: 100}]}>
             <Text style={styles.textStyle}>C</Text>
          </View>
          <View styles={[styles.blueBox, {backgroundColor: 'orange', flex: 2, height: 100}]}>
             <Text style={styles.textStyle}>Card D</Text>
          </View>
          <View styles={[styles.blueBox, {backgroundColor: 'purple', flex: 1, height: 100}]}>
             <Text style={styles.textStyle}>E</Text>
          </View>
        </View>
      
      </View>
    </View>

      {/* footer */}
    <View style={{height: 50, backgroundColor:'#2c3e50'}}>
      <Text style={styles.textStyle}>Footer</Text>
    </View>
  </View>
}

// desisto!


const styles = StyleSheet.create({
  container: {
    padding: 8,
    gap: 8,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    flex: 1
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
  },
  redBox: {
    height: 10,
    backgroundColor: "red",
    justifyContent: "center",
  },
  greenBox: {
    height: 10,
    backgroundColor: "green",
    justifyContent: "center",
  },
  blueBox: {
    height: 10,
    backgroundColor: "blue",
    justifyContent: "center",
  },
  orangeBox: {
    height: 10,
    backgroundColor: "orange",
    justifyContent: "center",
  },
});