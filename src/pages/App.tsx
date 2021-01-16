import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Launchpad from './Launchpad';
import ProjectDetail from './ProjectDetail';
import Projects from './Projects';
import Faq from './Faq';
import Header from '../components/Header';
import ConnectWalletModal from 'components/ConnectWalletModal';
import { useTxModal, useWalletModal } from 'contexts';
import TxModal from 'components/TxModal';

function App() {
  const [{ isOpen }, toggleModal] = useWalletModal();
  const [{ txStatus, txHash }, onClose] = useTxModal();
  return (
    <>
      <Header />
      <Switch>
        <Route path={'/'} component={Launchpad} exact />
        <Route path={'/projects'} component={Projects} exact />
        <Route path={'/faq'} component={Faq} exact />
        <Route
          path={'/project/:symbol-:id'}
          render={(props) => (
            <ProjectDetail id={props.match.params.id as string} />
          )}
        />
      </Switch>
      <ConnectWalletModal onClose={() => toggleModal(false)} visible={isOpen} />
      <TxModal
        txStatus={txStatus}
        txHash={txHash}
        onClose={onClose}
      />
    </>
  );
}

export default App;
