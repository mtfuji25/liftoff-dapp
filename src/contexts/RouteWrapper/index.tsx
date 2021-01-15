import React from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';

export const RouterWrapper: React.FC = ({ children }) => {
  // return process.env.REACT_APP_ON_IPFS === 'true' ? (
  //   <HashRouter>{children}</HashRouter>
  // ) : (
  //   <BrowserRouter>{children}</BrowserRouter>
  // );

  // NOTE: "homepage": "./", Due to this line in package.json, BrowserRouter not working, Use only HashRouter
  return <HashRouter>{children}</HashRouter>;
};

export default RouterWrapper;
