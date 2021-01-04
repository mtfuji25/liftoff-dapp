import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import Launchpad from './Launchpad';
import ProjectDetail from './ProjectDetail';
import Rockets from './Rockets';
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
          <Route path={'/rockets'} component={Rockets} exact />
          <Route path={'/projects'} component={Projects} exact />
          <Route path={'/project/:id'} component={ProjectDetail} />
        </Switch>
      )}
      <ReactTooltip html={true} />
    </>
  );
}

export default App;
