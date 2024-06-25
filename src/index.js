import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import BrowserRouter
import "./index.css";
import Navbar from "./Navbar.tsx";
import MainBody from "./MainBody.tsx";
import MediaControlCard from "./CurrentMusic.tsx"; // Adjust the import path as necessary
import reportWebVitals from "./reportWebVitals";

function RootApp() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainBody />} />
        <Route path="/music" element={<MediaControlCard />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

reportWebVitals();
