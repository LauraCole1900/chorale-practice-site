const { gql } = require("apollo-server-express");

const typeDefs = gql`

type Concert {
  _id: ID!
  name: String!
  date: [String]!
  time: [String]!
  venue: [String]!
  songs: [Song!]
}

type Song {
  title: String!
  composer: [String!]
  concertOrder: Int
  publisher: String
  copyrightDate: String
  practiceTrackUrlsSop: [String!]
  practiceTrackUrlsAlto: [String!]
  practiceTrackUrlsTen: [String!]
  practiceTrackUrlsBass: [String!]
  videoUrls: [String]
}

type User {
  _id: ID!
  fullName: String!
  preferredName: String!
  email: String!
  phone: String
  password: String!
  section: String!
  position: String!
  isAdmin: Boolean!
  isActive: Boolean!
}

type Auth {
  token: ID!
  user: User
}

type Query {
  me: User
  admins: [User]
  allConcerts: [Concert]
  oneUser(email: String!): User
  trueConcerts: [Concert]
}

type Mutation {
  login(email: String! password: String!): Auth
  addUser(fullName: String!, preferredName: String!, email: String!, phone: String, password: String!, section: String!, position: String!, isAdmin: Boolean!, isActive: Boolean!): User
  editUserAdmin(fullName: String!, preferredName: String!, email: String!, password: String!, phone: String, section: String!, position: String! isAdmin: Boolean!, isActive: Boolean!): User
  editUserSelf(fullName: String!, preferredName: String!, email: String!, password: String!, phone: String): Auth
}
`

module.exports = typeDefs;