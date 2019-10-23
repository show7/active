import gql from "graphql-tag";
export default {
  query: gql`
    query banners($input: BannerQueryInput!) {
      banners(bannerQueryInput: $input) {
        id
        tag
        title
        path
        content
        link
      }
    }
  `
};
