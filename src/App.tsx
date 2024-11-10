import { useEffect, useState } from 'react';
import './App.css';

let shoppingListItems: string[];

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [input, setInput] = useState('');
  const [filteredList, setFilteredList] = useState<string[]>([]);
  const [shoppingList, setShoppingList] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.frontendeval.com/fake/food/mi');
      const jsonObject = await response.json();
      if (!Array.isArray(jsonObject)) {
        setError(true);
        return;
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
    }

    const filteredListItems = shoppingListItems.filter((itemString) =>
      itemString.startsWith(inputString)
    );
    setFilteredList(filteredListItems);
  }

  function handleItemSelection(item: string) {
    setShoppingList((currentList) => [...currentList, item]);
    setInput("");
    setFilteredList([]);
  }

  function toggleItemCheck(item: string) {
    setCheckedItems((prevChecked) => ({
      ...prevChecked,
      [item]: !prevChecked[item],
    }));
  }

  function deleteItem(item: string) {
    setShoppingList((currentList) => currentList.filter((i) => i !== item));
  }

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Error</h1>;

  return (
    <div className="App">
      {/* Fixed header container */}
      <div className="header-container">
        <h2>My Shopping List</h2>

        <div className="input-wrapper">
          <input onInput={handleInput} value={input} />

          {filteredList.length > 0 && (
            <ul className="dropdown">
              {filteredList.map((item, index) => (
                <li
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleItemSelection(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Content container with margin to prevent overlap with fixed header */}
      <div className="content-container">
        {shoppingList.length > 0 && (
          <ul className="shopping-list">
            {shoppingList.map((item, index) => (
              <div className="shopping-list-item-entry" key={index}>
                <button onClick={() => toggleItemCheck(item)}>
                  {checkedItems[item] ? "✓" : "○"}
                </button>
                <li style={{ textDecoration: checkedItems[item] ? 'line-through' : 'none', color: checkedItems[item] ? 'gray' : 'black' }}>
                  {item}
                </li>
                <button onClick={() => deleteItem(item)}>x</button>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;