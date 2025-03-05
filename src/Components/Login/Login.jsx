import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../store/Context";
import Logo from "../../../assets/images/olx-logo.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"; 

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth } = useContext(FirebaseContext);
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="loginParentDiv">
      <img width="200px" height="200px" src={Logo} alt="Logo" />
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <br />
        <input
          className="input"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          className="input"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
      <a href="/signup">Signup</a>
    </div>
  );
};

export default Login;
