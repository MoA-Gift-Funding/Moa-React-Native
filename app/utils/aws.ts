import {Asset} from 'react-native-image-picker';

const getBlob = async (fileUri: string) => {
  const resp = await fetch(fileUri);
  const imageBody = await resp.blob();
  return imageBody;
};

export const getImageBlob = async (assets: Asset[]) => {
  const file = assets[0];
  const uri = file.uri;
  const name = file.fileName!;
  const imageBody = await getBlob(uri!);
  return {imageBody, name};
};
