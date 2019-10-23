import gql from "graphql-tag";
export default {
  queryUser: gql`
    query user($UserQueryInput: UserQueryInput!) {
      user(userQueryInput: $UserQueryInput) {
        id
        gold
      }
    }
  `
};
