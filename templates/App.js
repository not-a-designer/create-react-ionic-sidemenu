module.exports = `
import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonPage } from '@ionic/react';
import './App.css';
import Menu from './components/Menu/Menu';
import Home from './pages/Home/Home';
import List from './pages/List/List';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';


class App extends Component {
  render() {
    return (
      <Router>
        <IonApp>
          <Menu />
          <IonPage id="main">
          <Switch>
            <Route path="/home" exact component={Home} />
            <Route path="/list" exact component={List} />
            <Route path="/" render={() => <Redirect to="/home" />} />
          </Switch>
          </IonPage>
        </IonApp>
      </Router>
    );
  }
}


export default App;
`;