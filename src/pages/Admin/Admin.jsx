import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { action } from "../../utils/redux/todoReducer/todoReducer";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../firebase.config";

const Admin = (props) => {
  const navigate = useNavigate();
  const [emailUser, setEmailUser] = useState("");
  const refCollection = collection(firestore, "users");

  useEffect(() => {
    const token = localStorage.getItem("token");
   

    const q = query(refCollection, where("uid", "==", token));

    getDocs(q).then((res) => {
      setEmailUser(res.docs[0].data())
    });

    props.loadTodos();
  }, []);

  function logout() {
    signOut(auth);
    navigate("/");
  }

  return (
    <>
      <button onClick={logout} className="btn btn-danger">
        {" "}
        Log Out
      </button>
      <h1>{emailUser.email}</h1>
      <div className="card p-3 w-25 mx-auto">
        <div className="card-header">Add Todo</div>
        <div className="card-body">
          <input
            value={props.inpVal}
            onChange={(e) => props.getValue(e.target.value)}
            className="form-control mb-2"
            type="text"
          />
          <button
            onClick={() =>
              props.saveTodo({ title: props.inpVal, status: false })
            }
            className="btn btn-dark"
          >
            save
          </button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.todos.map((itm) => (
            <tr key={itm.id}>
              <td>
                <input type="checkbox" checked={itm.status} />
              </td>
              <td>{itm.title}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => props.delItem(itm.id)}
                >
                  X
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => props.editItem(itm)}
                >
                  edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default connect((state) => ({ ...state.todo }), action)(Admin);
