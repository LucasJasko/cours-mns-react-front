export default function Search({ search, setSearch }) {
  function handleSearch(input) {
    setSearch(input);
  }

  return <input type="text" onChange={(e) => handleSearch(e.target.value)} />;
}
