import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container";
import { Navibar } from "./components/navbar";
// import Footer from "./components/footer";
import { AdminPortal, Lander, Login, Members, ProfilePage, RosterPage, Section } from "./pages";
import { AdminUserForm, ConcertForm, SongForm, UserForm } from "./components/forms";
import "./App.css";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache({ addTypename: false })
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
              <Route path="/admin_portal" element={<AdminPortal />} />
              <Route path="/edit_event/:concertId" element={<ConcertForm />} />
              <Route path="/edit_repertoire/:concertId/:songId" element={<SongForm />} />
              <Route path="/edit_me/:userId" element={<UserForm />} />
              <Route path="/edit_member/:userId" element={<AdminUserForm />} />
              <Route path="/login" element={<Login />} />
              <Route path="/members" element={<Members />} />
              <Route path="/new_event" element={<ConcertForm />} />
              <Route path="/new_member" element={<AdminUserForm />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/repertoire/:concertId" element={<SongForm />} />
              <Route path="/roster" element={<RosterPage />} />
              <Route path="/section/:section" element={<Section />} />
              <Route path="*" element={<Lander />} />
            </Routes>
          </Container>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
