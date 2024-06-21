import { StyleSheet, Text } from "react-native";
import Colors from "../../constants/colors";

const Subtitle = ({ children, style }: { children: string, style?: Record<string, unknown> }) => {
  return <Text style={[styles.subtitle, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  subtitle: {
    fontFamily: 'open-sans',
    color: Colors.accent500,
    fontSize: 24,
  },
});

export default Subtitle;
