import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import User from "../src/components/user.jsx";

function App() {

  const [user, setUser] = useState([]);
  const [page, setPage] = useState(1);


  function getData() {
    fetch(`http://localhost:3001/users/list/${page}`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => setUser(data));
  }

  function insertDocument() {
    fetch("http://localhost:3001/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then(() => getData());
  }

  function updateDocument(user) {
    fetch("http://localhost:3001/users/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then(() => getData());
  }

  function deleteDocument(user) {
    fetch("http://localhost:3001/users/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then(() => getData());
  }

  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="wrapper">
      <div className="container">
        <h1 id="title">Usuários</h1>
        {user.map((user) => {
          return (
            <User
              key={user._id}
              user={user}
              updateDocument={updateDocument}
              deleteDocument={deleteDocument}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
