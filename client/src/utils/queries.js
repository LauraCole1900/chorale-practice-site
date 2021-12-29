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