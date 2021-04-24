import React, { useEffect, useState } from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { googleSignIn } from '../../../actions/userState';

export interface GoogleLoginProps {
  color: string;
  next: () => void;
}

// 86193367343-bp459vm9mul6frp7luvfec3hulvg9b0i.apps.googleusercontent.com
function GoogleLogin({ color, next }: GoogleLoginProps) {
  const { googleAccessGiven } = useSelector(state => state.user);
  const [isLoading, setisLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const signIn = async () => {
    setisLoading(true);
    dispatch(googleSignIn());
  };

  useEffect(() => {
    if (googleAccessGiven) {
      setisLoading(false);
    }
    GoogleSignin.isSignedIn().then(authenticated => {
      setIsAuthenticated(authenticated);
    });
  }, [googleAccessGiven]);

  if (isAuthenticated) {
    return (
      <Button mode="contained" icon="done-all" color={color} onPress={next}>
        Done
      </Button>
    );
  }
  return (
    <GoogleSigninButton
      style={{ width: 192, height: 48 }}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={signIn}
      disabled={isLoading}
    />
  );
}

export default GoogleLogin;
