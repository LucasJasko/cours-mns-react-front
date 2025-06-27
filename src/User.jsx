export default function User({ id, user, users, setUsers, nbUsers, setNbUsers, phoneNumber }) {
  function deleteUser(id) {
    setUsers(users.filter((item, i) => i !== id));
    setNbUsers(nbUsers - 1);
  }

  return (
    <>
      {user}
      <br />
      {phoneNumber}
      <br />
      <button onClick={() => deleteUser(id)}>Delete</button>
    </>
  );
}
