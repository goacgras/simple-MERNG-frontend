//NPM INSTALL GRAPHQL AS WELL
// import React from 'react';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';

import App from './App';

const httpLink = createHttpLink({
    // uri: 'http://localhost:5000/'
    uri: 'https://mysterious-plateau-03771.herokuapp.com/'
});

const authLink = setContext(() => {
    const token = localStorage.getItem('idToken');
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true
});

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);
