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

export const EDIT_USER_SELF = gql`
mutation editUserSelf($fullName: String!, $firstName: String!, $lastName: String!, $preferredName: String!, $birthday: String, $password: String!, $phone1: String, $phone1Type: String, $phone2: String, $phone2Type: String, $phone3: String, $phone3Type: String, $streetAddress: String, $city: String, $state: String, $zipCode: String) {
  editUserSelf(fullName: $fullName, firstName: $firstName, lastName: $lastName, preferredName: $preferredName, birthday: $birthday, password: $password, phone1: $phone1, phone1Type: $phone1Type, phone2: $phone2, phone2Type: $phone2Type, phone3: $phone3, phone3Type: $phone3Type, streetAddress: $streetAddress, city: $city, state: $state, zipCode: $zipCode) {
    user {
      _id
      fullName
      preferredName
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
}`