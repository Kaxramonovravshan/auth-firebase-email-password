import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../firebase.config";
import { addDoc, collection } from "firebase/firestore";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function register() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const refCollection = collection(firestore, "users");
        addDoc(refCollection, { email, password, uid: res.user.uid }).then(
          (res) => {
            navigate("/login");
          }
        );
      })
      .catch((err) => {
        alert("qayta ruyxatdan ut");
      });
  }

  return (
    <div className="card p-3 mx-auto w-25 mt-5">
      <h1>Register</h1>
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
      <button onClick={register} className="btn btn-dark">
        Register
      </button>
    </div>
  );
};

export default Register;
