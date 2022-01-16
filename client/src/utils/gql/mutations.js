import { gql } from "@apollo/client";

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

export const ADD_CONCERT = gql`
mutation addConcert($name: String!, $date: [String!]!, $time: [String!]!, $venue: [String!]!, $signUp: String, $addlMaterials: [String!]) {
  addConcert(name: $name, date: $date, time: $time, venue: $venue, signUp: $signUp, addlMaterials: $addlMaterials) {
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

export const ADD_POST = gql`
mutation addPost($postType: String!, $postDate: String!, $postBody: String!) {
  addPost(postType: $postType, postDate: $postDate, postBody: $postBody) {
    _id
    postType
    postBody
  }
}
`;

export const ADD_USER = gql`
mutation addUser($fullName: String!, $firstName: String!, $lastName: String!, $preferredName: String!, $birthday: String, $email1: String!, $email2: String, $password: String!, $phone1: String, $phone1Type: String, $phone2: String, $phone2Type: String, $phone3: String, $phone3Type: String, $section: String!, $position: String!, $streetAddress: String, $city: String, $state: String, $zipCode: String, $isAdmin: Boolean!, $isActive: Boolean!) {
  addUser(fullName: $fullName, firstName: $firstName, lastName: $lastName, preferredName: $preferredName, birthday: $birthday, email1: $email1, email2: $email2, phone1: $phone1, phone1Type: $phone1Type, phone2: $phone2, phone2Type: $phone2Type, phone3: $phone3, phone3Type: $phone3Type, password: $password, section: $section, position: $position, streetAddress: $streetAddress, city: $city, state: $state, zipCode: $zipCode, isAdmin: $isAdmin, isActive: $isActive) {
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
      title
      composer
      concertOrder
      practiceTrackUrlsSop
      practiceTrackUrlsAlto
      practiceTrackUrlsTen
      practiceTrackUrlsBass
      videoUrls
    }
  }
}
`;

export const DELETE_POST = gql`
mutation deletePost($id: ID!) {
  deletePost(_id: $id) {
    _id
    postType
    postBody
  }
}
`;

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
      practiceTrackUrlsAlto
      practiceTrackUrlsTen
      practiceTrackUrlsBass
      videoUrls
    }
  }
}
`;

export const DELETE_MANY_SONGS = gql`
mutation deleteManySongs($_id: ID!, $songsToDelete: [ID!]!) {
  deleteSong(_id: $id, songsToDelete: $songsToDelete) {
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
      practiceTrackUrlsAlto
      practiceTrackUrlsTen
      practiceTrackUrlsBass
      videoUrls
    }
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

export const EDIT_CONCERT_BASIC = gql`
mutation editConcertBasic($id: ID!, $name: String!, $date: [String!]!, $time: [String!]!, $venue: [String!]!, $signUp: String, $addlMaterials: [String!]) {
  editConcertBasic(_id: $id, name: $name, date: $date, time: $time, venue: $venue, signUp: $signUp, addlMaterials: $addlMaterials) {
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

export const ADD_REPERTOIRE = gql`
mutation addRepertoire($id: ID!, $songs: SongInput!) {
  addRepertoire(_id: $id, songs: $songs) {
    _id
    songs {
      songId
      title
      composer
      concertOrder
      practiceTrackUrlsSopSlow
      practiceTrackUrlsAltoSlow
      practiceTrackUrlsTenSlow
      practiceTrackUrlsBassSlow
      practiceTrackUrlsSopATempo
      practiceTrackUrlsAltoATempo
      practiceTrackUrlsTenATempo
      practiceTrackUrlsBassATempo
      videoUrls
    }
  }
}
`;

export const EDIT_REPERTOIRE = gql`
mutation editRepertoire($id: ID!, $songId: ID!, $songs: SongInput!) {
  editRepertoire(_id: $id, songId: $songId, songs: $songs) {
    _id
    songs {
      songId
      title
      composer
      concertOrder
      practiceTrackUrlsSopSlow
      practiceTrackUrlsAltoSlow
      practiceTrackUrlsTenSlow
      practiceTrackUrlsBassSlow
      practiceTrackUrlsSopATempo
      practiceTrackUrlsAltoATempo
      practiceTrackUrlsTenATempo
      practiceTrackUrlsBassATempo
      videoUrls
    }
  }
}
`;

export const EDIT_POST = gql`
mutation editPost($id: ID!, $postType: String!, $postBody: String!) {
  editPost(_id: $id, postType: $postType, postBody: $postBody) {
    _id
    postType
    postBody
  }
}
`;

export const EDIT_USER_ADMIN = gql`
mutation editUserAdmin($id: ID!, $fullName: String!, $firstName: String!, $lastName: String!, $preferredName: String!, $birthday: String, $email1: String, $email2: String, $password: String, $phone1: String, $phone1Type: String, $phone2: String, $phone2Type: String, $phone3: String, $phone3Type: String, $section: String!, $position: String!, $streetAddress: String, $state: String, $zipCode: String, $isAdmin: Boolean!, $isActive: Boolean!) {
  editUserAdmin(_id: $id, fullName: $fullName, firstName: $firstName, lastName: $lastName, preferredName: $preferredName, birthday: $birthday email1: $email1, email2: $email2, password: $password, phone1: $phone1, phone1Type: $phone1Type, phone2: $phone2, phone2Type: $phone2Type, phone3: $phone3, phone3Type: $phone3Type, section: $section, position: $position, streetAddress: $streetAddress, state: $state, zipCode: $zipCode, isAdmin: $isAdmin, isActive: $isActive) {
    _id
    fullName
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
    state
    zipCode
    isAdmin
    isActive
  }
}
`;

export const EDIT_USER_SELF = gql`
mutation editUserSelf($id: ID!, $fullName: String!, $firstName: String!, $lastName: String!, $preferredName: String!, $birthday: String, $password: String!, $phone1: String, $phone1Type: String, $phone2: String, $phone2Type: String, $phone3: String, $phone3Type: String, $streetAddress: String, $city: String, $state: String, $zipCode: String) {
  editUserSelf(_id: $id, fullName: $fullName, firstName: $firstName, lastName: $lastName, preferredName: $preferredName, birthday: $birthday, password: $password, phone1: $phone1, phone1Type: $phone1Type, phone2: $phone2, phone2Type: $phone2Type, phone3: $phone3, phone3Type: $phone3Type, streetAddress: $streetAddress, city: $city, state: $state, zipCode: $zipCode) {
    user {
      _id
      fullName
      preferredName
      birthday
      password
      phone1
      phone2
      phone3
      streetAddress
      city
      state
      zipCode
    }
  }
}
`;