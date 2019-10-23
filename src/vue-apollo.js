import Vue from "vue";
import VueApollo from "vue-apollo";
// import router from "./router";
import {
  createApolloClient,
  restartWebsockets
} from "vue-cli-plugin-apollo/graphql-client";
import { Toast } from "vant";
import { onError } from "apollo-link-error";
import { ApolloLink, from } from "apollo-link";

// Install the vue plugin
Vue.use(VueApollo);

// Name of the localStorage item
const AUTH_TOKEN = "authorization";

// Http endpoint
// const httpEndpoint = 'http://10.5.21.29:4500/graphql'
const httpEndpoint = "https://dev.dafengge.top/graphql";
// Files URL root
export const filesRoot =
  process.env.VUE_APP_FILES_ROOT ||
  httpEndpoint.substr(0, httpEndpoint.indexOf("/graphql"));

Vue.prototype.$filesRoot = filesRoot;
const Afterware = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    // 服务器返回数据
    if (response.errors) {
      Toast(response.errors[response.errors.length - 1].message);
    }
    console.log(response, "pppppppppp");
    return response;
  });
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
  // if (graphQLErrors)
  //   graphQLErrors.map(({ message, locations, path }) => {
  //     console.log(`[GraphQL error]: Message: ${message}, Path: ${path}`,)
  //   })
});

// Config
const defaultOptions = {
  // You can use `https` for secure connection (recommended in production)
  httpEndpoint,
  // You can use `wss` for secure connection (recommended in production)
  // Use `null` to disable subscriptions
  // wsEndpoint: process.env.VUE_APP_GRAPHQL_WS || 'ws://http://47.104.180.119/graphql',
  // LocalStorage token
  tokenName: AUTH_TOKEN,
  // Enable Automatic Query persisting with Apollo Engine
  persisting: false,
  // Use websockets for everything (no HTTP)
  // You need to pass a `wsEndpoint` for this to work
  websocketsOnly: false,
  // Is being rendered on the server?
  ssr: false,

  // Override default apollo link
  // note: don't override httpLink here, specify httpLink options in the
  // httpLinkOptions property of defaultOptions.
  link: from([Afterware, errorLink]),

  // Override default cache
  // cache: myCache

  // Override the way the Authorization header is set
  getAuth(tokenName) {
    if (typeof window !== "undefined") {
      // get the authentication token from local storage if it exists
      const token = window.localStorage.getItem(tokenName);
      // return the headers to the context so httpLink can read them
      return token ? `${token}` : "";
    }
  },

  addTypename: false

  // Additional ApolloClient options
  // apollo: { ... }

  // Client local data (see apollo-link-state)
  // clientState: { resolvers: { ... }, defaults: { ... } }
};

// Call this in the Vue app file
export function createProvider(options = {}) {
  // Create apollo client
  const { apolloClient, wsClient } = createApolloClient({
    ...defaultOptions,
    ...options
  });
  apolloClient.wsClient = wsClient;
  apolloClient.addTypename = false;
  // Create vue apollo provider
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {
        fetchPolicy: "cache-and-network"
      }
    },

    errorHandler(error) {
      error.message.split("code ")[1] === "400" && Toast(error);

      // eslint-disable-next-line no-console
      console.log(
        "%cError",
        "background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;",
        error.message
      );
    }
  });

  return apolloProvider;
}

// Manually call this when user log in
export async function onLogin(apolloClient, token) {
  if (typeof localStorage !== "undefined" && token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }
  // if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)
  // try {
  //   await apolloClient.resetStore()
  // } catch (e) {
  //   // eslint-disable-next-line no-console
  //   console.log('%cError on cache reset (login)', 'color: orange;', e.message)
  // }
}

// Manually call this when user log out
export async function onLogout(apolloClient) {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(AUTH_TOKEN);
  }
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient);
  try {
    await apolloClient.resetStore();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log("%cError on cache reset (logout)", "color: orange;", e.message);
  }
}
