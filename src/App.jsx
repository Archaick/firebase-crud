import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, getDoc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";

const App = () => {
  const [users, setUsers] = useState([]);

  const usersCollectionRef = collection(db, "users");


  useEffect(() => {
    const getUsers = async () => {

      try {
        const data = await getDocs(usersCollectionRef);
        setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
      } catch (err) {
        console.error(err)
      }

    };
    getUsers();
  }, []);

  return (
    <div>
      {users.map((user) => {
        return (
          <div>
            <h1>Name: {user.name}</h1> <h1>Age: {user.age}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default App;
