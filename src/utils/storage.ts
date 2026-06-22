import AsyncStorage from '@react-native-async-storage/async-storage';
import { CapturedPhoto } from '../types/CapturedPhoto';

const KEY = 'CAPTURED_PHOTOS';

export const savePhotos = async (photos: CapturedPhoto[]) => {
  await AsyncStorage.setItem(KEY, JSON.stringify(photos));
};

export const loadPhotos = async (): Promise<CapturedPhoto[]> => {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};
