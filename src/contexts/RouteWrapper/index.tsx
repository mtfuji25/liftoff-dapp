import React from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';

export const RouterWrapper: React.FC = ({ children }) => {
  return process.env.REACT_APP_ON_IPFS === 'true' ? (
    <HashRouter>{children}</HashRouter>
  ) : (
    <BrowserRouter>{children}</BrowserRouter>
  );
};

export default RouterWrapper;
