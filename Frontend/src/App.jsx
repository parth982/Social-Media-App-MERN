import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./components/Pages/HomePage";
import StartPage from "./components/Pages/StartPage";
import useStore from "./state/store";

const App = () => {
  const { isLogged } = useStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route
          path="/home"
          element={isLogged ? <HomePage /> : <Navigate to="/" />}
        />
        {/* <Route
          path="/profile/:userId"
          element={isLogged ? <ProfilePage /> : <Navigate to="/" />}
        /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
