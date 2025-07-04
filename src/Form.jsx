import { useEffect, useState } from "react";

export default function Form({ setUsers, users }) {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [country, setCountry] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const updatedUsers = [...users, { name, tel, country }];
    setUsers(updatedUsers);
    setName("");
    setTel("");
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  }

  function handleName(e) {
    const name = e.target.value;
    setName(name);
  }

  function handleCountry(searchValue) {
    setSearchTerm(searchValue);
    const country = e.target.value;
    setCountry(country);
  }

  function handlePhoneNumber(e) {
    const phoneNumber = e.target.value;
    setTel(phoneNumber);
  }

  const fetchCountries = async (searchTerm) => {
    if (searchTerm === "") return setCountries([]);
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${searchTerm}?fields=name,cca3`);
      console.log(res);
      if (!res.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }
      const data = await res.json();
      setCountries(data);
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>
        Nom <br />
        <input type="text" onChange={(e) => handleName(e)} placeholder="Entrez le nom" required />
      </label>
      <label>
        Téléphone <br />
        <input type="text" onChange={(e) => handlePhoneNumber(e)} placeholder="Entrez le numéro de téléphone" required />
      </label>
      <select onChange={(e) => handleCountry(e)}>
        <option value="default">-- Choissiez un pays --</option>
        {countries.map((country, i) => (
          <option key={i} value={country.name.common}>
            {country.name.common}
          </option>
        ))}
      </select>
      <button type="submit">envoyer</button>
    </form>
  );
}
