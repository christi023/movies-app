import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Components
import Home from './Components/MovieHome/Home';
import Header from './Components/Layout/Header.jsx';
import Register from './Components/Form/Register';
import SignIn from './Components/Form/SignIn';
import Movie from './Components/Movie/Movie';
import ResultBody from './Components/ResultBody/ResultBody.jsx';
import MovieList from './Components/MovieList/MovieList.jsx';
import axios from 'axios';
// context
import UserContext from './contexts/UserContext';
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
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }
      const tokenRes = await axios.post('http://localhost:5000/api/users/tokenIsValid', null, {
        headers: { 'x-auth-token': token },
      });
      console.log(tokenRes.data);

      if (tokenRes.data) {
        const userRes = await axios.get('http://localhost:5000/api/users/auth', {
          headers: { 'x-auth-token': token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <>
      <Particles className="particles" params={ParticleParams} />
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <div className="App">
            <Switch>
              <Route exact path="/" render={() => <Home />} />
              <Route exact path="/register" render={() => <Register />} />
              <Route exact path="/signIn" render={() => <SignIn />} />
              <Route exact path="/movie" render={() => <Movie />} />
              <Route exact path="/results" render={() => <MovieList />} />
              <Route exact path="/savedMovies" render={() => <ResultBody />} />
            </Switch>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
