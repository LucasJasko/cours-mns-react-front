import { useState } from "react";

export default function Form({ setPhoneNumber }) {
  const [queryPhoneNumber, setQueryPhoneNumber] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setPhoneNumber(queryPhoneNumber);
  }
  function handlePhoneNumber(e) {
    setQueryPhoneNumber(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Phone Number
        <input type="text" onChange={(e) => handlePhoneNumber(e)} placeholder="Entrez le numéro de téléphone" required />
      </label>
      <br />
      <label>
        User
        <input type="text" onChange={(e) => handleUserNumber(e)} placeholder="Entrez le numéro d'utilisateur" required />
      </label>
      <br />
      <input type="submit" value="envoyer" />
    </form>
  );
}
