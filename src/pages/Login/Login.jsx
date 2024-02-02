import React, { useState } from "react";
import { auth } from "../../firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user.uid);
        localStorage.setItem("token", res.user.uid);
        navigate("/admin");
      })
      .catch((err) => {
        navigate("/");
      });
  }

  return (
    <div className="card p-3 mx-auto w-25 mt-5">
      <h3>Login</h3>
      <input
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        className="form-control my-2"
        type="email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        className="form-control mb-2"
        type="password"
      />
      <button onClick={login} className="btn btn-dark">
        login
      </button>
      <h3>
        Account bulmsa{" "}
        <Link className="text-red-800" to={"/register"}>
          register
        </Link>
      </h3>
    </div>
  );
};

export default Login;
