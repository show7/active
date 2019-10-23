import gql from "graphql-tag";
export default {
  //金币商品列表
  goldProducts: gql`
    query goldProducts($GoldProductsQuery: GoldProductsQuery) {
      goldProducts(query: $GoldProductsQuery) {
        pageInfo {
          total
        }
        edges {
          ... on GoldProductNode {
            id
            name
            cover
            salePrice
            stock
            description
          }
        }
      }
    }
  `, //创建商品订单
  createGoldOrder: gql`
    mutation createGoldOrder($input: CreateGoldOrderInput!) {
      createGoldOrder(input: $input) {
        id
        user {
          name
        }
        status
        createdAt
      }
    }
  `,
  //金币商品详情
  goldProduct: gql`
    query goldProduct($id: ID!) {
      goldProduct(id: $id) {
        id
        name
        cover
        salePrice
        stock
        description
        banners {
          ... on Banner {
            id
            title
            path
            content
            tag
            link
          }
        }
      }
    }
  `,

  //金币商城订单
  goldOrders: gql`
    query goldOrders($GoldOrdersQuery: GoldOrdersQuery) {
      goldOrders(input: $GoldOrdersQuery) {
        pageInfo {
          total
        }
        edges {
          ... on GoldOrderNode {
            id
            goldProduct {
              name
            }
            status
            createdAt
          }
        }
      }
    }
  `,
  //订单详情
  goldOrder: gql`
    query goldOrder($ID: ID!) {
      goldOrder(id: $ID) {
        id
        ... on user {
          id
          name
          profilePicture
          phone
          garage
          city
          area
          address
          role
          totalFee
        }
        ... on goldProduct {
          id
          name
          cover
          salePrice
          stock
          description
          banners {
            ... on banner {
              id
              title
              path
              content
              tag
              link
            }
          }
        }
      }
    }
  `
};
