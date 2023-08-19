import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./components/Pages/HomePage";
import StartPage from "./components/Pages/StartPage";
import useStore from "./state/store";

const App = () => {
  const [storeInitialized, setStoreInitialized] = useState(false);
  const { isLogged } = useStore();

  // Initialize the store before rendering the component
  useEffect(() => {
    // You might need to adjust this logic based on your actual store initialization
    useStore.getState();
    setStoreInitialized(true);
  }, []);

  if (!storeInitialized) {
    // You can show a loading state or spinner while initializing
    return <div>Loading...</div>;
  }

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
