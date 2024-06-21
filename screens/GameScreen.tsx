import {
  Alert,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { GuessDirection } from "../constants/GuessDirection";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import Subtitle from "../components/ui/Subtitle";
import GuessLogItem from "../components/game/GuessLogItem";

const generateRandomNumber = (min: number, max: number, exclude: number) => {
  const random = Math.floor(Math.random() * (max - min)) + min;

  if (random === exclude) {
    return generateRandomNumber(min, max, exclude);
  } else {
    return random;
  }
};

let MIN_BOUNDARY = 1;
let MAX_BOUNDARY = 100;

const GameScreen = ({
  userNumber,
  gameOverCallback,
}: {
  userNumber: number;
  gameOverCallback: (guessRounds: number) => void;
}) => {
  const initialGuess = generateRandomNumber(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === userNumber) {
      MIN_BOUNDARY = 1;
      MAX_BOUNDARY = 100;
      gameOverCallback(guessRounds.length);
    }
  }, [currentGuess, userNumber, gameOverCallback]);

  const nextGuessHandler = (direction: GuessDirection) => {
    if (
      (direction === GuessDirection.LOWER && currentGuess < userNumber) ||
      (direction === GuessDirection.GREATER && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong D:<", [
        { text: "Sorry!", style: "cancel" },
      ]);

      return;
    }

    if (direction === GuessDirection.LOWER) {
      MAX_BOUNDARY = currentGuess;
    } else {
      MIN_BOUNDARY = currentGuess + 1;
    }

    const newGuess = generateRandomNumber(
      MIN_BOUNDARY,
      MAX_BOUNDARY,
      currentGuess
    );
    setCurrentGuess(newGuess);
    setGuessRounds((prev) => [newGuess, ...prev]);
  };

  const guessRoundsListLength = guessRounds.length;
  let content = (
    <>
      <NumberContainer>{String(currentGuess)}</NumberContainer>
      <Card>
        <Subtitle style={styles.subtitle}>Higher or lower?</Subtitle>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPressCallback={nextGuessHandler.bind(
                this,
                GuessDirection.LOWER
              )}
            >
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPressCallback={nextGuessHandler.bind(
                this,
                GuessDirection.GREATER
              )}
            >
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPressCallback={nextGuessHandler.bind(
                this,
                GuessDirection.LOWER
              )}
            >
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <NumberContainer>{String(currentGuess)}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPressCallback={nextGuessHandler.bind(
                this,
                GuessDirection.GREATER
              )}
            >
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              guess={itemData.item}
              roundNumber={guessRoundsListLength - itemData.index}
            />
          )}
          keyExtractor={(item) => item.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
  subtitle: {
    marginBottom: 12,
  },
  buttonContainerWide: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default GameScreen;
