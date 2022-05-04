import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import app from './firebase';

const storage = getStorage(app);

export const uploadFile = (id, file) => {
  const imageRef = ref(storage, `${id}/${file.name}`);
  return uploadBytesResumable(imageRef, file);
};

export const getURL = (id, fileName) => {
  const imageRef = ref(storage, `${id}/${fileName}`);
  return getDownloadURL(imageRef);
};
