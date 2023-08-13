import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Navbar from "./components/global/NavBar";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<LoginPage />} /> */}
        {/* <Route
          path="/home"
          element={isAuth ? <HomePage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/:userId"
          element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
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
