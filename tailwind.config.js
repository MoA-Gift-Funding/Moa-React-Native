/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './app/*.{js,jsx,ts,tsx}',
    './app/screens/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'Gray-01': '#FAFAFA',
        'Gray-02': '#F5F5F5',
        'Gray-03': '#EEEEEE',
        'Gray-04': '#E0E0E0',
        'Gray-05': '#BDBDBD',
        'Gray-06': '#9E9E9E',
        'Gray-07': '#757575',
        'Gray-08': '#616161',
        'Gray-09': '#424242',
        'Gray-10': '#212121',
        'Main-01': '#FF5414',
        'Sub-01': '#FF6B33',
        'Sub-02': '#F7F7EF',
      },
      fontSize: {
        'Heading-1': '34px',
        'Heading-2': '28px',
        'Heading-3': '21px',
        'Heading-4': '18px',
        'Body-1': '16px',
        'Body-2': '14px',
        'Detail-1': '12px',
      },
      lineHeight: {
        'Heading-1': '44px',
        'Heading-2': '37px',
        'Heading-3': '29px',
        'Heading-4': '25px',
        'Body-1': '24px',
        'Body-2': '22px',
        'Detail-1': '18px',
      },
      fontFamily: {
        'pretendard-regular': ['Pretendard-Regular'],
        'pretendard-semibold': ['Pretendard-SemiBold'],
        'pretendard-bold': ['Pretendard-Bold'],
      },
    },
  },
  plugins: [],
};
