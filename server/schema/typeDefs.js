const { gql } = require("apollo-server-express");

const typeDefs = gql`

type Concert {
  _id: ID!
  name: String!
  date: [String!]!
  time: [String!]!
  venue: [String!]!
  signUp: String
  addlMaterials: [String!]
  songs: [Song!]
}

type Song {
  songId: ID!
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
  firstName: String!
  lastName: String!
  preferredName: String!
  birthday: String!
  email1: String!
  email2: String
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

input SongInput {
  songId: ID!
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

type Query {
  me(_id: ID!): User
  meProfile(_id: ID!): User
  admins: [User]
  allConcerts: [Concert]
  allUsers: [User]
  oneConcert(_id: ID!): Concert
  oneUser(_id: ID!): User
  oneUserAdmin(_id: ID!): User
  trueConcerts: [Concert]
}

type Mutation {
  login(email: String! password: String!): Auth

  addConcert(name: String!, date: [String!]! time: [String!]!, venue: [String!]! signUp: String, addlMaterials: [String!]): Concert

  addUser(fullName: String!, firstName: String!, lastName: String!, preferredName: String!, birthday: String, email1: String!, email2: String, password: String!, phone1: String, phone1Type: String, phone2: String, phone2Type: String, phone3: String, phone3Type: String, section: String!, position: String!, streetAddress: String, city: String, state: String, zipCode: String, isAdmin: Boolean!, isActive: Boolean!): User

  deleteConcert(_id: ID!): Concert

  deleteUser(_id: ID!): User

  editConcertBasic(_id: ID!, name: String!, date: [String!]! time: [String!]!, venue: [String!]! signUp: String, addlMaterials: [String!]): Concert

  editConcertRepertoire(_id: ID!, songs: SongInput!): Concert

  editUserAdmin(_id: ID!, fullName: String!, firstName: String!, lastName: String!, preferredName: String!, birthday: String, email1: String, email2: String, password: String, phone1: String, phone1Type: String, phone2: String, phone2Type: String, phone3: String, phone3Type: String, section: String!, position: String!, streetAddress: String, state: String, zipCode: String, isAdmin: Boolean!, isActive: Boolean!): User

  editUserSelf(_id: ID!, fullName: String!, firstName: String!, lastName: String!, preferredName: String!, birthday: String, password: String!, email2: String, phone1: String, phone1Type: String, phone2: String, phone2Type: String, phone3: String, phone3Type: String, streetAddress: String, city: String, state: String, zipCode: String): Auth
}
`

module.exports = typeDefs;