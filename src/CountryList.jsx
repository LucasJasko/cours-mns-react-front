import { useEffect, useState } from "react";

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCountries = async () => {
    try {
      const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
      console.log(res);
      if (!res.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }
      const data = await res.json();
      console.log(data);
      setCountries(data);
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Country List");
    fetchCountries();
  }, []);

  if (loading) return <p>Chargement des pays...</p>;
  if (error) return <p>Erreur: {error}</p>;

  return (
    <div>
      <h1>Liste des pays</h1>
      <ul>
        {countries.map((country, i) => (
          <li key={i}>{country.name.common}</li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
