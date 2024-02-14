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
import StoreMain from '../screens/store/StoreMain';
import StoreHeader from '../components/header/StoreHeader';
import ItemDetail from '../screens/store/ItemDetail';
import ItemList from '../screens/store/ItemList';
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
import MyAlarm from '../screens/myPage/notification/MyAlarm';
import MyOrders from '../screens/myPage/order/MyOrders';
import MyOrder from '../screens/myPage/order/MyOrder';
import Notices from '../screens/myPage/cs/Notices';
import CustomerCenter from '../screens/myPage/cs/CustomerCenter';
import MyInquiries from '../screens/myPage/cs/MyInquiries';
import FriendFundList from '../screens/funding/FriendFundList';

const AuthRouter = () => {
  const {
    userState: {user},
  } = useUserContext();
  const Stack = createNativeStackNavigator();

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
            options={{headerShown: false}}
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
            options={{headerShown: false}}
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
            name="MyAlarm"
            component={MyAlarm}
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
            name="Notices"
            component={Notices}
            options={{header: () => <TitleHeader />}}
          />
          <Stack.Screen
            name="CustomerCenter"
            component={CustomerCenter}
            options={{header: () => <TitleHeader />}}
          />
          <Stack.Screen
            name="MyInquiries"
            component={MyInquiries}
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
              header: () => <BackHeader />,
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
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthRouter;
