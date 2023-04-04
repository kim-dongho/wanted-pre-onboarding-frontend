import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./routes/SignUp";
import SignIn from "./routes/SignIn";
import ToDo from "./routes/ToDo";

function App() {
  const token = localStorage.getItem("access_token");

  return (
    <Routes>
      <Route
        path="/signup"
        element={token ? <Navigate replace to={"/todo"} /> : <SignUp />}
      />
      <Route
        path="/signin"
        element={token ? <Navigate replace to={"/todo"} /> : <SignIn />}
      />
      <Route
        path="/todo"
        element={token ? <ToDo /> : <Navigate replace to={"/signin"} />}
      />
    </Routes>
  );
}

export default App;
