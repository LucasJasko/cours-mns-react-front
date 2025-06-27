import User from "./User";

export default function UserList({ users, setUsers, nbUsers, setNbUsers }) {
  return (
    <div className="card">
      <h2>User List: {nbUsers}</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <User id={index} user={user} users={users} setUsers={setUsers} nbUsers={nbUsers} setNbUsers={setNbUsers} />
          </li>
        ))}
      </ul>
    </div>
  );
}
