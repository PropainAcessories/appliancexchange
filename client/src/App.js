import React from 'react';
import NavBar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { setContext } from '@apollo/client/link/context';
import OrderPage from './pages/OrderPage';
import Success from './pages/Success';
import SingleItem from './pages/SingleItem';
import Nothing from './pages/Nothing';

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

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <NavBar />
        <Routes>
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
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
