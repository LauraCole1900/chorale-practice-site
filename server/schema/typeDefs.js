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

type Post {
  _id: ID!
  postType: String!
  postDate: String!
  postBody: String!
}

type Song {
  songId: ID!
  title: String!
  composer: [String!]
  concertOrder: Int
  publisher: String
  copyrightDate: String
  practiceTrackUrlsSopSlow: [String!]
  practiceTrackUrlsAltoSlow: [String!]
  practiceTrackUrlsTenSlow: [String!]
  practiceTrackUrlsBassSlow: [String!]
  practiceTrackUrlsSopATempo: [String!]
  practiceTrackUrlsAltoATempo: [String!]
  practiceTrackUrlsTenATempo: [String!]
  practiceTrackUrlsBassATempo: [String!]
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
  allPosts: [Post]
  allUsers: [User]
  oneConcert(_id: ID!): Concert
  onePost(_id: ID!): Post
  oneDirectorPost(_id: ID!, postType: String!): Post
  oneAdminPost(_id: ID!, postType: String!): Post
  oneSopSectPost(_id: ID!, postType: String!): Post
  oneAltoSectPost(_id: ID!, postType: String!): Post
  oneTenSectPost(_id: ID!, postType: String!): Post
  oneBassSectPost(_id: ID!, postType: String!): Post
  oneUser(_id: ID!): User
  oneUserAdmin(_id: ID!): User
  trueConcerts: [Concert]
}

type Mutation {
  login(email: String! password: String!): Auth

  addConcert(name: String!, date: [String!]! time: [String!]!, venue: [String!]! signUp: String, addlMaterials: [String!]): Concert

  addPost(postType: String!, postBody: String!): Post

  addUser(fullName: String!, firstName: String!, lastName: String!, preferredName: String!, birthday: String, email1: String!, email2: String, password: String!, phone1: String, phone1Type: String, phone2: String, phone2Type: String, phone3: String, phone3Type: String, section: String!, position: String!, streetAddress: String, city: String, state: String, zipCode: String, isAdmin: Boolean!, isActive: Boolean!): User

  deleteConcert(_id: ID!): Concert

  deletePost(_id: ID!): Post

  deleteSong(songId: ID!): Concert

  deleteUser(_id: ID!): User

  editConcertBasic(_id: ID!, name: String!, date: [String!]! time: [String!]!, venue: [String!]! signUp: String, addlMaterials: [String!]): Concert

  addRepertoire(_id: ID!, songs: SongInput!): Concert

  editRepertoire(_id: ID!, songId: ID!, songs: SongInput!): Concert

  editPost(_id: ID!, postType: String!, postBody: String!): Post

  editUserAdmin(_id: ID!, fullName: String!, firstName: String!, lastName: String!, preferredName: String!, birthday: String, email1: String, email2: String, password: String, phone1: String, phone1Type: String, phone2: String, phone2Type: String, phone3: String, phone3Type: String, section: String!, position: String!, streetAddress: String, state: String, zipCode: String, isAdmin: Boolean!, isActive: Boolean!): User

  editUserSelf(_id: ID!, fullName: String!, firstName: String!, lastName: String!, preferredName: String!, birthday: String, password: String!, email2: String, phone1: String, phone1Type: String, phone2: String, phone2Type: String, phone3: String, phone3Type: String, streetAddress: String, city: String, state: String, zipCode: String): Auth
}
`

module.exports = typeDefs;