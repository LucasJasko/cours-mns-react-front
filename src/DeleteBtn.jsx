export default function DeleteBtn({ id, setUsers, users }) {
  function deleteUser(id) {
    setUsers(users.filter((item, i) => i !== id));
  }

  return <button onClick={() => deleteUser(id)}>Delete</button>;
}
