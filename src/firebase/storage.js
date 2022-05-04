import {getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import app from './firebase';

const storage = getStorage(app);

export const uploadFile = (id, file) => {
  const imageRef = ref(storage, `${id}/${file.name}`);
  return uploadBytesResumable(imageRef, file);
};
