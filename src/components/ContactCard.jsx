// src/components/ContractCard.jsx
import { useState } from 'react';

// We receive "props" as an argument. We are "destructuring" the 'contract' object
// out of the props object, which is a common and clean way to access props
function ContractCard({ contract, onDelete, isEditing, onEdit, onSave, onCancel }){

    const [editData, setEditData] = useState({
        title: contract.title,
        agency: contract.agency,
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEditData(prevData => ({...prevData, [name]: value}));
    };

    // Show edit card when in edit mode
    if(isEditing){
        return (
            <div className="contract-item">
                <input
                    type = "text"
                    name = "title"
                    value = {editData.title}
                    onChange = {handleInputChange}
                />
                <input
                    type = "text"
                    name = "agency"
                    value = {editData.agency}
                    onChange={handleInputChange}
                />

                {/* Button that will call the "handleUpdate" function back in Apps.jsx, drills from the ContractList */}
                <button onClick={() => onSave(contract.id, editData)} className="save-btn">Save</button>
                {/* Button that will set the "setEditingId" to null and closing the edit mode */}
                <button onClick={onCancel} className = "cancel-btn">Cancel</button>

            </div>
        );
    }
    //------------------------

    // If not in editing mode, show normal card view
    return (
        <div className ="contract-item">
            <h2>{contract.title}</h2>
            <p><strong>Agency:</strong> {contract.agency}</p>
            <p><strong>Posted On:</strong> {contract.postDate}</p>

            {/* Button that calls the "onEdit" function when clicked */}
            <button onClick={onEdit} className="edit-btn">Edit</button>

            {/* Button that calls the "onDelete" function when clicked */}
            <button onClick={onDelete} className = "delete-btn">Delete</button>
        </div>
    );
}

export default ContractCard;