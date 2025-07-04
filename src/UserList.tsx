import User from "./User";

export default function UserList({ users, setUsers }) {
  return (
    <div className="card">
      <h2>User List: ({users.length})</h2>
      {users.length === 0 && <p>No users found</p>}
      <ul>
        {users.map((item, index) => (
          <li key={index}>
            <User id={index} user={item.name} users={users} setUsers={setUsers} phoneNumber={item.phoneNumber} country={item.country} />
          </li>
        ))}
      </ul>
    </div>
  );
}
