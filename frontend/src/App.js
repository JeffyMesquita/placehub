import { useState, useEffect } from "react";
import "./App.css";
import User from "../src/components/user.jsx";

function App() {
  const [user, setUser] = useState([]);

  function getData() {
    fetch("http://localhost:3001/users/list", { method: "GET" })
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
  }, []);

  return (
    <div className="wrapper">
      <h1>Usuários</h1>
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
  );
}

export default App;
