import { useState } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { TokenSale } from 'utils/types';
import { projectStatus } from 'utils';

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
      if (data.tokenSales.length === 0) {
        setProjects({ inactive: [], active: [], completed: [] });
      } else {
        const newProjects = data.tokenSales.reduce(
          (sales, tokenSale) => {
            const status = projectStatus(tokenSale);
            return {
              ...sales,
              [status]: [...sales[status], tokenSale]
            };
          },
          {
            inactive: [] as TokenSale[],
            active: [] as TokenSale[],
            completed: [] as TokenSale[]
          }
        );

        setProjects(newProjects);
      }
    }
  });

  return { projects, error, loading };
};
