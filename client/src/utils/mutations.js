import { gql } from '@apollo/client';
// TO DO ADD STUFF SO GUYS CAN SELL SHIT
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
        }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
            name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $name: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      name: $name
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;
