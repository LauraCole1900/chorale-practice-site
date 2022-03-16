import { gql } from "@apollo/client";

//=====================//
//  Concert Mutations  //
//=====================//

export const ADD_CONCERT = gql`
  mutation addConcert(
    $name: String!
    $date: [String!]!
    $time: [String!]!
    $venue: [String!]!
    $signUp: String
    $addlMaterials: [String!]
  ) {
    addConcert(
      name: $name
      date: $date
      time: $time
      venue: $venue
      signUp: $signUp
      addlMaterials: $addlMaterials
    ) {
      _id
      name
      date
      time
      venue
      signUp
      addlMaterials
    }
  }
`;

export const DELETE_CONCERT = gql`
  mutation deleteConcert($id: ID!) {
    deleteConcert(_id: $id) {
      _id
      name
      date
      time
      venue
      signUp
      addlMaterials
      songs {
        _id
        title
        composer
        concertOrder
        practiceTrackUrlsSop
        practiceTrackTitlesSop
        practiceTrackUrlsAlto
        practiceTrackTitlesAlto
        practiceTrackUrlsTen
        practiceTrackTitlesTen
        practiceTrackUrlsBass
        practiceTrackTitlesBass
        videoUrls
      }
    }
  }
`;

export const EDIT_CONCERT_BASIC = gql`
  mutation editConcertBasic(
    $id: ID!
    $name: String!
    $date: [String!]!
    $time: [String!]!
    $venue: [String!]!
    $signUp: String
    $addlMaterials: [String!]
  ) {
    editConcertBasic(
      _id: $id
      name: $name
      date: $date
      time: $time
      venue: $venue
      signUp: $signUp
      addlMaterials: $addlMaterials
    ) {
      _id
      name
      date
      time
      venue
      signUp
      addlMaterials
    }
  }
`;

//=====================//
//   Song Mutations    //
//=====================//

export const DELETE_SONG = gql`
  mutation deleteSong($id: ID!, $songId: ID!) {
    deleteSong(_id: $id, songId: $songId) {
      _id
      name
      date
      time
      venue
      signUp
      addlMaterials
      songs {
        title
        composer
        concertOrder
        practiceTrackUrlsSop
        practiceTrackTitlesSop
        practiceTrackUrlsAlto
        practiceTrackTitlesAlto
        practiceTrackUrlsTen
        practiceTrackTitlesTen
        practiceTrackUrlsBass
        practiceTrackTitlesBass
        videoUrls
      }
    }
  }
`;

export const DELETE_MANY_SONGS = gql`
  mutation deleteManySongs($_id: ID!, $songsToDelete: [ID!]!) {
    deleteManySongs(_id: $_id, songsToDelete: $songsToDelete) {
      _id
      name
      date
      time
      venue
      signUp
      addlMaterials
      songs {
        _id
        title
        composer
        concertOrder
        practiceTrackUrlsSop
        practiceTrackTitlesSop
        practiceTrackUrlsAlto
        practiceTrackTitlesAlto
        practiceTrackUrlsTen
        practiceTrackTitlesTen
        practiceTrackUrlsBass
        practiceTrackTitlesBass
        videoUrls
      }
    }
  }
`;

export const ADD_REPERTOIRE = gql`
  mutation addRepertoire($id: ID!, $songs: SongInput!) {
    addRepertoire(_id: $id, songs: $songs) {
      _id
      songs {
        _id
        title
        composer
        concertOrder
        practiceTrackUrlsSop
        practiceTrackTitlesSop
        practiceTrackUrlsAlto
        practiceTrackTitlesAlto
        practiceTrackUrlsTen
        practiceTrackTitlesTen
        practiceTrackUrlsBass
        practiceTrackTitlesBass
        videoUrls
      }
    }
  }
`;

