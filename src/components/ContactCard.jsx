// src/components/ContractCard.jsx

// We receive "props" as an argument. We are "destructuring" the 'contract' object
// out of the props object, which is a common and clean way to access props

function ContractCard({ contract, onDelete }){
    return (
        <div className ="contract-item">
            <h2>{contract.title}</h2>
            <p><strong>Agency:</strong> {contract.agency}</p>
            <p><strong>Posted On:</strong> {contract.postDate}</p>

            {/* Button that calls the "onDelete" function when clicked */}
            <button onClick={onDelete} className = "delete-btn">Delete</button>
        </div>
    );
}

export default ContractCard;