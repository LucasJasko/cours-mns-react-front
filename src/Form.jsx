import { useEffect, useRef, useState } from "react";
import { useCountrySearch } from "./UseCountrySearch";
import { CountryAutoComplete } from "./CountryAutocomplete";

export default function Form({ setUsers, users }) {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    tel: "",
  });

  const { searchTerm, setSearchTerm, countries, loading, error, setError } = useCountrySearch();

  // Le useRef peut servir dans deux cas, lorsqu'on veut identifier un élément dans le DOM même si il n'existe plus, c'est une sorte de sauvegarde

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name.trim()) return setError("name");
    if (!formData.tel.trim()) return setError("tel");
    if (!formData.country.trim()) return setError("country");

    const updatedUsers = [...users, formData];
    setUsers(updatedUsers);
    setSearchTerm("");
    setFormData({
      name: "",
      country: "",
      tel: "",
    });
    setCountries([]);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  }

  return (
    <form onSubmit={handleSubmit} className="form" noValidate>
      <label>
        Nom <br />
        <input type="text" onChange={(e) => setFormData([...prev, { name: e.target.value }])} placeholder="Entrez le nom" />
      </label>
      {error && error == "name" && <div className="error">Le nom n'est pas défini</div>}
      <label>
        Téléphone <br />
        <input type="text" onChange={(e) => setFormData([...prev, { tel: e.target.value }])} placeholder="Entrez le numéro de téléphone" />
      </label>
      {error && error == "tel" && <div className="error">Le téléphone n'est pas défini</div>}
      <CountryAutoComplete value={formData.country} onChange={(e) => setFormData([...preview, { country: e }])} />
      <button type="submit">envoyer</button>
    </form>
  );
}
