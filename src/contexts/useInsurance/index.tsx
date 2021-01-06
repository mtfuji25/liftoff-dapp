import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { TokenInsurance, Maybe } from 'utils/types';

const query = gql`
  query GetInsurance($id: ID!) {
    tokenInsurance(id: $id) {
      id
      tokenId
      isRegistered
      isInitialized
      startTime
      totalIgnited
      tokensPerEthWad
      baseXEth
      baseTokenLidPool
      redeemedXEth
      claimedXEth
      claimedTokenLidPool
      dev
      deployed
      pair
      isUnwound
      hasBaseFeeClaimed
    }
  }
`;

type GraphResponse = {
  tokenInsurance: Maybe<TokenInsurance>;
};

export const useInsurance = (tokenSaleId: string) => {
  const [insurance, setInsurance] = useState<Maybe<TokenInsurance>>(null);

  const { data, error, loading } = useQuery<GraphResponse>(query, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: {
      id: tokenSaleId
    }
  });

  useEffect(() => {
    if (data && data.tokenInsurance && tokenSaleId === data.tokenInsurance.id) {
      setInsurance(data.tokenInsurance);
    } else {
      setInsurance(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { insurance, error, loading };
};
