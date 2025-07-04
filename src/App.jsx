import "./App.css";
import UserList from "./UserList";
import SpecialButton from "./SpecialButton";
import { useEffect, useState } from "react";
import Form from "./Form";
import Timer from "./Timer";
import Search from "./Search";

export default function App() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user) => {
    user.name.toLowerCase().includes(search.toLowerCase()) || user.tel.includes(search) || user.country.toLowerCase();
  });

  // USEEFFECT EXECUTE DU CODE APRES LE RENDU DE LA PAGE
  useEffect(() => {
    const local = localStorage.getItem("users");
    if (local) setUsers(JSON.parse(local));
  }, []);

  return (
    <>
      <UserList users={users} setUsers={setUsers} />
      <Form setUsers={setUsers} users={users} />
      <SpecialButton count={count} setCount={setCount} />
      <Timer />
      <Search search={search} setSearch={setSearch} />
      {/* <CountryList /> */}
    </>
  );
}
