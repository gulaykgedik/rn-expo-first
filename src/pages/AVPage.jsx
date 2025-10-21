import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";
import {
  Backward10Seconds,
  Forward10Seconds,
  Play,
  Pause,
} from "iconsax-react-nativejs";

const AVPage = () => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0); // mevcut süre (ms)
  const [duration, setDuration] = useState(1); // toplam süre (ms)
  const [progress, setProgress] = useState(0); // yüzde ilerleme

  const barRef = useRef(null);

  // Ses dosyasını yükle
  const loadSound = async () => {
    console.log("🎵 Loading Sound...");
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/music.mp3"),
      {
        shouldPlay: false,
        positionMillis: position,
      },
      onPlaybackStatusUpdate
    );
    setSound(sound);
    console.log("✅ Sound loaded.");
  };

  // Ses çalma durumunu sürekli dinle
  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis || 1);
      setProgress((status.positionMillis / (status.durationMillis || 1)) * 100);
      setIsPlaying(status.isPlaying);
    }
  };

  // Oynat/Durdur
  const togglePlayPause = async () => {
    if (!sound) {
      await loadSound();
    }

    if (sound && !isPlaying) {
      console.log("▶️ Playing from", position, "ms");
      await sound.playFromPositionAsync(position);
    } else if (sound && isPlaying) {
      console.log("⏸️ Pausing...");
      await sound.pauseAsync();
    }
  };

  // 10 saniye geri sar
  const handleRewind = async () => {
    if (sound) {
      const newPos = Math.max(position - 10000, 0);
      await sound.setPositionAsync(newPos);
      setPosition(newPos);
    }
  };

  // 10 saniye ileri sar
  const handleForward = async () => {
    if (sound) {
      const newPos = Math.min(position + 10000, duration);
      await sound.setPositionAsync(newPos);
      setPosition(newPos);
    }
  };

  // İlerleme çubuğuna dokunarak atlama
  const handleSeek = async (event) => {
    if (!sound) return;
    const { locationX } = event.nativeEvent;

    barRef.current.measure((fx, fy, width) => {
      const percent = locationX / width;
      const newPos = percent * duration;
      sound.setPositionAsync(newPos);
      setProgress(percent * 100);
    });
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
    <View style={{ flex: 1, justifyContent: "center", marginHorizontal: 20 }}>
      <View style={styles.player}>
        <Pressable ref={barRef} onPress={handleSeek} style={{ paddingVertical: 20 }}>
          <View style={styles.bgBar}>
            <View style={[styles.fgBar, { width: `${progress}%` }]}>
              <View style={styles.circle}></View>
            </View>
          </View>
        </Pressable>

        <View style={styles.timeRow}>
          <Text style={styles.timeText}>
            {Math.floor(position / 1000)}s
          </Text>
          <Text style={styles.timeText}>
            {Math.floor(duration / 1000)}s
          </Text>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity onPress={handleRewind}>
            <Backward10Seconds size={35} />
          </TouchableOpacity>

          <TouchableOpacity onPress={togglePlayPause}>
            {isPlaying ? (
              <Pause size={40} color="black" />
            ) : (
              <Play size={40} color="black" />
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={handleForward}>
            <Forward10Seconds size={35} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AVPage;

const styles = StyleSheet.create({
  bgBar: {
    width: "100%",
    height: 4,
    backgroundColor: "#555",
    borderRadius: 2,
  },
  fgBar: {
    height: 5,
    backgroundColor: "red",
    borderRadius: 2,
    position: "relative",
  },
  circle: {
    width: 15,
    height: 15,
    backgroundColor: "red",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "white",
    position: "absolute",
    top: -5,
    right: 0,
  },
  controls: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  player: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 20,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeText: {
    color: "#333",
    fontSize: 12,
  },
});
