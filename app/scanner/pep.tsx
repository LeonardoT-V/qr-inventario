import { CameraView } from "expo-camera";
import { Stack, router, useNavigation } from "expo-router";
import { AppState, SafeAreaView, StyleSheet } from "react-native";
import { useEffect, useRef } from "react";

export default function Home() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });
    return () => subscription.remove();
  }, []);

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen
        options={{
          title: "Escanear QR",
          headerShown: true,
        }}
      />
      <CameraView
        ratio="16:9"
        style={{
          height: "100%",
          width: "100%",
        }}
        onBarcodeScanned={({ data }) => {
          console.log({ qrLock, data: data[0] });

          if (data && !qrLock.current) {
            console.log(data);
            qrLock.current = true;
            setTimeout(async () => {
              router.push(`/article/${2}`);
              qrLock.current = false;
            }, 500);
          }
        }}
      />
      <Overlay />
    </SafeAreaView>
  );
}
