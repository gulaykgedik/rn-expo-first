import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";

const AVPage = () => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0); // kaldığın yer (ms)

  // Ses dosyasını yükle
  const loadSound = async () => {
    console.log("🎵 Loading Sound...");
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/music.mp3"),
      {
        shouldPlay: false, // başta otomatik çalmasın
        positionMillis: position, // kaldığı yerden başla
      }
    );
    setSound(sound);
    console.log("✅ Sound loaded.");
  };

  // Çalma veya durdurma işlemi
  const togglePlayPause = async () => {
    if (!sound) {
      await loadSound();
    }

    if (sound && !isPlaying) {
      console.log("▶️ Playing from", position, "ms");
      await sound.playFromPositionAsync(position);
      setIsPlaying(true);
    } else if (sound && isPlaying) {
      console.log("⏸️ Pausing...");
      const status = await sound.getStatusAsync();
      setPosition(status.positionMillis); // kaldığın yer
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  // Temizlik (sayfa kapanınca sesi serbest bırak)
  useEffect(() => {
    return sound
      ? () => {
          console.log("🧹 Unloading Sound...");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎧 Müzik Çalar</Text>

      <TouchableOpacity onPress={togglePlayPause} style={styles.button}>
        <Text style={styles.buttonText}>
          {isPlaying ? "⏸️ Durdur" : "▶️ Çal"}
        </Text>
      </TouchableOpacity>

      {isPlaying ? (
        <Text style={styles.info}>Şu anda oynatılıyor...</Text>
      ) : position > 0 ? (
        <Text style={styles.info}>
          Kaldığın yer: {(position / 1000).toFixed(1)} sn
        </Text>
      ) : (
        <Text style={styles.info}>Henüz çalmaya başlanmadı.</Text>
      )}
    </View>
  );
};

export default AVPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0b0f",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 20,
    fontWeight: "600",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  info: {
    color: "#aaa",
    marginTop: 15,
    fontSize: 14,
  },
});
