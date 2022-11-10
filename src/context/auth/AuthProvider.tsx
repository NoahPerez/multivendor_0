import { useEffect, useReducer } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import axios, { AxiosError } from 'axios';
import { AuthContext, authReducer } from './';

import { IUser } from '../../interfaces';

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

type Props = {
  children?: React.ReactNode;
};

const AUTH_INITIAL_STATE = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      // console.log('USER',data?.user);
      dispatch({
        type: '[Auth] - Login',
        payload: data?.user as IUser,
      });
    }
  }, [status, data]);

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const {
        data: {
          body: { token, user_email },
        },
      } = await axios.post('/api/user/login', {
        username: email,
        password,
      });

      Cookies.set('token', token);
      dispatch({
        type: '[Auth] - Login',
        payload: user_email,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const {
        data: {
          body: { token, user_email },
        },
      } = await axios.post('/api/user/register', {
        email,
        password,
        name,
      });

      Cookies.set('token', token);
      dispatch({
        type: '[Auth] - Login',
        payload: user_email,
      });
      return {
        hasError: false,
      };
    } catch (error: any) {
      console.log(error);
      if (error) {
        return {
          hasError: true,
          message: error.response?.data.body || '',
        };
      }
      return {
        hasError: true,
        message: 'Hubo un error al crear el usuario',
      };
    }
  };

  const logout = () => {
    Cookies.remove('cart');
    Cookies.remove('firstName');
    Cookies.remove('lastName');
    Cookies.remove('address');
    Cookies.remove('address2');
    Cookies.remove('zip');
    Cookies.remove('city');
    Cookies.remove('country');
    Cookies.remove('phone');
    signOut();

    // Cookies.remove('token');
    // router.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginUser,
        registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
