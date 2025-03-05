import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";

import { AuthContext, FirebaseContext } from "./store/Context";
import Create from "./Components/Create/Create";
import { PostContextProvider } from "./store/PostContext";

import ViewPost from "./Pages/ViewPost";
import CreatePage from "./Pages/CreatePage";
import LoginPage from "./Pages/Login";
import SignupPage from "./Pages/Signup";

const App = () => {
  const { setUser } = useContext(AuthContext);
  const { auth } = useContext(FirebaseContext);

  useEffect(() => {
    if (!auth) return;

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <PostContextProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create" element={<CreatePage/>} />
          <Route path="/view/:productId" element={<ViewPost/>} />
        </Routes>
      </Router>
    </PostContextProvider>
  );
};

export default App;
