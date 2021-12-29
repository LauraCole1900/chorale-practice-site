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

export const QUERY_ALL_EVENTS = gql`
  query getAllEvents {
    getAllEvents {
      _id
      name
      date
      time
      venue
      songs
    }
  }
`;