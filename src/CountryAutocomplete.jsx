import { useRef } from "react";
import { useCountrySearch } from "./UseCountrySearch";

export function CountryAutoComplete({ value, onChange }) {
  const { searchTerm, setSearchTerm, countries, loading, error } = useCountrySearch();
  const inputRef = useRef(null);

  const handleInputChange = (inputValue) => {
    setSearchTerm(inputValue);
  };

  const handleSelectCountry = (e, countryName) => {
    e.preventDefault();
    onchange(countryName);
    setSearchTerm(countryName);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  return (
    <div>
      <label>
        Pays <br />
        <input ref={inputRef} className="country-input" type="text" onChange={(e) => handleInputChange(e.target.value)} placeholder="Entrez le pays" />
      </label>
      {error && error == "country" && <div className="error">Le pays n'est pas défini</div>}
      <ul style={{ display: "flex", flexWrap: "wrap", padding: "0" }}>
        {countries.map((country, i) => (
          <li style={{ listStyle: "none" }} key={i} value={country.name.common}>
            <button style={{ marginRight: "2px" }} onClick={(e) => handleSelectCountry(e, country.name.common)}>
              {country.name.common}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
