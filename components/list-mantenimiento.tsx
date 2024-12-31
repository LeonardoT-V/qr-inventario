import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import LabelText from "@/components/LabelText";
import { Collapsible } from "@/components/Collapsible";
import { formatDate } from "@/utils";
import { Mantenimiento } from "@/types";
import { useTheme } from "@react-navigation/native";

export default function ListMantenimiento({
  mantenimientos,
}: {
  mantenimientos: Mantenimiento[];
}) {
  const { colors } = useTheme();

  if (mantenimientos.length === 0 || !mantenimientos) {
    return (
      <SafeAreaView style={{ gap: 12, marginBottom: 24 }}>
        <Text style={[styles.subtitle, { color: colors.primary }]}>
          Mantenimientos
        </Text>
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: 8,
            paddingVertical: 24,
            paddingHorizontal: 8,
          }}
        >
          <Text
            style={{
              fontSize: 28,
              color: "#808080",
              textAlign: "center",
            }}
          >
            No hay mantenimientos registrados
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ gap: 12, marginBottom: 24 }}>
      <Text style={[styles.subtitle, { color: colors.primary }]}>
        Mantenimientos
      </Text>
      {mantenimientos.map((mantenimiento) => (
        <Collapsible title={mantenimiento.detalle} key={mantenimiento.id}>
          <LabelText size="sm" label="Tipo" text={mantenimiento?.tipo} />
          <LabelText
            size="sm"
            label="Comentario"
            text={mantenimiento?.comentario}
          />
          <LabelText
            size="sm"
            label="Encargado"
            text={mantenimiento?.encargado.email}
          />
          <LabelText
            size="sm"
            label="Fecha del mantenimiento"
            text={formatDate(mantenimiento?.createdAt)}
          />
        </Collapsible>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 36,
  },
  subtitle: {
    color: "white",
    fontSize: 28,
    textAlign: "right",
  },
});
