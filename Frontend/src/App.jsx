import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import StartPage from "./components/Pages/StartPage";
import HomePage from "./components/Pages/HomePage";
import useStore from "./state/store";

const App = () => {
  const { isLogged } = useStore();
  console.log(isLogged);

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
