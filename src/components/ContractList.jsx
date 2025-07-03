// src/components/ContractList.jsx

import ContractCard from "./ContactCard"; //Import the component we just made

//This component receives the full 'contracts' array as a prop.
function ContractList({ contracts, onDelete }) {
    return (
        <div classname="contract-list">
            {/*We map over the 'contracts' array in our state. For each 'contract' object 
               we create a div with its details. The 'Key' is a special prop React needs 
               for the list to be efficient*/}
            {contracts.map(contract =>(
                //Now instead of writing out the JSX code for displaying each contract, we render the ContractCard component
                //We pass the 'key' and the entire 'contract' object as props down to the child.
                <ContractCard 
                    key={contract.id} 
                    contract={contract}
                    onDelete={() => onDelete(contract.id)}
                />
            ))}
        </div>
    );
}

export default ContractList;