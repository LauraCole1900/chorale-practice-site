import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query me($id: ID!) {
  me(_id: $id) {
    _id
    fullName
    preferredName
    section
    position
    isAdmin
  }
}
`;

export const QUERY_ME_PROFILE = gql`
query meProfile($id: ID!) {
  meProfile(_id: $id) {
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
    city
    state
    zipCode
    isAdmin
  }
}
`;

export const QUERY_ALL_ADMINS = gql`
query admins {
  admins {
    _id
    fullName
    preferredName
    email1
    phone1
    section
    position
    isAdmin
  }
}
`;

export const QUERY_ALL_CONCERTS = gql`
query allConcerts {
  allConcerts {
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

export const QUERY_ALL_USERS = gql`
query allUsers {
  allUsers {
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

export const QUERY_ONE_CONCERT = gql`
query oneConcert ($id: ID!) {
  oneConcert(_id: $id) {
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

export const QUERY_ONE_USER = gql`
query oneUser($id: ID!) {
  oneUser(_id: $id) {
    _id
    fullName
    firstName
    lastName
    preferredName
    birthday
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

export const QUERY_ONE_USER_ADMIN = gql`
query oneUserAdmin($id: ID!) {
  oneUserAdmin(_id: $id) {
    _id
    fullName
    firstName
    lastName
    preferredName
    birthday
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
}`

export const QUERY_TRUE_CONCERTS = gql`
  query trueConcerts {
    trueConcerts {
      _id
      name
      date
      time
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