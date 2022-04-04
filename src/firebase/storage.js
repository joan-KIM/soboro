import {getStorage, ref, uploadBytes} from 'firebase/storage';
import app from './firebase';

const storage = getStorage(app);

export const uploadFile = (eventId, file) => {
  // TODO: 파일 경로, 파일 확장자 지정
  const imageRef = ref(storage, `${eventId}/${file.name}.${file.ext}`);
  return uploadBytes(imageRef, file);
};
