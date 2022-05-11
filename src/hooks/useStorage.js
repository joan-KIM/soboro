import {uploadFile} from '../firebase/storage';
import {getDownloadURL} from 'firebase/storage';
import {useState, useRef} from 'react';

export const useStorage = (id) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const uploadTask = useRef(null);

  const upload = (file) => {
    if (loading) {
      return;
    }
    uploadTask.current = uploadFile(id, file);
    setLoading(true);
    return new Promise((resolve, reject) => {
      uploadTask.current.on('state_changed',
          (snapshot) => {
            // progress
          },
          (err) => {
            // error
            setError(err);
            setLoading(false);
            reject(err);
          },
          async () => {
            // complete
            const downloadURL = await getDownloadURL(uploadTask.current.snapshot.ref);
            setLoading(false);
            resolve(downloadURL);
          },
      );
    });
  };

  const pause = () => uploadTask.current.pause();
  const resume = () => uploadTask.current.resume();
  const cancel = () => uploadTask.current.cancel();

  return {
    loading,
    error,
    upload,
    pause,
    resume,
    cancel,
  };
};
