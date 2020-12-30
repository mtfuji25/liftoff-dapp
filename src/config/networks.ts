import { entries } from 'utils/type-utils';
import { INetwork, KnownContracts, NetworkId } from 'utils/types';

export const networkIds = {
  MAINNET: 1,
  ROPSTEN: 3
} as const;

const INFURA_PROJECT_ID = 'f9df69e5cfef48799e2d20eaa7d15697';

const networks: { [K in NetworkId]: INetwork } = {
  [networkIds.MAINNET]: {
    label: 'Mainnet',
    url: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
    contracts: {
      liftoffEngine: '',
      liftoffInsurance: '',
      liftoffRegistration: ''
    }
  },
  [networkIds.ROPSTEN]: {
    label: 'Ropsten',
    url: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
    contracts: {
      liftoffEngine: '0xEcBDC53216769bC2E854BcE9cd21183CDE28df76',
      liftoffInsurance: '0xea723A65fB681868DaBd6456ae96A92B677a8F27',
      liftoffRegistration: '0x1c5b37c07d2aa84579bD72e9266f218cc865c8cB'
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

const validNetworkId = (
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

export const TokenEthereum = {
  decimals: 18,
  symbol: 'ETH'
};
