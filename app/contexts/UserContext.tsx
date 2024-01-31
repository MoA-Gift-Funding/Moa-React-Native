import React, {useContext} from 'react';
import {Dispatch, createContext, useEffect, useReducer} from 'react';
import {User} from '../types/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUser from '../hooks/useUser';

interface State {
  authenticated: boolean;
  user: User | undefined;
  isLoading: boolean;
}
type Action =
  | {type: 'LOGIN'; payload: User}
  | {type: 'LOGOUT'; payload?: any}
  | {type: 'STOP_LOADING'; payload?: any};

interface UserContextProps {
  userState: State;
  dispatch: Dispatch<Action>;
}

export const UserContext = createContext<UserContextProps>({
  userState: {
    authenticated: false,
    user: undefined,
    isLoading: true,
  },
  dispatch: () => {},
});

const userReducer = (state: State, {type, payload}: Action) => {
  switch (type) {
    case 'LOGIN':
      return {...state, authenticated: true, user: payload};
    case 'LOGOUT':
      AsyncStorage.clear(); // Logout 컴포넌트 생성시 해당부분 삭제
      return {...state, authenticated: false, user: undefined};
    case 'STOP_LOADING':
      return {...state, isLoading: false};
    default:
      throw new Error(`[ERROR] Unknown Type Error: ${type}`);
  }
};

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userState, defaultDispatch] = useReducer(userReducer, {
    isLoading: true,
    authenticated: false,
    user: undefined,
  });
  const dispatch: Dispatch<Action> = (action: Action) => {
    defaultDispatch(action);
  };
  const {queryUser} = useUser();

  useEffect(() => {
    async function loadUser() {
      const accessToken = await AsyncStorage.getItem('accessToken');
      try {
        if (accessToken) {
          dispatch({
            type: 'LOGIN',
            payload: queryUser!,
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        dispatch({type: 'STOP_LOADING'});
      }
    }
    loadUser();
  }, []);
  return (
    <UserContext.Provider value={{userState, dispatch}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
