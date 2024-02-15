import messaging from '@react-native-firebase/messaging';
import Contacts from 'react-native-contacts';
import {PermissionsAndroid, Platform} from 'react-native';
import {UserContact} from '../types/User';
import Toast from 'react-native-toast-message';

export const getContactsInfo = async () => {
  const organized: UserContact = {contactList: []};
  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal',
      },
    )
      .then(async () => {
        await Contacts.getAll()
          .then(contacts => {
            contacts.forEach(contact => {
              const name = contact.displayName;
              const phoneNumber = contact.phoneNumbers[0].number;
              organized.contactList.push({name, phoneNumber});
            });
          })
          .then(() => organized);
      })
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(error => {
        console.error('Permission error: ', error);
        Toast.show({type: 'error', text1: '연락처 권한이 설정되지 못했어요🥲'});
      });
  }
  if (Platform.OS === 'ios') {
    await Contacts.getAll()
      .then(contacts => {
        contacts.forEach(contact => {
          if (contact.phoneNumbers[0]) {
            const name = `${contact.familyName}${contact.givenName}`;
            const phoneNumber = contact.phoneNumbers[0].number;
            organized.contactList.push({name, phoneNumber});
          }
        });
        console.log(organized);
      })
      .then(() => organized)
      .catch(error => {
        console.error('Permission error: ', error);
        Toast.show({type: 'error', text1: '연락처 권한이 설정되지 못했어요🥲'});
      });
  }
  return organized;
};

export const getDeviceToken = async () => {
  const getFCMToken = async () => {
    const fcmToken = await messaging()
      .getToken()
      .then(res => res)
      .catch(error => console.log(error));
    console.log('FCM토큰값:', fcmToken);
  };

  if (Platform.OS === 'android') {
    const authStatus = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (authStatus === 'granted') {
      getFCMToken();
    }
  }

  if (Platform.OS === 'ios') {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      return getFCMToken();
    }
  }
};
