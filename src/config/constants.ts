export const STORAGE_KEY_SETTINGS = 'settings';
export const STORAGE_KEY_CONNECTOR = 'CONNECTOR';
export const MAINNET_SUBGRAPH_HTTP =
  process.env.REACT_APP_MAINNET_SUBGRAPH_HTTP ||
  'https://api.thegraph.com/subgraphs/name/liaojikunwork/liftoff';
export const MAINNET_SUBGRAPH_WS =
  process.env.REACT_APP_MAINNET_SUBGRAPH_WS ||
  'wss://api.thegraph.com/subgraphs/name/liaojikunwork/liftoff';

export const ROPSTEN_SUBGRAPH_HTTP =
  process.env.REACT_APP_ROPSTEN_SUBGRAPH_HTTP ||
  'https://api.thegraph.com/subgraphs/name/liaojikunwork/liftoff-ropsten';
export const ROPSTEN_SUBGRAPH_WS =
  process.env.REACT_APP_ROPSTEN_SUBGRAPH_WS ||
  'wss://api.thegraph.com/subgraphs/name/liaojikunwork/liftoff-ropsten';
