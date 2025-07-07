import {useState, useEffect} from 'react';
import ContractData from './mock-govwin-data.json'; //JSON Storing Fake Structured Data we made up
import ContractList from './components/ContractList'; // Import list component that stores each contract
import SearchBar from './components/SearchBar'; // Import Search Bar component
import './App.css';

function App() {
  // Create a state variable called 'contract' to store our array of contracts.
  //   Its inital  value is an empty array []
  //   'setContracts' is the function we will use to update it.
  const [contracts, setContracts] = useState([]);
  //------------------------

  // Add new state for the search term
  const [searchTerm, setSearchTerm] = useState('');
  //------------------------

  // Add new state for the sort order, empty string in this case is to mark default order
  const[sortKey, setSortKey] = useState('');
  //------------------------

  // Add new state to hold the ID for the contract being edited, null means no contract is being edited
  const [editingId, setEditingId] = useState(null);
  //------------------------

  // Use the useEffect Hook to load our data when the component first renders.
  useEffect(() => {
    //In a real app, you would fetch the data from an API here.
    //We are simulating an API by calling 'setContracts' with the imported data from the JSON we created.
    setContracts(ContractData);
  },[]); //The empty '[]' dependency array tells react to run this effect only ONCE.
  //------------------------

  // This function will handle the frontend deletion of a specific Contract in the ContractList
  const handleDelete = (idToDelete) => {
    setContracts(currentContracts => 
      currentContracts.filter(contract => contract.id !== idToDelete)
    );
  };
  //------------------------

  // This function will handle the frontend "On Save" functionality after saving an edit 
  const handleUpdate = (idToUpdate, updatedData) => {
    setContracts(currentContracts =>
      currentContracts.map(contract => {
        if (contract.id === idToUpdate){
          return {...contract, ...updatedData};
        }
        return contract;
      })
    );
    setEditingId(null);
  };
  //------------------------

  // This function will be passed down to the SearchBar component
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  //------------------------

  // Derive the filtered list based on current searchTerm
  const filteredContracts = contracts.filter(contracts => 
    contracts.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  //------------------------

  // Derive the filtered list based on any sort and searchTerm
  const sortedAndFilteredContracts = [...filteredContracts].sort((a,b) => {
    if(sortKey === 'title'){
      //localeCompare is a standard way to compare strings alphabetically
      return a.title.localeCompare(b.title);
    }
    else if( sortKey === 'postDate'){
      // To sort by date, we convert the date strings to Date Objects.
      // We then "subtract" them, b-a gives decending order (newest first)
      return new Date(b.postDate) - new Date(a.postDate);
    }
    // If no "sortKey" is set, dont change order
    return 0;
  });
  //------------------------

  // The return statement contains the JSX (HTML-like code) that this component will display.
  return (
    <div>
      <h1>Contract Sync Portal</h1>

      {/* Render the SearchBar and pass it the necessary Props */}
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange}/>

      {/* Render the Sorting Options */}
      <div className="sort-button">
        <button onClick={() => setSortKey('title')}>Sort by Title</button>
        <button onClick = {() => setSortKey('postDate')}>Sort by Date</button>
        <button onClick={() => setSortKey('')}>Reset Sort</button>
      </div>

      {/* Instead of doing .map and getting each contract and displaying them manually, we just send the contracts to ContractList and it seperates each
          contract into its own ContractCard where it is then displayed on the ContractList */}
      {/* Pass 'sortedAndFilteredContracts' down to ContractList instead of just all the contracts to only show contracts based on search and any filters */}    
      <ContractList 
        contracts={sortedAndFilteredContracts} 
        onDelete={handleDelete}
        editingId={editingId}
        setEditingId={setEditingId}
        onSave={handleUpdate}
      />
    </div>
  );
}

export default App
