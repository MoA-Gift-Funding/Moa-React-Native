import React, {useContext} from 'react';
import {Dispatch, createContext, useEffect, useReducer} from 'react';
import {User} from '../types/User';

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
      console.log(state);
      return {...state, authenticated: true, user: payload};
    case 'LOGOUT':
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
  useEffect(() => {
    async function loadUser() {
      try {
        // const res = await 사용자 정보 호출, accessToken으로
        // dispatch('LOGIN', res.data);
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
