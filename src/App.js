import React from "react";
import Container from "react-bootstrap/Container";

import "./App.css";

import Routes from "./Routes";
import Header from "./pages/header";
import Footer from "./pages/footer";

function App() {
  return (
    <Container className="p-3">
      <Header />

      <Routes />
      <Footer />
    </Container>
  );
}

export default App;
