// src/components/SearchBar.jsx

function SearchBar({ searchTerm, onSearchChange }){
    return (
        <div className = "search-bar">
            <input
                type="text"
                placeholder="Search by title..."
                value = {searchTerm}
                onChange= {onSearchChange}
            />
        </div>
    );
}

export default SearchBar;