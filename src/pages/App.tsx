import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Launchpad from './Launchpad';
import ProjectDetail from './ProjectDetail';
import Projects from './Projects';
import Header from '../components/Header';

import { useConnectedWeb3Context } from '../contexts';

function App() {
  const { networkId } = useConnectedWeb3Context();

  return (
    <>
      <Header />
      {!!networkId && (
        <Switch>
          <Route path={'/'} component={Launchpad} exact />
          <Route path={'/projects'} component={Projects} exact />
          <Route path={'/project/:id'} component={ProjectDetail} />
        </Switch>
      )}
    </>
  );
}

export default App;
