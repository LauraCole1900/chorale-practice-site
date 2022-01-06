import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      fullName
      preferredName
      section
      position
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
    email
    phone
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
      songs {
        title
        composer
      }
    }
  }
`;

export const QUERY_ALL_USERS = gql`
query allUsers {
  allUsers {
    fullName
    preferredName
    email
    phone
    section
    position
    isAdmin
    isActive
  }
}`

export const QUERY_ONE_USER = gql`
query oneUser($email: String!) {
  oneUser(email: $email) {
    _id
    fullName
    preferredName
    email
    phone
    password
    section
    position
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