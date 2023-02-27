import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router";
import { Navbar } from "./components/Navbar";
import { ShowSnaps } from "./components/ShowSnaps";
import { UserProfile } from "./components/UserProfile";



function App() {
  return (
    <>
      <Navbar />
      <Container>
          <Routes>
            <Route path="/" element={<ShowSnaps />} />
            <Route path="/userprofile" element={<UserProfile />} />
          </Routes>
      </Container>
    </>
  );
}

export default App;
