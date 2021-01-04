import { useState } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const query = gql`
  query GetProjects {
    tokenSales(orderBy: startTime, orderDirection: asc) {
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

export type GraphResponseTokenSale = {
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

type GraphResponse = {
  tokenSales: GraphResponseTokenSale[];
};

export const useProjects = () => {
  const [projects, setProjects] = useState<GraphResponseTokenSale[]>([]);

  const { error, loading } = useQuery<GraphResponse>(query, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    onCompleted: (data: GraphResponse) => {
      if (data.tokenSales.length === 0) {
        setProjects([]);
      } else {
        setProjects(data.tokenSales);
      }
    }
  });

  return { projects, error, loading };
};
