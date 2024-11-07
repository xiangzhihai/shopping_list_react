import { useEffect, useState } from 'react';
import './App.css';

let shoppingListItems: string[];

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [input, setInput] = useState("");
  const [filteredList, setFilteredList] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.frontendeval.com/fake/food/mi');
      const jsonObject = await response.json();
      if (!Array.isArray(jsonObject)) {
        setError(true);
        return
      }

      shoppingListItems = jsonObject;
      setLoading(false);
    };

    fetchData();
  }, []);

  function handleInput(event: React.FormEvent<HTMLInputElement>) {
    const inputString: string = event.currentTarget.value;
    setInput(inputString);

    if (inputString.length < 2) {
      setFilteredList([]);
      return;
    };

    const filteredListItems = shoppingListItems.filter((itemString) => itemString.startsWith(inputString));
    console.log(filteredListItems);
    setFilteredList(filteredListItems);
  }

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Error</h1>;

  return (
    <div className="App">
      <header className="App-header">
        <h2>
          My Shopping List
        </h2>
        <input onInput={handleInput} value={input}></input>

        {/* Knownledge point make paragraph*/}
        {filteredList.length > 0 && (
          <ul className='dropdown'>
            {filteredList.map((item, index) => (
              <li key={index} className='dropdown-item'>
                {item}
              </li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
};

export default App;
