import React from 'react';
import ReactDOM from 'react-dom';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import {
  ConnectedWeb3,
  ApolloProviderWrapper,
  RouterWrapper,
  ModalProvider
} from './contexts';
import App from './pages/App';
import ThemeProvider, { ThemedGlobalStyle } from './theme';
import reportWebVitals from './reportWebVitals';

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <ThemedGlobalStyle />
      <Web3ReactProvider getLibrary={getLibrary}>
        <ConnectedWeb3>
          <ApolloProviderWrapper>
            <ModalProvider>
              <RouterWrapper>
                <App />
              </RouterWrapper>
            </ModalProvider>
          </ApolloProviderWrapper>
        </ConnectedWeb3>
      </Web3ReactProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
