import React from 'react';
import { useHistory } from 'react-router-dom';

// styles
import '../Layout/Header.css';

export default function AuthOptions() {
  const history = useHistory();

  const register = () => history.push('/register');
  const signIn = () => history.push('/signIn');
  return (
    <div className="auth-options">
      <button onClick={register}>Register</button>
      <button onClick={signIn}>Sign In</button>
    </div>
  );
}
