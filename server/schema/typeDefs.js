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
  password: String!
  phone1: String
  phone1Type: String
  phone2: String
  phone2Type: String
  phone3: String
  phone3Type: String
  section: String!
  position: String!
  streetAddress: String
  city: String
  state: String
  zipCode: String
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
  allUsers: [User]
  oneUser(email: String!): User
  trueConcerts: [Concert]
}

type Mutation {
  login(email: String! password: String!): Auth

  addUser(fullName: String!, preferredName: String!, email: String!, phone1: String, phone1Type: String, phone2: String, phone2Type: String, phone3: String, phone3Type: String, password: String!, section: String!, position: String!, isAdmin: Boolean!, isActive: Boolean!): User

  editUserAdmin(fullName: String!, preferredName: String!, email: String!, password: String!, phone1: String, phone1Type: String, phone2: String, phone2Type: String, phone3: String, phone3Type: String, section: String!, position: String! isAdmin: Boolean!, isActive: Boolean!): User

  editUserSelf(fullName: String!, preferredName: String!, email: String!, password: String!, phone1: String, phone1Type: String, phone2: String, phone2Type: String, phone3: String, phone3Type: String, ): Auth
}
`

module.exports = typeDefs;