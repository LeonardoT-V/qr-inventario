import { useTheme } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";

export default function LabelText({
  label,
  text,
  style,
  size = "base",
}: {
  label: string;
  text?: string;
  style?: any;
  size?: "sm" | "base";
}) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <Text
        style={[
          styles.label,
          size === "sm" ? { fontSize: 14 } : { fontSize: 14 },
        ]}
      >
        {label}
      </Text>
      <Text
        style={[
          styles.text,
          { color: colors.text },
          size === "sm" ? { fontSize: 20 } : { fontSize: 24 },
        ]}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    color: "white",
    width: "auto",
    margin: 0,
    justifyContent: "flex-start",
  },
  label: {
    color: "#808080",
  },
  text: {
    color: "white",
  },
});
