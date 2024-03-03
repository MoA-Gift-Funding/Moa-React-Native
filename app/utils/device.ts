import messaging from '@react-native-firebase/messaging';
import Contacts from 'react-native-contacts';
import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import {UserContact} from '../types/User';
import Toast from 'react-native-toast-message';
import VersionCheck from 'react-native-version-check';
import Config from 'react-native-config';
import axios from 'axios';

export const getContactsInfo = async () => {
  const organized: UserContact = {contactList: []};
  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: '연락처 권한 요청',
        message: '친구를 추가하기 위하여 주소록 권한 허용이 필요합니다.',
        buttonPositive: '허용하기',
      },
    )
      .then(async () => {
        await Contacts.getAll()
          .then(contacts => {
            contacts.forEach(contact => {
              const name = contact.displayName;
              const phoneNumber = parsePhoneNumber(
                contact.phoneNumbers[0]?.number,
              );
              if (name && phoneNumber) {
                organized.contactList.push({name, phoneNumber});
              }
            });
          })
          .then(() => organized);
      })
      .then(res => res)
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
            const phoneNumber = parsePhoneNumber(
              contact.phoneNumbers[0]?.number,
            );
            organized.contactList.push({name, phoneNumber});
          }
        });
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
    return fcmToken;
  };

  if (Platform.OS === 'android') {
    const authStatus = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (authStatus === 'granted') {
      return getFCMToken();
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

export const getStoreUrl = () => {
  const url = VersionCheck.getStoreUrl();
  return url;
};

export const updateAppVersion = async () => {
  const url = await getStoreUrl();
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
            onPress: () => Linking.openURL(url),
          },
        ],
      );
    }
  });
};

export const parsePhoneNumber = (phoneNumber?: string) => {
  if (!phoneNumber) {
    return '';
  }
  phoneNumber = phoneNumber.replace(/\D/g, '');

  if (phoneNumber.startsWith('82')) {
    phoneNumber = phoneNumber.replace(/^82/, '0');
  }

  phoneNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  return phoneNumber;
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let throttling: boolean = false;

  return (...args: Parameters<T>): void => {
    if (!throttling) {
      throttling = true;
      func(...args);
      setTimeout(() => {
        throttling = false;
      }, delay);
    }
  };
};

export const makeDynamicLink = async (domain: string, domainId: string) => {
  const uriKey = `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${Config.FIREBASE_WEB_KEY}`;
  const {data} = await axios({
    method: 'post',
    url: uriKey,
    data: {
      dynamicLinkInfo: {
        domainUriPrefix: 'https://giftmoa.page.link',
        link: `https://giftmoa.page.link/${domain}=${domainId}`,
        androidInfo: {
          androidPackageName: 'com.runko.moa',
        },
        iosInfo: {
          iosBundleId: 'com.runkoRN.MoA',
          iosAppStoreId: '6473087422',
        },
        socialMetaTagInfo: {
          socialTitle: '모두가 행복한 새로운 선물 문화, 모아',
          socialDescription: '친구들은 이 선물을 갖고 싶대요!',
          socialImageLink:
            'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1700223551/moa-og_pxzqkl.png',
        },
      },
      suffix: {
        option: 'SHORT',
      },
    },
  });

  return data.shortLink;
};

export const handleDynamicLink = link => {
  console.log(link, '여기는 핸들다이나믹스');

  // Handle dynamic link inside your own application
  if (link.url === 'https://invertase.io/offer') {
    // ...navigate to your offers screen
  }
};
