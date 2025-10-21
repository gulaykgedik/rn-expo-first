import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Video } from "expo-av";


const VideoPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.videoWrapper}>
        <Video 
        source={require("../../assets/videos/video.mp4")}
        style={styles.video}
        resizeMode="contain"
        useNativeControls={true}
        />
      </View>
    </View>
  )
};

    


export default VideoPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  videoWrapper: {
    width: 300,
    height: 200,
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    height: "100%",
  },
});
