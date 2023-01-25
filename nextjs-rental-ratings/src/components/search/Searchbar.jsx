import { useEffect, useState } from 'react'
import './search.css'

export default function Searchbar({ type, suggestions, onInput }) {
    const [filteredSuggestions, setFilteredSuggestions] = useState(null);

    useEffect(() => {
        let limitedSuggestions = [];
        if (type === "landlord") {
            for (let i=0; i < 11; i++) {
                if (suggestions[i]) {
                    if (suggestions[i].isOrganization) {
                        limitedSuggestions.push({ id: suggestions[i].id, value: suggestions[i].organizationName.toUpperCase() })
                    } else {
                        limitedSuggestions.push({ id: suggestions[i].id, value: suggestions[i].firstName.toUpperCase() + ' ' + suggestions[i].lastName.toUpperCase() })
                    }
                }
                
            }
        }

        setFilteredSuggestions(limitedSuggestions);
        

    }, [suggestions])

    return (
        <div id="container-searchbar">
            <div id="bar">
                <input 
                    type="search"
                    id="searchbar"
                    placeholder="Search..."
                    onChange={(e) => onInput(e.target.value)}
                />
                <button
                    id="btn-search"
                >
                    <img src="/arrow-narrow-right.svg" alt="Search" />
                </button>
            </div>

            <ul id="search-dropdown">
                {filteredSuggestions?.map(sug => {
                    return (
                        <li>{sug.value}</li>
                    )
                })}
            </ul>
        </div>
    )
}