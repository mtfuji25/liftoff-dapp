import { useState } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { TokenSale } from 'utils/types';

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

type GraphResponse = {
  tokenSales: TokenSale[];
};

type Projects = {
  inactive: TokenSale[];
  active: TokenSale[];
  completed: TokenSale[];
};

export const useProjects = () => {
  const [projects, setProjects] = useState<Projects>({
    inactive: [],
    active: [],
    completed: []
  });

  const { error, loading } = useQuery<GraphResponse>(query, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    onCompleted: (data: GraphResponse) => {
      const currentTime = Math.floor(Date.now() / 1000);
      console.log(currentTime);

      if (data.tokenSales.length === 0) {
        setProjects({ inactive: [], active: [], completed: [] });
      } else {
        setProjects({
          inactive: data.tokenSales.filter(
            (tokenSale) => tokenSale.startTime > currentTime
          ),
          active: data.tokenSales.filter(
            (tokenSale) =>
              tokenSale.startTime <= currentTime &&
              tokenSale.isSparked === false
          ),
          completed: data.tokenSales.filter(
            (tokenSale) => tokenSale.isSparked === true
          )
        });
      }
    }
  });

  return { projects, error, loading };
};
