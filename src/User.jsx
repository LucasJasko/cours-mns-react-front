export default function User({ id, user, users, setUsers, nbUsers, setNbUsers }) {
  function deleteUser(id) {
    setUsers(users.filter((item, i) => i !== id));
    setNbUsers(nbUsers - 1);
  }

  return (
    <>
      {user}
      <button onClick={() => deleteUser(id)}>Delete</button>
    </>
  );
}
