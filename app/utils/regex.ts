export const autoHyphenPhoneNumber = (text: string) => {
  const reformed = text
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
    .replace(/(\-{1,2})$/g, '');
  return reformed;
};

export const autoSlashBirthday = (text: string) => {
  const reformed = text
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, '$1/$2/$3')
    .replace(/(\/{1,2})$/g, '');
  return reformed;
};

export const autoCurrency = (money: string | number) => {
  const reformed = Number(money).toLocaleString();
  return reformed;
};

export const twoDP = (n: number) => (n > 9 ? n : '0' + n);

export const httpsUrlCorrector = (imageUrl: string | undefined) => {
  if (imageUrl) {
    return imageUrl[4] !== 's' ? `https://${imageUrl.substring(7)}` : imageUrl;
  }
  return '';
};
