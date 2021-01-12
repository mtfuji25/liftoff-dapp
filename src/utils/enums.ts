export enum ConnectorNames {
  Injected = 'injected',
  WalletConnect = 'walletconnect',
  WalletLink = 'walletlink'
}

export enum TxStatus {
  TX_INITIAL = 0,
  TX_ERROR = 1,
  TX_SENT = 2,
  TX_SUCCESS = 3,
}