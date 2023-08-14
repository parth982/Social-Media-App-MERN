import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Navbar from "./components/global/NavBar";
import StartPage from "./components/Pages/StartPage";
import useStore from "./state/store";

const App = () => {
  const { isLogged } = useStore();

  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<StartPage />} />
        {/* <Route
          path="/home"
          element={isLogged ? <HomePage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/:userId"
          element={isLogged ? <ProfilePage /> : <Navigate to="/" />}
        /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

// import React from "react";
// import Practice from "./components/Practice";

// const App = () => {
//   return (
//     <div>
//       <Practice />
//     </div>
//   );
// };

// export default App;