export const EDIT_REPERTOIRE = gql`
  mutation editRepertoire(
    $concertId: ID!
    $songId: ID!
    $title: String!
    $composer: [String!]
    $concertOrder: Int
    $practiceTrackUrlsSop: [String!]
    $practiceTrackTitlesSop: [String!]
    $practiceTrackUrlsAlto: [String!]
    $practiceTrackTitlesAlto: [String!]
    $practiceTrackUrlsTen: [String!]
    $practiceTrackTitlesTen: [String!]
    $practiceTrackUrlsBass: [String!]
    $practiceTrackTitlesBass: [String!]
    $videoUrls: [String!]
  ) {
    editRepertoire(
      _id: $concertId
      songId: $songId
      title: $title
      composer: $composer
      concertOrder: $concertOrder
      practiceTrackUrlsSop: $practiceTrackUrlsSop
      practiceTrackTitlesSop: $practiceTrackTitlesSop
      practiceTrackUrlsAlto: $practiceTrackUrlsAlto
      practiceTrackTitlesAlto: $practiceTrackTitlesAlto
      practiceTrackUrlsTen: $practiceTrackUrlsTen
      practiceTrackTitlesTen: $practiceTrackTitlesTen
      practiceTrackUrlsBass: $practiceTrackUrlsBass
      practiceTrackTitlesBass: $practiceTrackTitlesBass
      videoUrls: $videoUrls
    ) {
      _id
      title
      composer
      concertOrder
      practiceTrackUrlsSop
      practiceTrackTitlesSop
      practiceTrackUrlsAlto
      practiceTrackTitlesAlto
      practiceTrackUrlsTen
      practiceTrackTitlesTen
      practiceTrackUrlsBass
      practiceTrackTitlesBass
      videoUrls
    }
  }
`;

export const SET_CONCERT_ORDER = gql`
  mutation setConcertOrder($id: ID!, $songs: [SongInput]!) {
    setConcertOrder(_id: $id, songs: $songs) {
      _id
      songs {
        _id
        title
        composer
        concertOrder
        practiceTrackUrlsSop
        practiceTrackTitlesSop
        practiceTrackUrlsAlto
        practiceTrackTitlesAlto
        practiceTrackUrlsTen
        practiceTrackTitlesTen
        practiceTrackUrlsBass
        practiceTrackTitlesBass
        videoUrls
      }
    }
  }
`;

//=====================//
//   Post Mutations    //
//=====================//

export const ADD_POST = gql`
  mutation addPost(
    $postType: String!
    $postSection: String
    $postExpire: String
    $postTitle: String
    $postBody: String!
  ) {
    addPost(
      postType: $postType
      postSection: $postSection
      postExpire: $postExpire
      postTitle: $postTitle
      postBody: $postBody
    ) {
      _id
      postType
      postSection
      postExpire
      postTitle
      postBody
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($id: ID!) {
    deletePost(_id: $id) {
      _id
      postType
      postSection
      postExpire
      postDate
      postTitle
      postBody
    }
  }
`;

export const EDIT_POST = gql`
  mutation editPost(
    $id: ID!
    $postType: String!
    $postSection: String
    $postExpire: String
    $postTitle: String
    $postBody: String!
  ) {
    editPost(
      _id: $id
      postType: $postType
      postSection: $postSection
      postExpire: $postExpire
      postTitle: $postTitle
      postBody: $postBody
    ) {
      _id
      postType
      postSection
      postExpire
      postTitle
      postBody
    }
  }
`;

//=====================//
//   User Mutations    //
//=====================//

