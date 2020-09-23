import { split, HttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

const httpLink = new HttpLink({
  uri: "https://graphql-chatty-app.herokuapp.com/graphql",
});
const token = localStorage.getItem("userToken");

const wsLink = new WebSocketLink({
  uri: `ws://graphql-chatty-app.herokuapp.com/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: `Bearer ${token}`,
    },
  },
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export default new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});
