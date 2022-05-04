import React, {useState, forwardRef} from 'react';
import styled from 'styled-components';

const Div = styled.div`
    width: 150px;
    height: 150px;
    border: 1px solid black;
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
    <div>
      <Div>
        {!preview && <img />}
        {preview && <img src={preview} alt="미리보기" width={111} height={111} />}
      </Div>
      <input ref={ref} type="file" accept="image/*" onChange={onChange} />
    </div>
  );
});
