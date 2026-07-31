import { View, StyleSheet, Text } from 'react-native';

export default function ExercicioView10() {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.text}>HEADER</Text>
      </View>

      <View style={styles.content}>

        <View style={styles.rowCards}>
          <View style={[styles.card, styles.card1]}>
            <Text style={styles.text}>1</Text>
          </View>

          <View style={[styles.card, styles.card2]}>
            <Text style={styles.text}>2</Text>
          </View>

          <View style={[styles.card, styles.card3]}>
            <Text style={styles.text}>3</Text>
          </View>
        </View>

        <View style={styles.rowPanels}>
          <View style={[styles.panel, styles.main]}>
            <Text style={styles.text}>Painel Principal</Text>
          </View>

          <View style={[styles.panel, styles.side]}>
            <Text style={styles.text}>Painel Lateral</Text>
          </View>
        </View>

      </View>

      <View style={styles.footer}>
        <Text style={styles.text}>FOOTER</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    height: 50,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    flex: 1,
    padding: 8,
    gap: 8,
  },

  rowCards: {
    flexDirection: 'row',
    gap: 8,
  },

  rowPanels: {
    flexDirection: 'row',
    gap: 8,
    flex: 1,
  },

  card: {
    flex: 1,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card1: {
    backgroundColor: 'red',
    borderRadius: 10
  },

  card2: {
    backgroundColor: 'blue',
    borderRadius: 10
  },

  card3: {
    backgroundColor: 'yellow',
    borderRadius: 10
  },

  panel: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  main: {
    flex: 2,
    backgroundColor: '#ffa5ef',
    borderRadius: 10
  },

  side: {
    flex: 1,
    backgroundColor: '#8a8a8a',
    borderRadius: 10
  },

  footer: {
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
