const { gql } = require('apollo-server-express');
// Start to fill this out AFTER you finish the models otherwise you will fucking regret it.
const typeDefs = gql`
  type Category {
    _id: ID!
    name: String!
  }

  type Product {

  }

  type Order {

  }

  type User {

  }

  type Checkout {
    
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {

  }

  type Mutation {

  }
`;

module.exports = typeDefs;
