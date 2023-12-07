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

export const autoCurrency = (money: string) => {
  const reformed = money
    .replace(/[^0-9]/g, '')
    .replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
  return reformed;
};
