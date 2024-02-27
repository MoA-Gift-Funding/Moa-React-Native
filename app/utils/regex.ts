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

export const createOrderId = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = twoDP(date.getMonth() + 1);
  const day = twoDP(date.getDate());
  const random = Math.floor(Math.random() * Number(date));
  return `MOA${year}${month}${day}-${random}`;
};

export const isRefundable = (participatedDate: string) => {
  const today = new Date();
  const purchasedDate = new Date(participatedDate);
  const timeDiff = today.getTime() - purchasedDate.getTime();
  const days = Math.round(timeDiff / (1000 * 3600 * 24));
  if (days < 8) {
    return true;
  }
  return false;
};
