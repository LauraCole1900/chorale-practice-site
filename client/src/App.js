import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container";
import { Navibar } from "./components/navbar";
// import Footer from "./components/footer";
import { Lander, Login, Members, RosterPage, Section } from "./pages";
import { AdminUserForm, ConcertForm, SongForm, UserForm } from "./components/forms";
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
          <Container fluid>
            <Routes>
              <Route path="/" element={<Lander />} />
              <Route path="/edit_event/*" element={<ConcertForm />} />
              <Route path="/edit_me/*" element={<UserForm />} />
              <Route path="/edit_member/*" element={<AdminUserForm />} />
              <Route path="/login" element={<Login />} />
              <Route path="/members" element={<Members />} />
              <Route path="/new_event" element={<ConcertForm />} />
              <Route path="/new_member" element={<AdminUserForm />} />
              <Route path="/repertoire/*" element={<SongForm />} />
              <Route path="/roster" element={<RosterPage />} />
              <Route path="/section/soprano" element={<Section />} />
              <Route path="/section/alto" element={<Section />} />
              <Route path="/section/tenor" element={<Section />} />
              <Route path="/section/bass" element={<Section />} />
              <Route path="*" element={<Lander />} />
            </Routes>
          </Container>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
