import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me ($email: String!) {
    me(email: $email) {
      _id
      fullName
      section
      position
      isAdmin
    }
  }
`;

export const QUERY_ALL_CONCERTS = gql`
  query concerts {
    concerts {
      _id
      name
      date
      time
      venue
      # songs {
      #   title
      #   composer
      # }
    }
  }
`;

export const QUERY_TRUE_CONCERTS = gql`
query trueConcerts {
  concerts {
    _id
    name
    date
    time
    songs {
      title
      composer
      practiceTrackUrlSop
      practiceTrackUrlAlto
      practiceTrackUrlTen
      practiceTrackUrlBass
      videoUrl1
      videoUrl2
      videoUrl3
    }
  }
}`

export const QUERY_ALL_ADMINS = gql`
query admins {
  admins {
    _id
    fullName
    section
    position
    isAdmin
  }
}`