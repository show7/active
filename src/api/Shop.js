import gql from "graphql-tag";
// 汽配厂管理

export default {
  query: gql`
    query shops($input: ShopsQueryInput!) {
      shops(query: $input) {
        edges {
          id
          name
          qqchat
          wechat
          status
          isPassed
          phone
          city
          description
        }
        pageInfo {
          total
        }
      }
    }
  `,
  shop: gql`
    query shop($input: ShopQueryInput) {
      shop(query: $input) {
        id
        name
        qqchat
        wechat
        description
        status
        isPassed
        belongto
        categories {
          id
          name
        }
        address
        area
        cover
        city
      }
    }
  `,
  phones: gql`
    query phones($PhoneQuery: PhoneQuery!) {
      phones(query: $PhoneQuery) {
        phone
      }
    }
  `,

  banners: gql`
    query banners($bannerQueryInput: BannerQueryInput!) {
      banners(bannerQueryInput: $bannerQueryInput) {
        id
        title
        path
        content
        tag
        link
      }
    }
  `,
  images: gql`
    query images($ImageSearchInput: ImageSearchInput) {
      images(query: $ImageSearchInput) {
        id
        path
      }
    }
  `,
  update: gql`
    mutation updateShop($shopUpdateInput: ShopUpdateInput!) {
      updateShop(shopUpdateInput: $shopUpdateInput) {
        status
      }
    }
  `
};
