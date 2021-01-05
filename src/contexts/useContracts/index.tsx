import { useMemo } from 'react';
import {
  LiftoffEngineService,
  LiftoffInsuranceService,
  LiftoffRegistrationService
} from 'services';
import { getContractAddress } from 'utils/networks';
import { ConnectedWeb3ContextProps } from '../connectedWeb3';

export const useContracts = (context: ConnectedWeb3ContextProps) => {
  const { account, library: provider, networkId } = context;
  let liftoffEngineAddress: any;
  let liftoffInsuranceAddress: any;
  let liftoffRegistrationAddress: any;

  if (networkId) {
    liftoffEngineAddress = getContractAddress(networkId, 'liftoffEngine');
    liftoffInsuranceAddress = getContractAddress(networkId, 'liftoffInsurance');
    liftoffRegistrationAddress = getContractAddress(
      networkId,
      'liftoffRegistration'
    );
  }

  const liftoffEngine = useMemo(() => {
    if (networkId) {
      return new LiftoffEngineService(liftoffEngineAddress, provider, account);
    }
  }, [networkId, liftoffEngineAddress, provider, account]);

  const liftoffInsurance = useMemo(() => {
    if (networkId) {
      return new LiftoffInsuranceService(
        liftoffInsuranceAddress,
        provider,
        account
      );
    }
  }, [networkId, liftoffInsuranceAddress, provider, account]);

  const liftoffRegistration = useMemo(() => {
    if (networkId) {
      return new LiftoffRegistrationService(
        liftoffRegistrationAddress,
        provider,
        account
      );
    }
  }, [networkId, liftoffRegistrationAddress, provider, account]);

  return useMemo(
    () => ({
      liftoffEngine,
      liftoffInsurance,
      liftoffRegistration
    }),
    [liftoffEngine, liftoffInsurance, liftoffRegistration]
  );
};

export type Contracts = ReturnType<typeof useContracts>;
