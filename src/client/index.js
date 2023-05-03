import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';
import './index.css';
import { store } from './redux/store/configureStore';

const httpLink = createHttpLink({
  uri: process.env.ORIGIN,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = sessionStorage.getItem('jwt');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const container = document.getElementById('app');
const root = ReactDOMClient.createRoot(container);

root.render(
  <>
    <CssBaseline />
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </ApolloProvider>
  </>,
);

module.hot.accept();
