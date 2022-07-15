import React, { useEffect } from 'react';

export interface QRcodeProps {
  image: string;
  onChange: () => void;
}

const QRcode: React.FC<QRcodeProps> = (props) => {
  const { image, onChange } = props;

  useEffect(() => {
    if (onChange) onChange();
  }, []);

  return (
    <img
      src={image}
      style={{
        width: '100px',
        height: '39px',
        cursor: 'pointer',
        border: '1px solid #d9d9d9',
      }}
      alt=""
      onClick={onChange}
    />
  );
};

export default QRcode;
