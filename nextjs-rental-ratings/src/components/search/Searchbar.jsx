import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import './search.css'

export default function Searchbar({ type, showSuggestions, suggestions, onInput, value }) {
    const [filteredSuggestions, setFilteredSuggestions] = useState(null);

    const router = useRouter();

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

    let handleSearch = () => {
        router.push(`/search?type=${type}&query=${value}`)
    }

    return (
        <div id="container-searchbar">
            <div id="bar">
                <input 
                    type="search"
                    id="searchbar"
                    placeholder="Search..."
                    onChange={(e) => onInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.code === "Enter") {
                            handleSearch()
                        }
                    }}
                />
                <button
                    id="btn-search"
                    onClick={() => handleSearch()}
                >
                    <img src="/arrow-narrow-right.svg" alt="Search" />
                </button>
            </div>
            {showSuggestions && 
                <ul id="search-dropdown">
                    {filteredSuggestions?.map(sug => {
                        return (
                            <li key={sug.id}>{sug.value}</li>
                        )
                    })}
                </ul>
            }
            
        </div>
    )
}