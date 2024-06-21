import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/colors";

const GuessLogItem = ({
  roundNumber,
  guess,
}: {
  roundNumber: number;
  guess: number;
}) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.itemText}>#{String(roundNumber)}</Text>
      <Text style={styles.itemText}>Opponent's Guess: {String(guess)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    borderColor: Colors.primary800,
    borderWidth: 1,
    borderRadius: 40,
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.accent500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    elevation: 8,
    shadowColor: 'black',
    textShadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.25,
    shadowRadius: 3
  },
  itemText: {
    fontFamily: 'open-sans'
  }
})

export default GuessLogItem;
