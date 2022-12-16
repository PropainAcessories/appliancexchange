const { gql } = require('apollo-server-express');

const typeDefs = gql`
  enum RoleType {
    ROLE_MEMBER
    ROLE_ADMIN
    ROLE_SELLER
  }
  type Category {
    _id: ID!
    name: String
  }
  type Product {
    _id: ID!
    name: String!
    description: String!
    seller: String
    image: String!
    quantity: Int!
    price: Float!
    category: Category
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
    role: RoleType
    orders: [Order]
    billing: Billing
  }
  type Seller {
    _id: ID!
    name: String!
    email: String!
    address: String!
    products: [Product]
    phoneNumber: String!
  }
  type Billing {
    _id: ID!
    user: User!
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
    product: Product!
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
    billing: Billing
    review(product: ID): [Review]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    seller(_id: ID!): Seller
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }
  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addSeller(name: String!, email: String!, address: String!, products: [ID], phoneNumber: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    addCategory(name: String): Category
    deleteCategory(_id: ID): Category
    addBilling(user: ID): Billing!
    addOrder(products: [ID]!): Order
    deleteOrder(products: [ID]!): Order
    addProduct(category: ID, name: String, description: String, seller: String, image: String, price: Float, quantity: Int): Product
    deleteProduct(product: [ID]!): ID! 
    addReview(user: [ID], product: [ID]): Review
    updateProduct(_id: ID!, quantity: Int!): Product
  }
`;

module.exports = typeDefs;
