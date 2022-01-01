import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($fullName: String!, $email: String!, $phone: String, $password: String!, $section: String!, $position: String!, $isAdmin: Boolean) {
    addUser(fullName: $fullName, email: $email, phone: $phone, password: $password, section: $section, position: $position, isAdmin: $isAdmin) {
      token
      user {
        _id
        fullName
        email
        section
        position
        isAdmin
      }
    }
  }
`;