import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

const FilePage = () => {
  const [fileInfo, setFileInfo] = useState(null);
  const [fileContent, setFileContent] = useState('');

  // 📂 Dosya seçme
  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // tüm dosya türleri (ör: "image/*", "application/pdf" vb.)
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        console.log('Kullanıcı seçim yapmadı.');
        return;
      }

      const file = result.assets[0];
      console.log('Seçilen dosya:', file);

      setFileInfo(file);

      // Dosya okunabilir bir metinse (örneğin .txt)
      if (file.uri.endsWith('.txt')) {
        const content = await FileSystem.readAsStringAsync(file.uri);
        setFileContent(content);
      } else {
        setFileContent('Bu dosya okunabilir metin türünde değil.');
      }

    } catch (error) {
      console.error('Dosya seçme hatası:', error);
    }
  };

  // 🗑 Dosyayı sil
  const deleteFile = async () => {
    if (!fileInfo) return;
    try {
      await FileSystem.deleteAsync(fileInfo.uri, { idempotent: true });
      console.log('Dosya silindi.');
      setFileInfo(null);
      setFileContent('');
    } catch (error) {
      console.error('Silme hatası:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📁 Dosya İşlemleri</Text>

      <Button title="Dosya Seç" onPress={pickFile} />

      {fileInfo && (
        <View style={styles.infoBox}>
          <Text>Ad: {fileInfo.name}</Text>
          <Text>Boyut: {fileInfo.size} bayt</Text>
          <Text>URI: {fileInfo.uri}</Text>
          <Text style={{ marginTop: 10, fontWeight: 'bold' }}>İçerik:</Text>
          <Text>{fileContent}</Text>

          <View style={{ marginTop: 10 }}>
            <Button title="Dosyayı Sil" color="red" onPress={deleteFile} />
          </View>
        </View>
      )}
    </View>
  );
};

export default FilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoBox: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
  },
});
