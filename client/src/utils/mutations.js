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
  mutation addUser($fullName: String!, $preferredName: String!, $email: String!, $phone1: String, $phone1Type: String, $phone2: String, $phone2Type: String, $phone3: String, $phone3Type: String, $password: String!, $section: String!, $position: String!, $streetAddress: String, $city: String, $state: String, $zipCode: String, $isAdmin: Boolean!, $isActive: Boolean!) {
    addUser(fullName: $fullName, preferredName: $preferredName, email: $email, phone1: $phone1, phone1Type: $phone1Type, phone2: $phone2, phone2Type: $phone2Type, phone3: $phone3, phone3Type: $phone3Type, password: $password, section: $section, position: $position, streetAddress: $streetAddress, city: $city, state: $state, zipCode: $zipCode, isAdmin: $isAdmin, isActive: $isActive) {
      _id
      fullName
      preferredName
      email
      phone
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