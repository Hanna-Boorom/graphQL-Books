import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import BookList from "./components/BookList";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query GetRates {
        rates(currency: "USD") {
          currency
        }
      }
    `,
  })
  .then((result) => console.log(result));

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Hanna's Reading List</h1>
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
