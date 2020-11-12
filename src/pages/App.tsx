import React from 'react';
import styled from 'styled-components'
import {Switch, Route} from 'react-router-dom'
import { Footer } from '../components/footer';
import { Header } from '../components/header';
// @ts-ignore
import { Launchpad } from './Launchpad';
import { RocketDetail } from './RocketDetail';
import { Rockets } from './Rockets';

const StyledMain = styled.main`
  padding: 2rem;
`

function App() {
  return (
    <>
      <Header />
      <StyledMain>
        <Switch>
          <Route path={'/'} component={Launchpad} exact/>
          <Route path={'/rockets'} component={Rockets} exact/>
          <Route path={'/rockets/:id'} component={RocketDetail} />
        </Switch>
      </StyledMain>
      <Footer text={'© 2020 Liquidity Dividends Protocol. All rights reserved.'}/>
    </>
  );
}

export default App;
