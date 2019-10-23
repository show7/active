import gql from "graphql-tag";
export default {
  query: gql`
    query images($ImageSearchInput: ImageSearchInput) {
      images(query: $ImageSearchInput) {
        id
        path
      }
    }
  `
};
