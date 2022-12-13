const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID!
    name: String!
  }

  type Product {
    _id: ID!
    name: String!
    description: String!
    seller: String!
    image: String!
    quantity: Int!
    price: Float!
    category: Category!
    review: [Review]
  }

  type Order {
    _id: ID
    purchaseDate: String!
    products: [Product]!
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String
    seller: [Seller]
    role: RoleType
    orders: [Order]
    billing: [Billing]
  }

  type Seller {
    _id: ID!
    name: String!
    email: String!
    address: String!
    phoneNumber: String!
  }

  type Billing {
    _id: ID!
    user: [User]!
    address: String!
    city: String!
    state: String!
    zipCode: String!
    isDefault: Boolean
    updated: String
    created: String
  }

  type Review {
    _id: ID!
    product: [Product]!
    user: ID!
    rating: Int!
    review: String!
    isRecommended: Boolean!
  }

  type Checkout {
    session: ID!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    categories: [Category]
    billing: [Billing]
    review(products: [ID]!): [Review]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    seller: Seller
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addSeller(name: String!, email: String!, address: String!, phoneNumber: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    addBilling(user: [ID]!): Billing!

    addOrder(products: [ID]!): Order!
    addProduct(category: [ID]!): Product!
    
    deleteProduct(product: [ID]!): ID!
    
    addReview(user: [ID]!, product: [ID]!): Review!
    updateProduct(_id: ID!, quantity: Int!): Product
  }
`;

module.exports = typeDefs;
