import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';

// import ApolloClient from 'apollo-boost';
// import { ApolloProvider } from 'react-apollo';

import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

// import { createNetworkInterface } from 'react-apollo';

import Routes from './components/routes/index';
import './index.scss';

const httpLink = new createHttpLink({
    uri: "http://localhost:5000/graphql"
})

const authLink = setContext((req, pre) => {
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

const App = () => (
    <div className="app">
        <Routes />
    </div>
)


ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
