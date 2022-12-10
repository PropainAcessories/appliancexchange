import React from 'react';
import NavBar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { setContext } from '@apollo/client/link/context';
import OrderPage from './pages/OrderPage';
import Success from './pages/Success';
import SingleItem from './pages/SingleItem';
import Nothing from './pages/Nothing';
// TODO Import something from GlobalState after you make it.
import { StoreProvider } from './utils/GlobalState';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import './App.css';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
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
// Routes here
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <NavBar />
          <StoreProvider>
            <Switch>
              <Route
              path='/'
              element={<Home />}
              />
              <Route
              path='/login'
              element={<Login />}
              />          
              <Route
              path='/signup'
              element={<Signup />}
              />
              <Route
              path='/success'
              element={<Success />}
              />
              <Route
              path='/Orders'
              element={<OrderPage />}
              />
              <Route
              path='/products/:id'
              element={<SingleItem />}
              />
              <Route
              path='*'
              element={<Nothing />}
              />
            </Switch>
          </StoreProvider>
        </div>  
      </Router>
    </ApolloProvider>
  );
}

export default App;
