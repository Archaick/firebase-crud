import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { addDoc, collection, getDoc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";

const App = () => {
  // display users
  const [users, setUsers] = useState([]);

  // add users
  const [newName, setNewName] = useState("");
  const [newAge, setAgeName] = useState("");

  const usersCollectionRef = collection(db, "users");

  // create a user
  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: newAge });
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getDocs(usersCollectionRef);
        // doc.data() doesn't normally add the id number. spread operator used with adjacent id
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (err) {
        console.error(err);
      }
    };
    getUsers();
  }, []);

  return (
    <div>
      <input
        placeholder="name..."
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="age..."
        onChange={(event) => {
          setAgeName(event.target.value);
        }}
      />
      <button onClick={createUser}>Create User</button>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <h1>Name: {user.name}</h1> <h1>Age: {user.age}</h1>{" "}
            <h1>ID: {user.id}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default App;
