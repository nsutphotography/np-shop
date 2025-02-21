import React, { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useProducts } from "../../context/ProductContext/ProductContext";

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState("");
    const { searchProducts } = useProducts()
    const handleSearch = () => {
        if (query.trim() !== "") {
            console.log("Searching for:", query);
            searchProducts(query)
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <TextField
            variant="outlined"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            fullWidth
            InputProps={{
                inputProps: { "aria-label": "search products" }, // Moved inside InputProps
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleSearch}>
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />

    );
};

export default SearchBar;
