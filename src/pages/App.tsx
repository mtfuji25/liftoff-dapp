import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Launchpad from './Launchpad';
import ProjectDetail from './ProjectDetail';
import Rockets from './Rockets';
import Projects from './Projects';
import Header from '../components/Header';
import ConnectWalletModal from 'components/ConnectWalletModal';
import { useWalletModal } from 'contexts';

function App() {
  const [{ isOpen }, toggleModal] = useWalletModal();
  return (
    <>
      <Header />
      <Switch>
        <Route path={'/'} component={Launchpad} exact />
        <Route path={'/rockets'} component={Rockets} exact />
        <Route path={'/projects'} component={Projects} exact />
        <Route path={'/project/:id'} component={ProjectDetail} />
      </Switch>

      <ConnectWalletModal onClose={() => toggleModal(false)} visible={isOpen} />
    </>
  );
}

export default App;
