import messaging from '@react-native-firebase/messaging';
import Contacts from 'react-native-contacts';
import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import {UserContact} from '../types/User';
import Toast from 'react-native-toast-message';
import VersionCheck from 'react-native-version-check';

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

export const getCurrentAppVersion = () => {
  const currentVersion = VersionCheck.getCurrentVersion();
  return currentVersion;
};

export const getLatestAppVersion = () => {
  const storeVersion = VersionCheck.getLatestVersion();
  return storeVersion;
};

export const updateAppVersion = async () => {
  VersionCheck.needUpdate({
    currentVersion: await getCurrentAppVersion(),
    latestVersion: await getLatestAppVersion(),
  }).then(res => {
    if (res.isNeeded) {
      Alert.alert(
        '필수 업데이트 사항이 있어요',
        '\n서비스 이용을 위해\n앱을 업데이트 해주세요🙏🏻',
        [
          {
            text: '스토어로 이동',
            onPress: () => {
              if (Platform.OS == 'android') {
                Linking.openURL('안드로이드 앱스토어 주소');
              } else {
                Linking.openURL('IOS 앱스토어 주소');
              }
            },
          },
        ],
      );
    }
  });
};
