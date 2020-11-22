import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Launchpad from './Launchpad';
import RocketDetail from './RocketDetail';
import Rockets from './Rockets';
import Header from '../components/Header';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path={'/'} component={Launchpad} exact />
        <Route path={'/rockets'} component={Rockets} exact />
        <Route path={'/rockets/:id'} component={RocketDetail} />
      </Switch>
    </>
  );
}

export default App;
