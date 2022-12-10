const { gql } = require('apollo-server-express');
// Add needed models once built; make queries and mutations for said models; ALSO SEED THE FUCKING DATABASE!!!!!!
const typeDefs = gql`
  type Category {
    _id: ID
    name: String!
  }

  type Product {
    _id: ID
    name: String
    description: String
    seller: String
    image: String
    price: Float
    quantity: Int
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type User {
    _id: ID
    name: String
    email: String
    orders: [Order]
  }

  type Seller {}

  type Sale {}

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    products(category: ID, name: String, seller: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(name: String!, lastName: String, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    addProduct()
    updateUser(name: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
