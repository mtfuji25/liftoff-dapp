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
  graphHttpUri: string;
  graphWsUri: string;
  contracts: {
    liftoffEngine: string;
    liftoffInsurance: string;
    liftoffRegistration: string;
  };
}

export type NetworkId = 1 | 3;

export type KnownContracts = keyof INetwork['contracts'];

export type TokenSale = {
  id: string;
  tokenId: string;
  ipfsHash: string;
  startTime: number;
  endTime: number;
  softCap: string;
  hardCap: string;
  totalSupply: string;
  totalIgnited: string;
  rewardSupply: string;
  dev: string;
  deployed: string;
  pair: string;
  isSparked: boolean;
  name: string;
  symbol: string;
};

export type ProjectKey = 'inactive' | 'active' | 'completed';

export type ProjectConfig = {
  projectName: string;
  tokenTicker: string;
  projectDescription: string;
  websiteLink: string;
  discord: string;
  telegram: string;
  twitter: string;
  facebook: string;
  date: string;
  time: string;
  softCap: string;
  hardCap: string;
  totalSupply: string;
  logo: string;
  openGraph: string;
};

declare global {
  interface Window {
    ethereum: ExternalProvider | JsonRpcFetchFunc;
  }
}
