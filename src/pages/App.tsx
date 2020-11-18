import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Header } from '../components/header';
// @ts-ignore
import { Launchpad } from './Launchpad';
import { RocketDetail } from './RocketDetail';
import { Rockets } from './Rockets';

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
