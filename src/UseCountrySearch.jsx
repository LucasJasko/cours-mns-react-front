import { useEffect, useRef, useState } from "react";

export function useCountrySearch(delay = 500) {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const timeoutRef = useRef(null);

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
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => fetchCountries(searchTerm), 500);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [searchTerm, delay]);

  return {
    searchTerm,
    setSearchTerm,
    countries,
    loading,
    error,
    setError,
  };
}
