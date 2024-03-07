import React from 'react';
import {useUserContext} from '../contexts/UserContext';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import BackHeader from '../components/header/BackHeader';
import PhoneValidationScreen from '../screens/Login/PhoneValidationScreen';
import ProfilePhotoScreen from '../screens/Login/ProfilePhotoScreen';
import ContactScreen from '../screens/Login/ContactScreen';
import JoinCompletedScreen from '../screens/Login/JoinCompletedScreen';
import JoinMoAScreen from '../screens/Login/JoinMoAScreen';
import BlankHeader from '../components/header/BlankHeader';
import StoreMainScreen from '../screens/products/StoreMainScreen';
import StoreHeader from '../components/header/StoreHeader';
import ProductDetailScreen from '../screens/products/ProductDetailScreen';
import ProductCategorizedListScreen from '../screens/products/ProductCategorizedListScreen';
import TitleHeader from '../components/header/TitleHeader';
import NewFundScreen from '../screens/funding/new/NewFundScreen';
import NewFundShippingScreen from '../screens/funding/new/NewFundShippingScreen';
import FundCompletedScreen from '../screens/funding/new/FundCompletedScreen';
import FundDetailScreen from '../screens/funding/components/FundDetailScreen';
import JoinFundScreen from '../screens/funding/join/JoinFundScreen';
import JoinFundMSGScreen from '../screens/funding/join/JoinFundMSGScreen';
import JoinFundPayScreen from '../screens/funding/join/JoinFundPayScreen';
import JoinFundCompletedScreen from '../screens/funding/join/JoinFundCompletedScreen';
import MyPageMainScreen from '../screens/myPage/MyPageMainScreen';
import MyPageDetailScreen from '../screens/myPage/profile/MyPageDetailScreen';
import MyFundingScreen from '../screens/myPage/fundings/MyFundingScreen';
import MyFriendsScreen from '../screens/myPage/friends/MyFriendsScreen';
import MyMessagesScreen from '../screens/myPage/message/MyMessagesScreen';
import MyOrdersScreen from '../screens/myPage/order/MyOrdersScreen';
import MyOrderDetailScreen from '../screens/myPage/order/MyOrderDetailScreen';
import CustomerCenterScreen from '../screens/myPage/cs/CustomerCenterScreen';
import FriendFundListScreen from '../screens/funding/FriendFundListScreen';
import MyNotificationScreen from '../screens/myPage/notification/MyNotificationScreen';
import AppConfigScreen from '../screens/myPage/appConfig/AppConfigScreen';
import FinishFundCompletedScreen from '../screens/funding/join/FinishFundCompletedScreen';
import AnnouncesScreen from '../screens/myPage/cs/AnnouncesScreen';
import MoATermsAndUsagesScreen from '../screens/myPage/moa/MoATermsAndUsagesScreen';
import {RootStackParamList} from '../types/router';
import LoginScreen from '../screens/Login/LoginScreen';

const AuthRouter = () => {
  const {
    userState: {user},
  } = useUserContext();
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator>
      {user?.status === 'SIGNED_UP' ? (
        <>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="StoreMainScreen"
            component={StoreMainScreen}
            options={{header: StoreHeader}}
          />
          <Stack.Screen
            name="ProductDetailScreen"
            component={ProductDetailScreen}
            options={{header: BackHeader}}
          />
          <Stack.Screen
            name="ProductCategorizedListScreen"
            component={ProductCategorizedListScreen}
            options={{header: () => <TitleHeader />}}
          />
          <Stack.Screen
            name="NewFundScreen"
            component={NewFundScreen}
            options={{header: () => <TitleHeader />}}
          />
          <Stack.Screen
            name="NewFundShippingScreen"
            component={NewFundShippingScreen}
            options={{header: () => <TitleHeader />}}
          />
          <Stack.Screen
            name="FundCompletedScreen"
            component={FundCompletedScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="FriendFundListScreen"
            component={FriendFundListScreen}
            options={{header: () => <TitleHeader />}}
          />
          <Stack.Screen
            name="FundDetailScreen"
            component={FundDetailScreen}
            options={{header: StoreHeader}}
          />
          <Stack.Screen
            name="JoinFundScreen"
            component={JoinFundScreen}
            options={{header: BackHeader}}
          />
          <Stack.Screen
            name="JoinFundMSGScreen"
            component={JoinFundMSGScreen}
            options={{header: BackHeader}}
          />
          <Stack.Screen
            name="JoinFundPayScreen"
            component={JoinFundPayScreen}
            options={{header: BackHeader}}
          />
          <Stack.Screen
            name="JoinFundCompletedScreen"
            component={JoinFundCompletedScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="FinishFundCompletedScreen"
            component={FinishFundCompletedScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="MyPageMainScreen"
            component={MyPageMainScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MyPageDetailScreen"
            component={MyPageDetailScreen}
            options={{header: () => <TitleHeader />}}
          />
          <Stack.Screen
            name="MyFundingScreen"
            component={MyFundingScreen}
            options={{header: () => <TitleHeader />}}
          />
          <Stack.Screen
            name="MyFriendsScreen"
            component={MyFriendsScreen}
            options={{header: () => <TitleHeader />}}
          />
          <Stack.Screen
            name="MyMessagesScreen"
            component={MyMessagesScreen}
            options={{header: () => <TitleHeader />}}
          />
          <Stack.Screen
            name="MyNotificationScreen"
            component={MyNotificationScreen}
            options={{header: () => <TitleHeader />}}
          />
          <Stack.Screen
            name="MyOrdersScreen"
            component={MyOrdersScreen}
            options={{header: () => <TitleHeader />}}
          />
          <Stack.Screen
            name="MyOrderDetailScreen"
            component={MyOrderDetailScreen}
            options={{header: () => <TitleHeader />}}
          />
          <Stack.Screen
            name="AnnouncesScreen"
            component={AnnouncesScreen}
            options={{header: () => <TitleHeader />}}
          />
          <Stack.Screen
            name="CustomerCenterScreen"
            component={CustomerCenterScreen}
            options={{header: () => <TitleHeader />}}
          />
          <Stack.Screen
            name="AppConfigScreen"
            component={AppConfigScreen}
            options={{header: () => <TitleHeader />}}
          />
          <Stack.Screen
            name="MoATermsAndUsagesScreen"
            component={MoATermsAndUsagesScreen}
            options={{header: () => <TitleHeader />}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              header: BackHeader,
            }}
          />
          <Stack.Screen
            name="JoinMoAScreen"
            component={JoinMoAScreen}
            options={{
              header: BackHeader,
            }}
          />
          <Stack.Screen
            name="PhoneValidationScreen"
            component={PhoneValidationScreen}
            options={{
              header: BackHeader,
            }}
          />
          <Stack.Screen
            name="ProfilePhotoScreen"
            component={ProfilePhotoScreen}
            options={{
              header: BlankHeader,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="ContactScreen"
            component={ContactScreen}
            options={{
              header: BackHeader,
            }}
          />
          <Stack.Screen
            name="JoinCompletedScreen"
            component={JoinCompletedScreen}
            options={{
              header: BlankHeader,
              gestureEnabled: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthRouter;
