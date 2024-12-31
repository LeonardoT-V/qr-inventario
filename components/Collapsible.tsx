import { PropsWithChildren, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export function Collapsible({
  title,
  children,
}: PropsWithChildren<{
  title: string;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? "light";

  return (
    <ThemedView
      style={{
        borderRadius: 4,
      }}
    >
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <ThemedText type="subtitle">{title}</ThemedText>
        <Ionicons
          name="chevron-forward"
          style={{
            transform: [{ rotate: isOpen ? "90deg" : "0deg" }],
            color: theme === "light" ? Colors.light.icon : Colors.dark.icon,
            fontSize: 26,
            opacity: 0.6,
          }}
        />
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 2,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
    gap: 12,
    marginBottom: 6,
  },
});
