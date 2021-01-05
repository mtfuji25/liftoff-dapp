import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Ignitor, Maybe } from 'utils/types';

// NOTE: use tokenSaleId & wallet address instead of generating id because of address case sensitive
const query = gql`
  query GetIgniterInfo($tokenSale: string!, $address: string!) {
    ignitors(where: { tokenSale: $tokenSale, address: $address }) {
      id
      address
      ignited
      hasClaimed
      hasRefunded
    }
  }
`;

type GraphResponse = {
  ignitors: Ignitor[];
};

export const useIgniteInfo = (tokenSaleId: string, address: Maybe<string>) => {
  const [igniteInfo, setIgniteInfo] = useState<Maybe<Ignitor>>(null);

  const { data, error, loading } = useQuery<GraphResponse>(query, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: {
      tokenSale: tokenSaleId,
      address: address
    }
  });

  useEffect(() => {
    if (
      data &&
      data.ignitors &&
      data.ignitors.length > 0 &&
      data.ignitors[0].address.toLowerCase() === address?.toLowerCase()
    ) {
      setIgniteInfo(data.ignitors[0]);
    } else {
      setIgniteInfo(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { igniteInfo, error, loading };
};
