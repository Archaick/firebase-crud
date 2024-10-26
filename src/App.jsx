import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
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
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
  };

  // update user collection
  const updateUser = async (id, age) => {
    const userDoc = doc(db, 'users', id)
    const newFields = {age: age + 1}
    await updateDoc(userDoc, newFields)
  }

  // Delete user
  const deleteUser = async (id) => {
    const userDoc = doc(db, 'users', id)
    await deleteDoc(userDoc)
  }

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
  }, [usersCollectionRef]);

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
            <h1>Name: {user.name}</h1> <h1>Age: {user.age}</h1>
            <h1>ID: {user.id}</h1>
            <button onClick={() => {updateUser(user.id, user.age)}}>Increase Age</button>
            <button onClick={() => {deleteUser(user.id)}}>Delete User</button>
          </div>
        );
      })}
    </div>
  );
};

export default App;
