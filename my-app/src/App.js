
import Navbar from './components/Navbar';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Category from './components/Category';
const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache()
})
function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Navbar />
        <div className="container">
          <h2 className='text-center my-3 color-secondary'>All Categories</h2>
          <Category/>
        </div>
      </ApolloProvider>

    </>
  );
}

export default App;
