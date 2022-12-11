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
  mutation AddOrder($products: [ID]!) {
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
  mutation AddUser(
    $name: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      name: $name
      email: $email
      role: $role
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_SELLER = gql`
  mutation AddSeller(
    $name: String!
    $email: String!
    $address: String!
    $phoneNumber: String!
  ) {
    addSeller(
      name: $name
      email: $email
      address: $address
      phoneNumber: $phonenumber
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation AddProduct($category: [ID]!) {
    addProduct(category: $category) {
      name
      description
      seller
      image
      quantity
      price
      category {
        _id
      }
    }
  }
`;
