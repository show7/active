import gql from "graphql-tag";

export default {
  queryAddress: gql`
    query address($AddressQuery: AddressQuery!) {
      address(addressQuery: $AddressQuery) {
        ... on Address {
          id
          name
          phone
          province
          city
          district
          address
          isDefault
        }
      }
    }
  `,
  defaultAddress: gql`
    query defaultAddress($defaultAddressQuery: AddressQuery!) {
      defaultAddress(defaultAddressQuery: $defaultAddressQuery) {
        id
        name
        phone
        province
        city
        district
        address
        isDefault
      }
    }
  `,
  createAddress: gql`
    mutation createAddress($createAddressInput: CreateAddressInput!) {
      createAddress(createAddressInput: $createAddressInput) {
        id
        status
      }
    }
  `,
  updateAddress: gql`
    mutation updateAddress($UpdateAddressInput: UpdateAddressInput!) {
      updateAddress(updateAddressInput: $UpdateAddressInput) {
        id
        status
      }
    }
  `
};
