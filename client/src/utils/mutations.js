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
  mutation addUser($fullName: String!, $preferredName: String!, $email: String!, $phone: String, $password: String!, $section: String!, $position: String!, $isAdmin: Boolean!, $isActive: Boolean!) {
    addUser(fullName: $fullName, email: $email, phone: $phone, password: $password, section: $section, position: $position, isAdmin: $isAdmin, isActive: $isActive) {
      token
      user {
        _id
        fullName
        preferredName
        email
        section
        position
        isAdmin
        isActive
      }
    }
  }
`;

export const EDIT_USER_SELF = gql`
mutation editUserSelf($fullName: String!, $preferredName: String!, $email: String!, $phone: String, $password: String!) {
  editUserSelf(fullName: $fullName, preferredName: $preferredName, email: $email, phone: $phone, password: $password) {
    user {
      _id
      fullName
      preferredName
      phone
      password
    }
  }
}`