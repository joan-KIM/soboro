import React, {useState, forwardRef} from 'react';
import Icon, {ICON_TYPE} from './common/Icon';
import styled from 'styled-components';
import {useUser} from '../hooks/useUser';
import {fileTypes} from '../constants/filetype';

const Wrapper = styled.div`
  position: relative;
  width: 110px;
  height: 110px;
  margin: 0 auto;

  svg{
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;

const Label = styled.label`
  background: #FFFFFF;
  display: block;
  width: 110px;
  height: 110px;
  border-radius: 50%;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const Input = styled.input`
  position: absolute;
  top: 0;
  opacity: 0;
`;

const validFileType = (file) => {
  return fileTypes.includes(file.type);
};

export default forwardRef(function ProfilePictureEditor(props, ref) {
  const {user} = useUser();
  const [thumbnail, setThumbnail] = useState(user?.photoUrl);

  const onChange = async (e) => {
    const [file] = e.target.files;

    if (validFileType(file)) {
      setThumbnail(URL.createObjectURL(file));
    } else {
      e.target.value = '';
      alert('".jpg", ".png", ".svg" 이미지 파일만 업로드 가능합니다.');
    }
  };

  return (
    <Wrapper>
      <Label htmlFor="uploader">
        <Thumbnail src={thumbnail} />
      </Label>
      <Icon type={ICON_TYPE.CAMERA} size={28} />
      <Input ref={ref} type="file" id="uploader" accept="image/*" onChange={onChange} />
    </Wrapper>
  );
});
