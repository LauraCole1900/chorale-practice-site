const { gql } = require("apollo-server-express");

const typeDefs = gql`

type Event {
  _id: ID!
  name: String!
  date: [String]!
  time: [String]!
  venue: [String]!
  songs: [Song]
}

type User {
  _id: ID!
  fullName: String!
  email: String!
  phone: String
  section: String!
  position: String!
  isAdmin: Boolean!
}

type Query {
  me: User
  events: [Event]
}

type Mutation {
  login(email: String! password: String!): Auth
}
`

module.exports = typeDefs;