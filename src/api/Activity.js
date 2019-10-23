import gql from "graphql-tag";

export default {
  checkIn: gql`
    mutation checkIn($userId: ID!) {
      checkIn(userId: $userId) {
        id
        userId
        createdAt
      }
    }
  `,
  creat: gql`
    mutation createActivity($CreateActivityInput: CreateActivityInput!) {
      createActivity(input: $CreateActivityInput) {
        id
        name
        startAt
        endAt
      }
    }
  `,
  add: gql`
    mutation addActivityProduct($input: AddActivityProductInput!) {
      addActivityProduct(input: $input) {
        id
        name
        gold
        probability
      }
    }
  `,
  query: gql`
    query activity {
      activity(id: "YWN0aXZpdHkvMg==") {
        id
        name
        startAt
        endAt
        products {
          id
          name
          gold
          cover
          probability
        }
      }
    }
  `,
  luckDraw: gql`
    mutation luckDraw($input: LuckDrawInput!) {
      luckDraw(input: $input) {
        id
        name
        gold
        probability
      }
    }
  `
};
