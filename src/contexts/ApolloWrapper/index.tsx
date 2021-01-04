import React, { useMemo } from 'react';
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { getGraphUris } from 'utils/networks';

import { useConnectedWeb3Context } from '../connectedWeb3';

export const ApolloProviderWrapper: React.FC = ({ children }) => {
  const { networkId } = useConnectedWeb3Context();
  const client = useMemo(() => {
    const { httpUri, wsUri } = getGraphUris(networkId || 3);

    const httpLink = new HttpLink({
      uri: httpUri
    });

    const wsLink = new WebSocketLink({
      uri: wsUri,
      options: {
        reconnect: true
      }
    });

    const splitLink = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      httpLink
    );

    return new ApolloClient({
      link: splitLink,
      cache: new InMemoryCache()
    });
  }, [networkId]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
