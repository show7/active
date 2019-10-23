import gql from "graphql-tag";

export default {
  query: gql`
    query comments($getCommentInput: getCommentInput!) {
      comments(query: $getCommentInput) {
        pageInfo {
          total
        }
        edges {
          ... on Comment {
            id
            user {
              id
              name
              profilePicture
              phone
              garage
              city
              area
            }
            comment
            updatedAt
          }
        }
      }
    }
  `
};
