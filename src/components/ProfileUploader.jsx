import React, {useState, forwardRef} from 'react';
import styled from 'styled-components';
import Icon, {ICON_TYPE} from './common/Icon';

const Div = styled.div`
  // background: grey;
`;

const Input = styled.input`
  opacity: 0;
`;

const Preview = styled.img`
  width: 116px;
  height: 117px;
  object-fit: cover;
  border-radius: 50%;
`;

export default forwardRef(function ProfileUploader(props, ref) {
  const [preview, setPreview] = useState('');
  const onChange = async (e) => {
    const [file] = e.target.files;
    if (!file) {
      setPreview('');
      return;
    }
    setPreview(URL.createObjectURL(file));
  };

  return (
    <Div>
      <label htmlFor="uploader">
        {!preview && <Icon type={ICON_TYPE.PROFILE_UPLOAD} color="none" size={116} />}
        {preview && <Preview src={preview} alt="미리보기" />}
      </label>
      <Input id="uploader" ref={ref} type="file" accept="image/*" onChange={onChange} />
    </Div>
  );
});
