import "./App.css";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import AddCource from "./components/AddCource";
import Edit from "./components/Edit";
import CourseContext from "./components/context/CourseContext";
import  ReactDOM  from "react-dom";
import React from "react";

function App() {
  return (
    <>
    <div className="App">
     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/add" element={<AddCource />} />
        </Routes>
      
    </div>
    </>
  );
}

export default App;
