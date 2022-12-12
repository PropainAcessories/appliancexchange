const { gql } = require('apollo-server-express');
// Add needed models once built; make queries and mutations for said models; ALSO SEED THE FUCKING DATABASE!!!!!!
const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    seller: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    phoneNumber: String
    seller: ID
    role: String
    orders: [Order]
  }

  type Seller {
    _id: ID
    name: String
    email: String
    address: String
    phoneNumber: String
  }

  type Billing {
    _id: ID
    user: ID
    address: String
    city: String
    state: String
    zipCode: String
    isDefault: Boolean
    updated: String
    created: String
  }

  type Review {
    _id: ID
    product: ID
    user: ID
    rating: Int
    review: String
    isRecommended: Boolean
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    billing: [Billing]
    review: [Review]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    seller: Seller
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, role: String!, password: String!): Auth
    addSeller(name: String!, email: String!, address: String!, phoneNumber: String!): Auth
    addProduct(category: [ID]!): Product
    addOrder(products: [ID]!): Order
    addBilling(user: [ID]!): Billing
    addReview(user: [ID]!, product: [ID]!): Review
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