export const ADD_USER = gql`
  mutation addUser(
    $fullName: String!
    $firstName: String!
    $lastName: String!
    $preferredName: String!
    $birthday: String
    $email1: String!
    $email2: String
    $password: String!
    $phone1: String
    $phone1Type: String
    $phone2: String
    $phone2Type: String
    $phone3: String
    $phone3Type: String
    $section: String!
    $position: String!
    $streetAddress: String
    $city: String
    $state: String
    $zipCode: String
    $isAdmin: Boolean!
    $isActive: Boolean!
  ) {
    addUser(
      fullName: $fullName
      firstName: $firstName
      lastName: $lastName
      preferredName: $preferredName
      birthday: $birthday
      email1: $email1
      email2: $email2
      phone1: $phone1
      phone1Type: $phone1Type
      phone2: $phone2
      phone2Type: $phone2Type
      phone3: $phone3
      phone3Type: $phone3Type
      password: $password
      section: $section
      position: $position
      streetAddress: $streetAddress
      city: $city
      state: $state
      zipCode: $zipCode
      isAdmin: $isAdmin
      isActive: $isActive
    ) {
      _id
      fullName
      firstName
      lastName
      preferredName
      birthday
      email1
      email2
      password
      phone1
      phone1Type
      phone2
      phone2Type
      phone3
      phone3Type
      section
      position
      streetAddress
      city
      state
      zipCode
      isAdmin
      isActive
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(_id: $id) {
      _id
      fullName
      firstName
      lastName
      preferredName
      birthday
      email1
      email2
      password
      phone1
      phone1Type
      phone2
      phone2Type
      phone3
      phone3Type
      section
      position
      streetAddress
      city
      state
      zipCode
      isAdmin
      isActive
    }
  }
`;

export const EDIT_PASSWORD = gql`
  mutation editPassword(
    $id: ID!
    $oldPassword: String!
    $newPassword: String!
  ) {
    editPassword(_id: $id, oldPassword: $oldPassword, password: $newPassword) {
      _id
      fullName
      firstName
      lastName
      preferredName
      email1
      email2
      birthday
      phone1
      phone2
      phone3
      streetAddress
      city
      state
      zipCode
    }
  }
`;

export const EDIT_USER_ADMIN = gql`
  mutation editUserAdmin(
    $id: ID!
    $fullName: String!
    $firstName: String!
    $lastName: String!
    $preferredName: String!
    $birthday: String
    $email1: String
    $email2: String
    $password: String
    $phone1: String
    $phone1Type: String
    $phone2: String
    $phone2Type: String
    $phone3: String
    $phone3Type: String
    $section: String!
    $position: String!
    $streetAddress: String
    $state: String
    $zipCode: String
    $isAdmin: Boolean!
    $isActive: Boolean!
  ) {
    editUserAdmin(
      _id: $id
      fullName: $fullName
      firstName: $firstName
      lastName: $lastName
      preferredName: $preferredName
      birthday: $birthday
      email1: $email1
      email2: $email2
      password: $password
      phone1: $phone1
      phone1Type: $phone1Type
      phone2: $phone2
      phone2Type: $phone2Type
      phone3: $phone3
      phone3Type: $phone3Type
      section: $section
      position: $position
      streetAddress: $streetAddress
      state: $state
      zipCode: $zipCode
      isAdmin: $isAdmin
      isActive: $isActive
    ) {
      _id
      fullName
      firstName
      lastName
      preferredName
      birthday
      email1
      email2
      phone1
      phone1Type
      phone2
      phone2Type
      phone3
      phone3Type
      section
      position
      streetAddress
      city
      state
      zipCode
      isAdmin
      isActive
    }
  }
`;

export const EDIT_USER_SELF = gql`
  mutation editUserSelf(
    $id: ID!
    $fullName: String!
    $firstName: String
    $lastName: String
    $preferredName: String!
    $birthday: String
    $email1: String!
    $email2: String
    $phone1: String
    $phone1Type: String
    $phone2: String
    $phone2Type: String
    $phone3: String
    $phone3Type: String
    $streetAddress: String
    $city: String
    $state: String
    $zipCode: String
  ) {
    editUserSelf(
      _id: $id
      fullName: $fullName
      firstName: $firstName
      lastName: $lastName
      preferredName: $preferredName
      birthday: $birthday
      email1: $email1
      email2: $email2
      phone1: $phone1
      phone1Type: $phone1Type
      phone2: $phone2
      phone2Type: $phone2Type
      phone3: $phone3
      phone3Type: $phone3Type
      streetAddress: $streetAddress
      city: $city
      state: $state
      zipCode: $zipCode
    ) {
      _id
      fullName
      firstName
      lastName
      preferredName
      email1
      email2
      birthday
      phone1
      phone2
      phone3
      streetAddress
      city
      state
      zipCode
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email1
      }
    }
  }
`;
