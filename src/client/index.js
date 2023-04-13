import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';
import './index.css';
import { store } from './redux/store/configureStore';

const client = new ApolloClient({
  uri: process.env.ORIGIN,
  headers: {
    Authorization: `Bearer ${sessionStorage.jwt}`,
  },
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
