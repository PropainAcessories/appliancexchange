import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
query Products($category: ID) {
  products(category: $category) {
    _id
    name
    description
    seller
    image
    quantity
    price
    category {
      name
    }
    review {
      _id
      rating
      review
      isRecommended
      user
    }
  }
}
`;

export const QUERY_REVIEW = gql`
  query Review($product: ID) {
    review(product: $product) {
      _id
      product
      rating
      review
      isRecommended
      user
    }
  }
`;

export const QUERY_BILLING = gql`
  query Billing($user: ID) {
    billing(user: $user) {
      _id
      user
      address
      city
      zipCode
      state
      isDefault
      created
      updated
    }
  }
`;

export const QUERY_SELLER = gql `
  query Seller {
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
  query Products{
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
  query Categories {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  query User {
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
