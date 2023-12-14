import axios from 'axios';
import Config from 'react-native-config';

export const uploadImage = async file => {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', Config.CLOUDINARY_UPLOAD_PRESET);
  data.append('cloud_name', Config.CLOUDINARY_NAME);
  data.append('folder', 'Cloudinary-MoA');
  const response = {secure_url: '', message: ''};
  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${Config.CLOUDINARY_NAME}/image/upload`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    response.secure_url = res.data.secure_url;
    return response;
  } catch (error: any) {
    console.log(error.request);
    response.message = '업로드에 실패했습니다. 다시 시도해주세요.';
    return response;
  }
};
