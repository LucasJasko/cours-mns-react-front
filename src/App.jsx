import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import UserList from "./UserList";
import Button from "./Button";
import SpecialButton from "./SpecialButton";
import { useState } from "react";
import Form from "./Form";

function App() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState(["John Doe", "Jack Jones", "Michel Prépu"]);
  const [nbUsers, setNbUsers] = useState(users.length);
  const [phoneNumber, setPhoneNumber] = useState("");

  function addUser(user) {
    setUsers((prev) => [...prev, user]);
  }
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Button addUsers={addUser} />
      <UserList users={users} setUsers={setUsers} nbUsers={nbUsers} setNbUsers={setNbUsers} phoneNumber={phoneNumber} />
      <SpecialButton count={count} setCount={setCount} />
      <Form setPhoneNumber={setPhoneNumber} />
    </>
  );
}

export default App;
