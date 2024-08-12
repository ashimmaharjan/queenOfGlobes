import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";

import About from "./pages/About";
import heroBackground from "./images/hero-bg.jpg";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <main
        className="w-screen h-screen bg-gray-500 bg-blend-multiply"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <section className="w-full h-full">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </section>
      </main>
    </Router>
  );
}

export default App;
