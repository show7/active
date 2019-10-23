/*
 * @Author: 周跃强
 * @LastEditTime: 2019-10-13 23:37:59
 */
import gql from "graphql-tag";

export default {
  query: gql`
    query video($id: ID!) {
      video(id: $id) {
        id
        user {
          name
          profilePicture
        }
        videoUrl
        title
        createdAt
        commentCount
      }
    }
  `
};
