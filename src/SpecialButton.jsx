const SpecialButton = ({ count, setCount }) => {
  return (
    <div>
      <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      <p>
        Edit <code>src/App.jsx</code> and save to test HMR
      </p>
    </div>
  );
};

export default SpecialButton;
