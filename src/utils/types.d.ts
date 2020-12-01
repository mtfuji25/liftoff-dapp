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
  contracts: {};
}

export type NetworkId = 1 | 4;

export type KnownContracts = keyof INetwork['contracts'];

declare global {
  interface Window {
    ethereum: ExternalProvider | JsonRpcFetchFunc;
  }
}
