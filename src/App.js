import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';

// Pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'

import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';


const theme = createMuiTheme({ themeFile });

let authenticated;

// Check if there is token present
const token = localStorage.FBIdToken;
if (token) {
  // console.log('Undecoded:', token);
  const decodedToken = jwtDecode(token);
  // console.log('Decoded:', decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true;
  }
}



function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
            <div className="container">
              <Switch>
                  <Route exact path='/' component={home}></Route>
                  <AuthRoute exact path='/login' component={login} authenticated={authenticated} />
                  <AuthRoute exact path='/signup' component={signup} authenticated={authenticated} />
              </Switch>
            </div>
        </Router>
      </div>
    </MuiThemeProvider>

  );
}

export default App;
