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

export const ADD_BILLING = gql`
  mutation addBilling($user: [ID]!) {
    addBilling(user: $user) {
      _id
      address
      city
      state
      zipCode
      created
      updated
      user
      isDefault
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
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

export const ADD_SELLER = gql`
  mutation addSeller(
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

export const ADD_REVIEW = gql`
  mutation addReview($user: [ID]!, $product: [ID]!) {
    addReview(user: $user, product: $product) {
      _id
      product
      rating
      review
      user
      isRecommended
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation addProduct($category: [ID]!) {
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
