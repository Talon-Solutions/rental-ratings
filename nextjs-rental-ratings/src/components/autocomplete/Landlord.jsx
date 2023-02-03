import { useEffect, useState } from "react"

async function getSearchData(type, query) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/data/search?type=${type}&query=${query}`);
  
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
  
    return res.json();
}

export default function LandlordAutocomplete({ onInput }) {
    const [suggestions, setSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(true)
    const [search, setSearch] = useState(null)
    const [isHovering, setIsHovering] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            if (search && showSuggestions) {
                const data = await getSearchData('landlord', search);
                if (data) {
                    let limitedSuggestions = [];
                    for (let i=0; i < 11; i++) {
                        if (data[i]) {
                            limitedSuggestions.push(data[i].name)
                        }
                        
                    }
                    setSuggestions(limitedSuggestions)
                    setShowSuggestions(true)
                } else {
                    setSuggestions([])
                    setShowSuggestions(false)
                }
            }
        }

        fetchData()
    }, [search])


    return (
        <div id="landlord-autocomplete">
            <input 
                type="search"
                id="landlord-search"
                placeholder="Landlord Name..."
                value={search}
                onChange={(e) => {
                    onInput(e.target.value.toUpperCase())
                    setSearch(e.target.value.toUpperCase())
                    setShowSuggestions(true)
                }}
                onBlur={() => {
                    if (!isHovering) {
                        setShowSuggestions(false)
                    }
                }}
            />

            {showSuggestions && (
                <ul id="suggestions">
                    {suggestions?.map(sug => {
                        return (
                            <li onClick={() => {
                                onInput(sug.toUpperCase())
                                setSearch(sug.toUpperCase())
                                setShowSuggestions(false)
                            }}
                            onMouseOver={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                            >{sug}</li>
                        )
                    })}
                </ul>
            )}
            
        </div>
    )
}