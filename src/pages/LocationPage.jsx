import { Alert, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';

const LocationPage = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);

      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Konum izni reddedildi.');
        setLoading(false);
        Alert.alert('Uyarı', 'Konum izni reddedildi.');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      setLocation(loc);
      setLoading(false);
    })();
  }, []);

  let text = 'Konum alınıyor...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Enlem: ${location.coords.latitude}\nBoylam: ${location.coords.longitude}`;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Mevcut Konum</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <View style={styles.locationBox}>
          <Text style={styles.text}>{text}</Text>
        </View>
      )}
    </View>
  );
};

export default LocationPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3f3f57ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 20,
    fontWeight: '600',
  },
  locationBox: {
    backgroundColor: '#1c1c27',
    borderRadius: 12,
    padding: 20,
    width: '100%',
  },
  text: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
  },
});
