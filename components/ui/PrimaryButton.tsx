import { Pressable, StyleSheet, Text, View } from "react-native";

import Colors from "../../constants/colors";

const PrimaryButton = ({ children, onPressCallback }: { children: React.ReactNode, onPressCallback: () => void }) => {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        onPress={onPressCallback}
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.iosRipple]
            : styles.buttonInnerContainer
        }
        android_ripple={{ color: Colors.primary600 }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 6,
  },
  buttonOuterContainer: {
    borderRadius: 50,
    margin: 4,
    overflow: "hidden",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  iosRipple: {
    opacity: 0.75,
  },
});

export default PrimaryButton;
