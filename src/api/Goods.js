import gql from "graphql-tag";
//商品信息
export default {
  queryGoods: gql`
    fragment Goods on Good {
      id
      name
      cover
      shopId
      status
      description
      goodsSales
      subTitle
      goodsStocks
      goodSalePrice
    }
    query goods($input: GoodsSearchInput!) {
      goods(query: $input) {
        edges {
          ...Goods
        }
        pageInfo {
          total
        }
      }
    }
  `,
  queryGood: gql`
    fragment Goods on Good {
      id
      name
      cover
      shopId
      status
      description
      categories {
        id
        name
      }
      shippingAddress
      freight
      goodsSales
      subTitle
      goodsStocks
      goodSalePrice
      goodParamter
    }
    query good($input: GoodSearchInput!) {
      good(query: $input) {
        ...Goods
      }
    }
  `,
  addGoodes: gql`
    mutation createGood($createGoodInput: GoodCreateInput!) {
      createGood(createGoodInput: $createGoodInput) {
        status
      }
    }
  `,
  upGoods: gql`
    mutation updateGood($updateGoodInput: GoodUpdateInput!) {
      updateGood(updateGoodInput: $updateGoodInput) {
        status
      }
    }
  `,
  deleteGood: gql`
    mutation deleteGood($deleteGoodInput: GoodDeleteInput!) {
      deleteGood(deleteGoodInput: $deleteGoodInput) {
        status
      }
    }
  `
};
