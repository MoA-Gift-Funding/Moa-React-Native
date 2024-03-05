import React from 'react';
import {useUserContext} from '../contexts/UserContext';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/home/Home';
import Login from '../screens/Login/Login';
import BackHeader from '../components/header/BackHeader';
import PhoneValidation from '../screens/Login/PhoneValidation';
import Profile from '../screens/Login/Profile';
import Contact from '../screens/Login/Contact';
import JoinCompleted from '../screens/Login/JoinCompleted';
import Join from '../screens/Login/Join';
import BlankHeader from '../components/header/BlankHeader';
import StoreMain from '../screens/products/StoreMain';
import StoreHeader from '../components/header/StoreHeader';
import ItemDetail from '../screens/products/ItemDetail';
import ItemList from '../screens/products/ItemList';
import TitleHeader from '../components/header/TitleHeader';
import NewFund from '../screens/funding/new/NewFund';
import NewFundShipping from '../screens/funding/new/NewFundShipping';
import FundCompleted from '../screens/funding/new/FundCompleted';
import FundDetail from '../screens/funding/components/FundDetail';
import JoinFund from '../screens/funding/join/JoinFund';
import JoinFundMSG from '../screens/funding/join/JoinFundMSG';
import JoinFundPay from '../screens/funding/join/JoinFundPay';
import JoinFundCompleted from '../screens/funding/join/JoinFundCompleted';
import MyPageMain from '../screens/myPage/MyPageMain';
import MyPageDetail from '../screens/myPage/profile/MyPageDetail';
import MyFunding from '../screens/myPage/fundings/MyFunding';
import MyFriends from '../screens/myPage/friends/MyFriends';
import MyMessages from '../screens/myPage/message/MyMessages';
import MyOrders from '../screens/myPage/order/MyOrders';
import MyOrder from '../screens/myPage/order/MyOrder';
import CustomerCenter from '../screens/myPage/cs/CustomerCenter';
import FriendFundList from '../screens/funding/FriendFundList';
import MyNotification from '../screens/myPage/notification/MyNotification';
import AppConfig from '../screens/myPage/appConfig/AppConfig';
import FinishFundCompleted from '../screens/funding/join/FinishFundCompleted';
import Announces from '../screens/myPage/cs/Announces';
import MoA from '../screens/myPage/moa/MoA';
import {RootStackParamList} from '../types/router';

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
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="StoreMain"
            component={StoreMain}
            options={{header: () => <StoreHeader />}}
          />
          <Stack.Screen
            name="ItemDetail"
            component={ItemDetail}
            options={{header: () => <BackHeader />}}
          />
          <Stack.Screen
            name="ItemList"
            component={ItemList}
            options={{header: () => <TitleHeader />}}
          />
          <Stack.Screen
            name="NewFund"
            component={NewFund}
            options={{header: () => <TitleHeader />}}
          />
          <Stack.Screen
            name="NewFundShipping"
            component={NewFundShipping}
            options={{header: () => <TitleHeader />}}
          />
          <Stack.Screen
            name="FundCompleted"
            component={FundCompleted}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="FriendFundList"
            component={FriendFundList}
            options={{header: () => <TitleHeader />}}
          />
          <Stack.Screen
            name="FundDetail"
            component={FundDetail}
            options={{header: () => <StoreHeader />}}
          />
          <Stack.Screen
            name="JoinFund"
            component={JoinFund}
            options={{header: () => <BackHeader />}}
          />
          <Stack.Screen
            name="JoinFundMSG"
            component={JoinFundMSG}
            options={{header: () => <BackHeader />}}
          />
          <Stack.Screen
            name="JoinFundPay"
            component={JoinFundPay}
            options={{header: () => <BackHeader />}}
          />
          <Stack.Screen
            name="JoinFundCompleted"
            component={JoinFundCompleted}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="FinishFundCompleted"
            component={FinishFundCompleted}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="MyPageMain"
            component={MyPageMain}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MyPageDetail"
            component={MyPageDetail}
            options={{header: () => <TitleHeader />}}
          />
          <Stack.Screen
            name="MyFunding"
            component={MyFunding}
            options={{header: () => <TitleHeader />}}
          />
          <Stack.Screen
            name="MyFriends"
            component={MyFriends}
            options={{header: () => <TitleHeader />}}
          />
          <Stack.Screen
            name="MyMessages"
            component={MyMessages}
            options={{header: () => <TitleHeader />}}
          />
          <Stack.Screen
            name="MyNotification"
            component={MyNotification}
            options={{header: () => <TitleHeader />}}
          />
          <Stack.Screen
            name="MyOrders"
            component={MyOrders}
            options={{header: () => <TitleHeader />}}
          />
          <Stack.Screen
            name="MyOrder"
            component={MyOrder}
            options={{header: () => <TitleHeader />}}
          />
          <Stack.Screen
            name="Announces"
            component={Announces}
            options={{header: () => <TitleHeader />}}
          />
          <Stack.Screen
            name="CustomerCenter"
            component={CustomerCenter}
            options={{header: () => <TitleHeader />}}
          />
          <Stack.Screen
            name="AppConfig"
            component={AppConfig}
            options={{header: () => <TitleHeader />}}
          />
          <Stack.Screen
            name="MoA"
            component={MoA}
            options={{header: () => <TitleHeader />}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              header: () => <BackHeader />,
            }}
          />
          <Stack.Screen
            name="Join"
            component={Join}
            options={{
              header: () => <BackHeader />,
            }}
          />
          <Stack.Screen
            name="PhoneValidation"
            component={PhoneValidation}
            options={{
              header: () => <BackHeader />,
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              header: () => <BlankHeader />,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="Contact"
            component={Contact}
            options={{
              header: () => <BackHeader />,
            }}
          />
          <Stack.Screen
            name="JoinCompleted"
            component={JoinCompleted}
            options={{
              header: () => <BlankHeader />,
              gestureEnabled: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthRouter;
