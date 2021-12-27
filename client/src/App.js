import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container";
import Navibar from "./components/navbar";
// import Footer from "./components/footer";
import "./App.css";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache()
})

function App() {
  return (
    <>
    <ApolloProvider client={client}>
      <Router>
        <Navibar />
        <h1>Hello World</h1>
      </Router>
    </ApolloProvider>
    </>
  );
}

export default App;
