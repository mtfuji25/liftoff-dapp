import { useMemo } from 'react';

import {
  LiftoffEngineService,
  LiftoffInsuranceService,
  LiftoffRegistrationService
} from '../../services';
import { getContractAddress } from '../../config/networks';

import { ConnectedWeb3Context } from '../connectedWeb3';

export const useContracts = (context: ConnectedWeb3Context) => {
  const { account, library: provider, networkId } = context;

  const liftoffEngineAddress = getContractAddress(networkId, 'liftoffEngine');
  const liftoffEngine = useMemo(() => {
    if (!provider) {
      return null;
    }
    return new LiftoffEngineService(liftoffEngineAddress, provider, account);
  }, [liftoffEngineAddress, provider, account]);

  const liftoffInsuranceAddress = getContractAddress(
    networkId,
    'liftoffInsurance'
  );
  const liftoffInsurance = useMemo(() => {
    if (!provider) {
      return null;
    }
    return new LiftoffInsuranceService(
      liftoffInsuranceAddress,
      provider,
      account
    );
  }, [liftoffInsuranceAddress, provider, account]);

  const liftoffRegistrationAddress = getContractAddress(
    networkId,
    'liftoffRegistration'
  );
  const liftoffRegistration = useMemo(() => {
    if (!provider) {
      return null;
    }
    return new LiftoffRegistrationService(
      liftoffRegistrationAddress,
      provider,
      account
    );
  }, [liftoffRegistrationAddress, provider, account]);

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
