import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import { NavBarLinks } from "./components/data/NavBarLinks";
import { Login } from "./components/pages/Login";
import { Register } from "./components/pages/Register";
import Pixels from "./components/pages/Pixels";
import GeneratePixel from "./components/pages/GeneratePixel";
import PixelStat from "./components/pages/PixelStat";
import Home from "./components/pages/Home";

export default function App() {
  return (
    <div>
      <NavBar links={NavBarLinks.links} />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pixels" element={<Pixels />} />
          <Route path="/generate" element={<GeneratePixel />} />
          <Route path="/stats/:trackId" element={<PixelStat />} />
        </Routes>
      </div>
    </div>
  );
}
