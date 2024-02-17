import React, {useContext, useMemo} from 'react';
import {Dispatch, createContext, useEffect, useReducer} from 'react';
import {User} from '../types/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MoaHttpClient from '../apis/MoaHttpClient';
import useUser from '../hooks/user/useUser';

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
  client: MoaHttpClient;
}

export const UserContext = createContext<UserContextProps>({
  userState: {
    authenticated: false,
    user: undefined,
    isLoading: true,
  },
  dispatch: () => {},
  client: new MoaHttpClient(),
});

const userReducer = (state: State, {type, payload}: Action) => {
  switch (type) {
    case 'LOGIN':
      return {...state, authenticated: true, user: payload};
    case 'LOGOUT':
      AsyncStorage.clear();
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

  const httpClient = useMemo(() => {
    const client = new MoaHttpClient();
    return client;
  }, []);

  const {getUserQuery} = useUser();

  useEffect(() => {
    async function loadUser() {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        const user = await getUserQuery();
        dispatch({
          type: 'LOGIN',
          payload: user,
        });
      }
    }
    loadUser();
  }, [getUserQuery]);

  return (
    <UserContext.Provider value={{userState, dispatch, client: httpClient}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
