const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # //=====================//
  # //        Types        //
  # //=====================//

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
    postSection: String
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
    practiceTrackUrlsSop: [String!]
    practiceTrackTitlesSop: [String!]
    practiceTrackUrlsAlto: [String!]
    practiceTrackTitlesAlto: [String!]
    practiceTrackUrlsTen: [String!]
    practiceTrackTitlesTen: [String!]
    practiceTrackUrlsBass: [String!]
    practiceTrackTitlesBass: [String!]
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
    oldPassword: String
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

  # //=====================//
  # //        Inputs       //
  # //=====================//

  input SongInput {
    _id: ID
    title: String!
    composer: [String!]
    concertOrder: Int
    publisher: String
    copyrightDate: String
    practiceTrackUrlsSop: [String!]
    practiceTrackTitlesSop: [String!]
    practiceTrackUrlsAlto: [String!]
    practiceTrackTitlesAlto: [String!]
    practiceTrackUrlsTen: [String!]
    practiceTrackTitlesTen: [String!]
    practiceTrackUrlsBass: [String!]
    practiceTrackTitlesBass: [String!]
    videoUrls: [String]
  }

  # //=====================//
  # //       Queries       //
  # //=====================//

  type Query {
    # //=====================//
    # //   Concert Queries   //
    # //=====================//

    allConcerts: [Concert]
    oneConcert(_id: ID!): Concert
    trueConcerts: [Concert]

    # //=====================//
    # //     Post Queries    //
    # //=====================//

    allPosts: [Post]
    onePost(_id: ID!): Post
    oneAdminPost(_id: ID!, postType: String!): Post
    oneDirectorPost(_id: ID!, postType: String!): Post
    oneSectPost(postType: String!, postSection: String!): Post

    # //=====================//
    # //     User Queries    //
    # //=====================//

    admins: [User]
    allBirthdays: [User]
    allUsers: [User]
    currentId(_id: ID!): User
    me: User
    meProfile: User
    oneProfile(_id: ID!): User
    oneUser(_id: ID!): User
    oneUserAdmin(_id: ID!): User
  }

  # //=====================//
  # //      Mutations      //
  # //=====================//

  type Mutation {
    # //=====================//
    # //  Concert Mutations  //
    # //=====================//

    addConcert(
      name: String!
      date: [String!]!
      time: [String!]!
      venue: [String!]!
      signUp: String
      addlMaterials: [String!]
    ): Concert

    deleteConcert(_id: ID!): Concert

    editConcertBasic(
      _id: ID!
      name: String!
      date: [String!]!
      time: [String!]!
      venue: [String!]!
      signUp: String
      addlMaterials: [String!]
    ): Concert

    # //=====================//
    # //    Song Mutations   //
    # //=====================//

    deleteSong(_id: ID!, songId: ID!): Concert

    deleteManySongs(_id: ID!, songsToDelete: [ID!]!): Concert

    addRepertoire(_id: ID!, songs: SongInput!): Concert

    editRepertoire(
      _id: ID!
      songId: ID!
      title: String!
      composer: [String!]
      concertOrder: Int
      publisher: String
      copyrightDate: String
      practiceTrackUrlsSop: [String!]
      practiceTrackTitlesSop: [String!]
      practiceTrackUrlsAlto: [String!]
      practiceTrackTitlesAlto: [String!]
      practiceTrackUrlsTen: [String!]
      practiceTrackTitlesTen: [String!]
      practiceTrackUrlsBass: [String]
      practiceTrackTitlesBass: [String!]
      videoUrls: [String]
    ): Song

    setConcertOrder(_id: ID!, songs: [SongInput]!): Concert

    # //=====================//
    # //    Post Mutations   //
    # //=====================//

    addPost(
      postType: String!
      postSection: String
      postExpire: String
      postTitle: String
      postBody: String!
    ): Post

    deletePost(_id: ID!): Post

    editPost(
      _id: ID!
      postType: String!
      postSection: String
      postExpire: String
      postTitle: String
      postBody: String!
    ): Post

    # //=====================//
    # //    User Mutations   //
    # //=====================//

    addUser(
      fullName: String!
      firstName: String!
      lastName: String!
      preferredName: String!
      birthday: String
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
    ): User

    deleteUser(_id: ID!): User

    editPassword(_id: ID!, oldPassword: String, password: String!): User

    editUserAdmin(
      _id: ID!
      fullName: String!
      firstName: String!
      lastName: String!
      preferredName: String!
      birthday: String
      email1: String
      email2: String
      password: String
      phone1: String
      phone1Type: String
      phone2: String
      phone2Type: String
      phone3: String
      phone3Type: String
      section: String!
      position: String!
      streetAddress: String
      state: String
      zipCode: String
      isAdmin: Boolean!
      isActive: Boolean!
    ): User

    editUserSelf(
      _id: ID!
      fullName: String!
      firstName: String
      lastName: String
      preferredName: String!
      birthday: String
      email1: String!
      email2: String
      phone1: String
      phone1Type: String
      phone2: String
      phone2Type: String
      phone3: String
      phone3Type: String
      streetAddress: String
      city: String
      state: String
      zipCode: String
    ): User

    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
