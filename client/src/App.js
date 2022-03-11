import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container";
import { Navibar } from "./components/navbar";
import { AdminPortal, Lander, Login, Members, ProfilePage, RosterPage, Section, VoiceBuilder } from "./pages";
import { AdminUserForm, ConcertForm, PostForm, SongForm } from "./components/forms";
import "./App.css";


//=====================//
//      Functions      //
//=====================//

// Creates Apollo Client http link for GraphQL operations
const httpLink = createHttpLink({
  uri: "/graphql"
});

// Sets authentication into context
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
});

// Instantiates the client object and the cache object with some specific options
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          oneConcert: {
            merge: true
          },
          addRepertoire: {
            merge: true
          }
        }
      }
    }
  })
});


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
              <Route path="/edit_member/:userId" element={<AdminUserForm />} />
              <Route path="/edit_post/:postId" element={<PostForm />} />
              <Route path="/edit_repertoire/:concertId/:songId" element={<SongForm />} />
              <Route path="/login" element={<Login />} />
              <Route path="/members" element={<Members />} />
              <Route path="/new_event" element={<ConcertForm />} />
              <Route path="/new_member" element={<AdminUserForm />} />
              <Route path="/new_post" element={<PostForm />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/repertoire/:concertId" element={<SongForm />} />
              <Route path="/roster" element={<RosterPage />} />
              <Route path="/section/:section" element={<Section />} />
              <Route path="/voice_building" element={<VoiceBuilder />} />
              <Route path="*" element={<Lander />} />
            </Routes>
          </Container>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
