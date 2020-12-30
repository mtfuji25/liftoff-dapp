export interface IToken {
  address: string;
  decimals: number;
  symbol: string;
  image?: string;
  volume?: string;
}

export type Maybe<T> = T | null;

export interface INetwork {
  label: string;
  url: string;
  contracts: {
    liftoffEngine: string;
    liftoffInsurance: string;
    liftoffRegistration: string;
  };
}

export type NetworkId = 1 | 3;

export type KnownContracts = keyof INetwork['contracts'];

declare global {
  interface Window {
    ethereum: ExternalProvider | JsonRpcFetchFunc;
  }
}
