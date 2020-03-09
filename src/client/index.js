import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';
import './index.css';
import { store } from './redux/store/configureStore';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  headers: {
    Authorization: `Bearer ${sessionStorage.jwt}`,
  },
});

ReactDOM.render(
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
  document.getElementById('app'),
);

module.hot.accept();
