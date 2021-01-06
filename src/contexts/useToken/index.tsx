import { useMemo } from 'react';
import { ERC20Service } from '../../services/erc20';
import { ConnectedWeb3ContextProps } from '../connectedWeb3';

export const useToken = (
  context: ConnectedWeb3ContextProps,
  address: Maybe<string>
) => {
  const { account, library: provider, networkId } = context;

  const token = useMemo(() => {
    if (networkId && !!address) {
      return new ERC20Service(provider, account, address);
    }
  }, [networkId, address, provider, account]);

  return { token };
};
