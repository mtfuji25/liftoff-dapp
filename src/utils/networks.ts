import { entries } from 'utils/type-utils';
import { INetwork, KnownContracts, NetworkId } from 'utils/types';
import {
  MAINNET_SUBGRAPH_HTTP,
  MAINNET_SUBGRAPH_WS,
  ROPSTEN_SUBGRAPH_HTTP,
  ROPSTEN_SUBGRAPH_WS
} from 'config/constants';

export const networkIds = {
  MAINNET: 1,
  ROPSTEN: 3
} as const;

const INFURA_PROJECT_ID = 'f9df69e5cfef48799e2d20eaa7d15697';

const networks: { [K in NetworkId]: INetwork } = {
  [networkIds.MAINNET]: {
    label: 'Mainnet',
    url: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
    graphHttpUri: MAINNET_SUBGRAPH_HTTP,
    graphWsUri: MAINNET_SUBGRAPH_WS,
    contracts: {
      xEth: '0x29B109625ac15BC4577d0b70ACB9e4E27F7C07E8',
      xLocker: '0xAA13f1Fc73baB751Da08930007D4D847EeEafAA2',
      liftoffEngine: '0xEcBDC53216769bC2E854BcE9cd21183CDE28df76',
      liftoffInsurance: '0xea723A65fB681868DaBd6456ae96A92B677a8F27',
      liftoffRegistration: '0x1c5b37c07d2aa84579bD72e9266f218cc865c8cB'
    }
  },
  [networkIds.ROPSTEN]: {
    label: 'Ropsten',
    url: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
    graphHttpUri: ROPSTEN_SUBGRAPH_HTTP,
    graphWsUri: ROPSTEN_SUBGRAPH_WS,
    contracts: {
      xEth: '0xA2F864C1c1a27f257c10FfBCFAeCa252B5610B4b',
      xLocker: '0x45a0A95Df3DAE8A9741328a0b7ce04DF55C22124',
      liftoffEngine: '0xD0bf1284B80e526ac8Fe672412cAd25583513ccd',
      liftoffInsurance: '0xd50f6238EeC61BE7C11d9b3C41633d70C4F97f9c',
      liftoffRegistration: '0x47e81CA121704626e0938c27147ad52C880eFdd5'
    }
  }
};

export const supportedNetworkIds = Object.keys(networks).map(
  Number
) as NetworkId[];

export const supportedNetworkURLs = entries(networks).reduce<{
  [networkId: number]: string;
}>(
  (acc, [networkId, network]) => ({
    ...acc,
    [networkId]: network.url
  }),
  {}
);

export const validNetworkId = (
  networkId: number | undefined
): networkId is NetworkId => {
  return networks[networkId as NetworkId] !== undefined;
};

export const getContractAddress = (
  networkId: number | undefined,
  contract: KnownContracts
) => {
  if (!validNetworkId(networkId)) {
    throw new Error(`Unsupported network id: '${networkId}'`);
  }
  return networks[networkId].contracts[contract];
};

export const getContractAddressName = (networkId: number) => {
  const networkName = Object.keys(networkIds).find(
    (key) => (networkIds as any)[key] === networkId
  );
  const networkNameCase =
    networkName &&
    networkName.substr(0, 1).toUpperCase() +
      networkName.substr(1).toLowerCase();
  return networkNameCase;
};

export const getGraphUris = (
  networkId: number | undefined
): { httpUri: string; wsUri: string } => {
  if (!validNetworkId(networkId)) {
    throw new Error(`Unsupported network id: '${networkId}'`);
  }

  const httpUri = networks[networkId].graphHttpUri;
  const wsUri = networks[networkId].graphWsUri;
  return { httpUri, wsUri };
};

export const TokenEthereum = {
  decimals: 18,
  symbol: 'ETH'
};
