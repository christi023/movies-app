import React from 'react';
import { Route } from 'react-router-dom';
// Components

import SignIn from '../Form/SignIn';

export default function Home() {
  return (
    <div>
      <Route exact path="/" render={() => <SignIn />} />
    </div>
  );
}
