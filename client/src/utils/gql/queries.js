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

export const QUERY_ME_PROFILE = gql`
query meProfile {
  meProfile {
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

export const QUERY_CURRENT_ID = gql`
query currentId ($id: ID!) {
  currentId(_id: $id) {
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
    email1
    phone1
    section
    position
    isAdmin
  }
}
`;

export const QUERY_ALL_BIRTHDAYS = gql`
query allBirthdays {
  allBirthdays {
    _id
    fullName
    birthday
  }
}
`

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
      _id
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

export const QUERY_ALL_POSTS = gql`
query allPosts {
  allPosts {
    _id
    postType
    postExpire
    postDate
    postTitle
    postBody
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
      _id
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

export const QUERY_ONE_POST = gql`
query onePost ($id: ID!) {
  onePost(_id: $id) {
    _id
    postType
    postExpire
    postDate
    postTitle
    postBody
  }
}
`;

export const QUERY_ONE_DIRECTOR_POST = gql`
query oneDirectorPost($id: ID!, $postType: String!) {
  oneDirectorPost(_id: $id, postType: $postType) {
    _id
    postType
    postExpire
    postDate
    postTitle
    postBody
  }
}
`;

export const QUERY_ONE_ADMIN_POST = gql`
query oneAdminPost($id: ID!, $postType: String!) {
  oneAdminPost(_id: $id, postType: $postType) {
    _id
    postType
    postExpire
    postDate
    postTitle
    postBody
  }
}
`;

export const QUERY_ONE_SOP_SECT_POST = gql`
query oneSopSectPost($id: ID!, $postType: String!) {
  oneSopSectPost(_id: $id, postType: $postType) {
    _id
    postType
    postDate
    postTitle
    postBody
  }
}
`;

export const QUERY_ONE_ALTO_SECT_POST = gql`
query oneAltoSectPost($id: ID!, $postType: String!) {
  oneAltoSectPost(_id: $id, postType: $postType) {
    _id
    postType
    postDate
    postTitle
    postBody
  }
}
`;

export const QUERY_ONE_TEN_SECT_POST = gql`
query oneTenSectPost($id: ID!, $postType: String!) {
  oneTenSectPost(_id: $id, postType: $postType) {
    _id
    postType
    postDate
    postTitle
    postBody
  }
}
`;

export const QUERY_ONE_BASS_SECT_POST = gql`
query oneBassSectPost($id: ID!, $postType: String!) {
  oneBassSectPost(_id: $id, postType: $postType) {
    _id
    postType
    postDate
    postTitle
    postBody
  }
}
`;

export const QUERY_ONE_PROFILE = gql`
query oneProfile($id: ID!) {
  oneProfile(_id: $id) {
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
      _id
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