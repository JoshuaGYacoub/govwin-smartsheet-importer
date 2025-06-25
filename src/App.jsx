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

  // Add new state for the search term
  const [searchTerm, setSearchTerm] = useState('');

  // Use the useEffect Hook to load our data when the component first renders.
  useEffect(() => {
    //In a real app, you would fetch the data from an API here.
    //We are simulating an API by calling 'setContracts' with the imported data from the JSON we created.
    setContracts(ContractData);
  },[]); //The empty '[]' dependency array tells react to run this effect only ONCE.

  // This function will be passed down to the SearchBar component
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Derive the filtered list based on current searchTerm
  const filteredContracts = contracts.filter(contracts => 
    contracts.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //3. The return statement contains the JSX (HTML-like code) that this component will display.
  return (
    <div>
      <h1>Contract Sync Portal</h1>
      {/* Render the SearchBar and pass it the necessary Props */}
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange}/>
      {/* Instead of doing .map and getting each contract and displaying them manually, we just send the contracts to ContractList and it seperates each
          contract into its own ContractCard where it is then displayed on the ContractList */}
      {/* Pass 'filteredContracts' down to ContractList instead of just all the contracts to only show contracts based on search */}    
      <ContractList contracts={filteredContracts} />
    </div>
  );
}

export default App
