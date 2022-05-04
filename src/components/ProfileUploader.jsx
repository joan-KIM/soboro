import React, {useState} from 'react';
import styled from 'styled-components';
import {compress} from './../utils/compress';
import {useAuth} from './../hooks/useAuth';
import {uploadFile} from '../firebase/storage';

const Div = styled.div`
    width: 150px;
    height: 150px;
    border: 1px solid black;
`;

export default function ProfileUploader() {
  const [preview, setPreview] = useState('');
  const {user} = useAuth();
  const onChange = async (e) => {
    const [file] = e.target.files;
    if (!file) {
      setPreview('');
      return;
    }
    setPreview(URL.createObjectURL(file));
    const compressedFile = await compress(file, 120, 120);
    uploadFile(user.uid, compressedFile);
  };

  return (
    <div>
      <Div>
        {!preview && <img />}
        {preview && <img src={preview} alt="미리보기" />}
      </Div>
      <input type="file" accept="image/*" onChange={onChange} />
    </div>
  );
}
