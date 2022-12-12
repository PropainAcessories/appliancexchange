import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      seller
      price
      quantity
      image
      category {
        _id
      }
    }
  }
`;

export const QUERY_SELLER = gql `
  query{
    seller {
      _id
      address
      email
      name
      phoneNumber
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  query {
    products {
      _id
      name
      description
      seller
      price
      quantity
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  query {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  query {
    user {
      firstName
      lastName
      email
      role
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          seller
          price
          quantity
          image
        }
      }
    }
  }
`;
