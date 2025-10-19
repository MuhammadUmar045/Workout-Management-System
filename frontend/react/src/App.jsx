import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import AddWorkout from "./pages/AddWorkout";
import ViewWorkouts from "./pages/ViewWorkouts";
import Statistics from "./pages/Statistics";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddWorkout />} />
            <Route path="/view" element={<ViewWorkouts />} />
            <Route path="/stats" element={<Statistics />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
