import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Button,
  FlatList,
  TextInput,
  Modal,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { CapturedPhoto } from '../types/CapturedPhoto';
import { loadPhotos, savePhotos } from '../utils/storage';
import { PhotoItem } from '../components/PhotoItem';

export const FieldCapture = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const [photos, setPhotos] = useState<CapturedPhoto[]>([]);
  const [tempPhoto, setTempPhoto] = useState<any>(null);

  const [label, setLabel] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const stored = await loadPhotos();
      setPhotos(stored);
    })();
  }, []);

  const takePhoto = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync();
    const capturedAt = new Date().toISOString();

    setTempPhoto({ ...photo, capturedAt });
    setModalVisible(true);
  };

  const savePhoto = async () => {
    if (!label.trim()) return;

    const newPhoto: CapturedPhoto = {
      id: Date.now().toString(),
      localPath: tempPhoto.uri,
      capturedAt: tempPhoto.capturedAt,
      label,
    };

    const updated = [newPhoto, ...photos];
    setPhotos(updated);
    await savePhotos(updated);

    setModalVisible(false);
    setLabel('');
    setTempPhoto(null);
  };

  const deletePhoto = async (id: string) => {
    const updated = photos.filter((p) => p.id !== id);
    setPhotos(updated);
    await savePhotos(updated);
  };

  if (!permission) return <SafeAreaView />;
  if (!permission.granted) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Button title="Grant Camera Permission" onPress={requestPermission} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
      <View style={{ height: 300, backgroundColor: '#000' }}>

        <CameraView style={{ flex: 1 }} ref={cameraRef} />
        
        <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
          <Text style={styles.captureButtonText}>Capture Photo</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 5 }}
        contentContainerStyle={{ paddingVertical: 10 }}
        renderItem={({ item }) => (
          <PhotoItem photo={item} onDelete={deletePhoto} />
        )}
      />

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
          <View style={{ backgroundColor: '#ebebeb', padding: 20 }}>
            <Text>Enter Label</Text>
            <TextInput
              placeholder="e.g. Front tyre"
              value={label}
              onChangeText={setLabel}
              style={{ borderWidth: 1, marginVertical: 10 }}
            />
            <Button title="Save" onPress={savePhoto} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    captureButton: {
      marginTop: 10,
      backgroundColor: '#1f68d6',
      paddingVertical: 8,
      marginHorizontal: 0,
      borderRadius: 1,
      alignItems: 'center',
      height: 40,
    },
    captureButtonText: {
      color: '#fff',
      fontWeight: '600',
    },
  });