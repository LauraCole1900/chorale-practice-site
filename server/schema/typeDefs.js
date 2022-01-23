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
  postExpire: String
  postDate: String!
  postTitle: String
  postBody: String!
}

type Song {
  _id: ID!
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
  _id: ID
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

type Query {
  me: User
  meProfile: User
  currentId(_id: ID!): User
  admins: [User]
  allBirthdays: [User]
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
  oneProfile(_id: ID!): User
  oneUser(_id: ID!): User
  oneUserAdmin(_id: ID!): User
  trueConcerts: [Concert]
}

type Mutation {
  login(email: String! password: String!): Auth

  addConcert(name: String!, date: [String!]! time: [String!]!, venue: [String!]! signUp: String, addlMaterials: [String!]): Concert

  addPost(postType: String!, postExpire: String, postTitle: String, postBody: String!): Post

  addUser(fullName: String!, firstName: String!, lastName: String!, preferredName: String!, birthday: String, email1: String!, email2: String, password: String!, phone1: String, phone1Type: String, phone2: String, phone2Type: String, phone3: String, phone3Type: String, section: String!, position: String!, streetAddress: String, city: String, state: String, zipCode: String, isAdmin: Boolean!, isActive: Boolean!): User

  deleteConcert(_id: ID!): Concert

  deletePost(_id: ID!): Post

  deleteSong(_id: ID!, songId: ID!): Concert

  deleteManySongs(_id: ID!, songsToDelete: [ID!]!): Concert

  deleteUser(_id: ID!): User

  editConcertBasic(_id: ID!, name: String!, date: [String!]! time: [String!]!, venue: [String!]! signUp: String, addlMaterials: [String!]): Concert

  addRepertoire(_id: ID!, songs: SongInput!): Concert

  editRepertoire(_id: ID!, songId: ID!, songs: SongInput!): Concert

  editPost(_id: ID!, postType: String!, postBody: String!): Post

  editUserAdmin(_id: ID!, fullName: String!, firstName: String!, lastName: String!, preferredName: String!, birthday: String, email1: String, email2: String, password: String, phone1: String, phone1Type: String, phone2: String, phone2Type: String, phone3: String, phone3Type: String, section: String!, position: String!, streetAddress: String, state: String, zipCode: String, isAdmin: Boolean!, isActive: Boolean!): User

  editUserSelf(_id: ID!, fullName: String!, firstName: String, lastName: String, preferredName: String!, birthday: String, email1: String!, email2: String, phone1: String, phone1Type: String, phone2: String, phone2Type: String, phone3: String, phone3Type: String, streetAddress: String, city: String, state: String, zipCode: String): User
}
`

module.exports = typeDefs;