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

export const ADD_CATEGORY = gql`
  mutation Mutation($name: String) {
    addCategory(name: $name) {
      _id
      name
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
  mutation addBilling(
    $user: ID!
    $address: String!
    $city: String!
    $state: String!
    $zipCode: String!
    $isDefault: Boolean!
    ) {
    addBilling(
      user: $user
      address: $address
      city: $city
      state: $state
      zipCode: $zipCode
      isDefault: $isDefault
      ) {
        token {
          user {
            _id
          }
        }
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
    $products: [ID]
    $phoneNumber: String!
  ) {
    addSeller(
      name: $name
      email: $email
      address: $address
      products: $products
      phoneNumber: $phoneNumber
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation addReview(
    $user: [ID]!
    $product: [ID]!
    $rating: Int!
    $review: String!
    $isRecommended: Boolean!
    ) {
    addReview(
      user: $user
      product: $product
      rating: $rating
      review: $review
      isRecommended: $isRecommended
    )
  }
`;

export const ADD_PRODUCT = gql`
mutation Mutation(
  $category: ID,
  $name: String,
  $description: String,
  $seller: String,
  $image: String,
  $price: Int,
  $quantity: Int
  ) {
  addProduct(
    category: $category,
    name: $name,
    description: $description,
    seller: $seller,
    image: $image,
    price: $price,
    quantity: $quantity) {
    _id
    name
    description
    seller
    image
    price
    quantity
    category {
      _id
      name
    }
  }
}
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($ID: ID) {
    deleteProduct(ID: $ID)
  }
`;
