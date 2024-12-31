import {
  View,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import LabelText from "@/components/LabelText";
import { Data, DataResponse } from "@/types";
import { formatDate } from "@/utils";
import ListMantenimiento from "@/components/list-mantenimiento";
import ListCambios from "@/components/list-cambios";

export default function ArticleId() {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [article, setArticle] = useState<Data | null>(null);
  const fetchArticle = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/api/articulos/${id}?populate[mantenimientos][populate][0]=encargado&populate[registrado]=registrado&populate[carrera]=carrera&populate[cambios][populate][0]=responsable&populate[mantenimientos][sort][0]=createdAt%3Adesc&populate[cambios][sort][0]=createdAt%3Adesc&populate[image]=image`
      );
      const { data } = (await res.json()) as DataResponse;
      setArticle(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            height: "100%",
            justifyContent: "center",
            gap: 32,
          }}
        >
          <ActivityIndicator size={"large"} />
          <Text
            style={[
              styles.title,
              {
                textAlign: "center",
                color: colors.text,
                fontWeight: "bold",
                fontSize: 24,
              },
            ]}
          >
            Cargando
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!article) {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            height: "100%",
            justifyContent: "center",
            gap: 32,
          }}
        >
          <Text
            style={[
              styles.title,
              {
                textAlign: "center",
                color: "#808080",
                fontSize: 48,
              },
            ]}
          >
            No existe este articulo
          </Text>
          <Pressable
            onPress={() => router.back()}
            style={[styles.button, { backgroundColor: colors.primary }]}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Escanear de nuevo
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Articulo",
          headerShown: false,
        }}
      />
      <Text style={[styles.title, { color: colors.primary }]}>
        {article?.nombre}
      </Text>
      <Text style={[styles.descripcion, { color: colors.text }]}>
        {article?.descripcion}
      </Text>
      <Image
        style={[
          styles.imagen,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderWidth: 1,
          },
        ]}
        source={{ uri: article?.image?.url }}
        alt="imagen"
      />
      <SafeAreaView style={{ gap: 12, marginBottom: 24 }}>
        <Text style={[styles.subtitle, { color: colors.primary }]}>
          Información
        </Text>
        <LabelText label="Registrado por:" text={article?.registrado.email} />
        <LabelText label="Condición:" text={article?.condicion} />
        <View style={styles.twoColumn}>
          <LabelText
            label="Ubicación"
            style={{ flex: 1 }}
            text={article?.aula}
          />
          <LabelText
            label="Registrado el:"
            style={{ flex: 1 }}
            text={formatDate(article.createdAt)}
          />
        </View>
        <LabelText label="Carrera:" text={article?.carrera?.nombre} />
      </SafeAreaView>
      <ListMantenimiento mantenimientos={article?.mantenimientos} />
      <ListCambios cambios={article?.cambios} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  twoColumn: {
    flexDirection: "row",
    display: "flex",
  },
  container: {
    paddingHorizontal: 20,
    gap: 52,
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  title: {
    fontSize: 36,
    marginTop: 24,
  },
  subtitle: {
    color: "white",
    fontSize: 28,
    textAlign: "right",
  },
  descripcion: {
    fontSize: 18,
    marginTop: 8,
    textAlign: "left",
  },
  imagen: {
    width: "100%",
    aspectRatio: 1,
    objectFit: "cover",
    backgroundColor: "white",
    marginTop: 24,
    marginBottom: 24,
    borderRadius: 16,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 6,
    fontSize: 28,
    flex: 0,
  },
});
