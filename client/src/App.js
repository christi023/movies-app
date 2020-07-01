import React from 'react';
import { Route, Switch } from 'react-router-dom';
// Components
import Home from './Components/MovieHome/Home';
import Header from './Components/Layout/Header.jsx';
import Register from './Components/Form/Register';
import SignIn from './Components/Form/SignIn';
//import Movie from './Components/Movie/Movie';

// context
import { UserProvider } from './contexts/UserContext';
//styles
import Particles from 'react-particles-js';

import './App.css';
const ParticleParams = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800,
      },
      size: {
        value: 3,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'repulse',
        },
      },
    },
  },
};

function App() {
  return (
    <div className="App">
      <>
        <UserProvider >
          <Particles className="particles" params={ParticleParams} />

          <Header />
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/register" render={() => <Register />} />
            <Route exact path="/signIn" render={() => <SignIn />} />
          </Switch>
        </UserProvider>
      </>
    </div>
  );
}

export default App;
