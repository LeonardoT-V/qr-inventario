import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import LabelText from "@/components/LabelText";
import { Collapsible } from "@/components/Collapsible";
import { formatDate } from "@/utils";
import { Cambio } from "@/types";
import { useTheme } from "@react-navigation/native";

export default function ListCambios({ cambios }: { cambios: Cambio[] }) {
  const { colors } = useTheme();

  if (cambios.length === 0 || !cambios) {
    return (
      <SafeAreaView style={{ gap: 12, marginBottom: 24 }}>
        <Text style={[styles.subtitle, { color: colors.primary }]}>
          Actualizaciones
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
            No hay cambios recientes
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ gap: 12, marginBottom: 24 }}>
      <Text style={[styles.subtitle, { color: colors.primary }]}>
        Actualizaciones
      </Text>
      {cambios.map((cambio) => (
        <CambioComponent cambio={cambio} key={cambio.id} />
      ))}
    </SafeAreaView>
  );
}

function CambioComponent({ cambio }: { cambio: Cambio }) {
  const { colors } = useTheme();

  if (cambio.tipo === "disable") {
    return (
      <Collapsible
        title={`${cambio.tipo.toUpperCase()} - ${formatDate(cambio.createdAt)}`}
        key={cambio.id}
      >
        <LabelText
          size="sm"
          label="Realizado por"
          text={cambio.responsable.email}
        />
        <Text style={{ color: "red" }}>Ha deshabilitado el articulo</Text>
      </Collapsible>
    );
  }
  if (cambio.tipo === "active") {
    return (
      <Collapsible
        title={`${cambio.tipo.toUpperCase()} - ${formatDate(cambio.createdAt)}`}
        key={cambio.id}
      >
        <LabelText
          size="sm"
          label="Realizado por"
          text={cambio.responsable.email}
        />
        <Text style={{ color: colors.primary }}>Ha habilitado el articulo</Text>
      </Collapsible>
    );
  }

  return (
    <Collapsible
      title={`${cambio.tipo.toUpperCase()} - ${formatDate(cambio.createdAt)}`}
      key={cambio.id}
    >
      <LabelText
        size="sm"
        label="Realizado por"
        text={cambio.responsable.email}
      />
      <LabelText size="sm" label="Cambio realizado en" text={cambio.llave} />
      <LabelText size="sm" label="Valor anterior" text={cambio.prev_value} />
      <LabelText size="sm" label="Nuevo valor" text={cambio.new_value} />
    </Collapsible>
  );
}

const Hola = {
  disable: (cambio: Cambio) => (
    <View>
      <Text>{formatDate(cambio.createdAt)}</Text>
      <Text>{cambio.responsable.email}</Text>
      <Text>Ha deshabilitado el articulo</Text>
    </View>
  ),
};

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
