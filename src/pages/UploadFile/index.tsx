import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';

const UploadFile: React.FC = () => {
  const [fileList, setFileList] = useState<File[]>([]);
  const beforeUpload = (file: File) => {
    setFileList([file]);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('workId', '123');

    fetch('/jsonApi/posts', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    return false;
  }
  return (
    <Upload
      maxCount={1}
      beforeUpload={beforeUpload}
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  );
};

export default UploadFile;