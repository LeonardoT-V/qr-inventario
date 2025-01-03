import { CameraView, Camera, BarcodeScanningResult } from "expo-camera";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  PermissionStatus,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { isQrValid } from "@/utils";

export default function App() {
  const [hasPermission, setHasPermission] = useState<PermissionStatus & any>(
    null
  );
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = ({ data }: BarcodeScanningResult) => {
    const dataParsed = isQrValid(data);
    if (!dataParsed) return;
    setScanned(true);
    router.push(`/article/${dataParsed.Codigo}`);
  };

  if (hasPermission === null || hasPermission === false) {
    return <Text>No access to camera !!</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Pressable
          style={styles.containerAction}
          onPress={() => setScanned(false)}
        >
          <Text style={styles.textAgain}>Escanear de nuevo</Text>
          <View style={styles.button}>
            <Ionicons name="camera" size={32} color="black" />
          </View>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  containerAction: {
    position: "absolute",
    bottom: 70,
    left: "50%",
    transform: [{ translateX: "-50%" }],
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 18,
  },
  textAgain: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "800",
  },
  button: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 64,
    height: 64,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
