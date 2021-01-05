import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Ignitor, Maybe } from 'utils/types';

const query = gql`
  query GetIgniterInfo($id: ID!) {
    ignitor(id: $id) {
      id
      address
      ignited
      hasClaimed
      hasRefunded
    }
  }
`;

type GraphResponse = {
  ignitor: Maybe<Ignitor>;
};

export const useIgniteInfo = (tokenSaleId: string, address: Maybe<string>) => {
  const [igniteInfo, setIgniteInfo] = useState<Maybe<Ignitor>>(null);

  const id = `ignite_${tokenSaleId}_${address ? address.toLowerCase() : ''}`;

  const { data, error, loading } = useQuery<GraphResponse>(query, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: {
      id
    }
  });

  useEffect(() => {
    if (
      data &&
      data.ignitor &&
      data.ignitor.address.toLowerCase() === address?.toLowerCase()
    ) {
      setIgniteInfo(data.ignitor);
    } else {
      setIgniteInfo(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { igniteInfo, error, loading };
};
