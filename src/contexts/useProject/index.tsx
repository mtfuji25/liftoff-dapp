import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { TokenSale, Maybe } from 'utils/types';

const query = gql`
  query GetProject($id: ID!) {
    tokenSale(id: $id) {
      id
      tokenId
      ipfsHash
      startTime
      endTime
      softCap
      hardCap
      totalSupply
      totalIgnited
      rewardSupply
      dev
      deployed
      pair
      isSparked
      name
      symbol
    }
  }
`;

type GraphResponse = {
  tokenSale: Maybe<TokenSale>;
};

export const useProject = (tokenSaleId: string) => {
  const [project, setProject] = useState<Maybe<TokenSale>>(null);

  const { data, error, loading, refetch } = useQuery<GraphResponse>(query, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: {
      id: tokenSaleId
    }
  });

  useEffect(() => {
    if (data && data.tokenSale && tokenSaleId === data.tokenSale.id) {
      setProject(data.tokenSale);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { project, error, loading, refetch };
};
