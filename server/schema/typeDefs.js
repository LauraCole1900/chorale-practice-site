const { gql } = require("apollo-server-express");

const typeDefs = gql`

type Concert {
  _id: ID!
  name: String!
  date: [String]!
  time: [String]!
  venue: [String]!
  songs: [Song]
}

type Song {
  title: String!
  composer: String!
  publisher: String
  copyrightDate: String
  practiceTrackUrlSop: String
  practiceTrackUrlAlto: String
  practiceTrackUrlTen: String
  practiceTrackUrlBass: String
  videoUrl1: String
  videoUrl2: String
  videoUrl3: String
}

type User {
  _id: ID!
  fullName: String!
  email: String!
  phone: String
  password: String!
  section: String!
  position: String!
  isAdmin: Boolean!
}

type Auth {
  token: ID!
  user: User
}

type Query {
  me: User
  concerts: [Concert]
  trueConcerts: [Concert]
  admins: [User]
}

type Mutation {
  login(email: String! password: String!): Auth
  addUser(fullName: String!, email: String!, phone: String, password: String!, section: String!, position: String!, isAdmin: Boolean!): Auth
}
`

module.exports = typeDefs;