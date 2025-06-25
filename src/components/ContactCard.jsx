// src/components/ContractCard.jsx

// We receive "props" as an argument. We are "destructuring" the 'contract' object
// out of the props object, which is a common and clean way to access props

function ContractCard({ contract }){
    return (
        <div className ="contract-item">
            <h2>{contract.title}</h2>
            <p><strong>Agency:</strong> {contract.agency}</p>
            <p><strong>Posted On:</strong> {contract.postDate}</p>
        </div>
    );
}

export default ContractCard;