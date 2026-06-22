import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CapturedPhoto } from '../types/CapturedPhoto';

interface Props {
  photo: CapturedPhoto;
  onDelete: (id: string) => void;
}

export const PhotoItem: React.FC<Props> = ({ photo, onDelete }) => {
  const date = new Date(photo.capturedAt);

  const formatted = `${date.toLocaleDateString('en-GB')} ${date
    .toTimeString()
    .slice(0, 5)}`;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: photo.localPath }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.label}>{photo.label}</Text>
      <Text style={styles.date}>{formatted}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(photo.id)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 6,
  },
  label: {
    marginTop: 6,
    textAlign: 'center',
    fontWeight: '600',
  },
  date: {
    marginTop: 4,
    textAlign: 'center',
    color: '#666',
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#e53935',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
