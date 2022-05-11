import React, {useState, forwardRef} from 'react';
import styled from 'styled-components';
import Icon, {ICON_TYPE} from './common/Icon';

const Div = styled.div`
  width: 100%;
  position: relative;
`;

const Input = styled.input`
  opacity: 0;
  position: absolute;
  top: 0;
`;

const Preview = styled.img`
  width: 116px;
  height: 116px;
  object-fit: cover;
  border-radius: 50%;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const fileTypes = [
  'image/png',
  'image/jpeg',
  'image/svg',
];

const validFileType = (file) => {
  return fileTypes.includes(file.type);
};

export default forwardRef(function ProfileUploader(props, ref) {
  const [preview, setPreview] = useState('');

  const onChange = async (e) => {
    const [file] = e.target.files;
    if (!file) {
      setPreview('');
      return;
    }
    if (validFileType(file)) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview('');
      e.target.value = '';
      alert('".jpg", ".png", ".svg" 이미지 파일만 업로드 가능합니다.');
    }
  };

  return (
    <Div>
      <Label htmlFor="uploader">
        {!preview && <Icon type={ICON_TYPE.PROFILE_UPLOAD} color="none" size={116} />}
        {preview && <Preview src={preview} alt="미리보기" />}
      </Label>
      <Input id="uploader" ref={ref} type="file" accept="image/*" onChange={onChange} />
    </Div>
  );
});
