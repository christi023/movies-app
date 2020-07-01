import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import userContext from '../../contexts/UserContext';
// styles
import '../Layout/Header.css';

export default function AuthOptions() {
  const { userData, setUserData } = useContext(userContext);

  const history = useHistory();

  const register = () => history.push('/register');
  const signIn = () => history.push('/signIn');
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem(('auth-token', ''));
  };
  return (
    <nav className="auth-options">
      {userData.user ? ( // if user exists returns logout button
        <button onClick={logout}>Log Out</button>
      ) : (
        <>
          <button onClick={register}>Register</button>
          <button onClick={signIn}>Sign In</button>
        </>
      )}
    </nav>
  );
}
