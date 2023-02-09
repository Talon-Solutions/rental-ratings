'use client'
import CityResult from '@/components/results/City'
import LandlordResult from '@/components/results/landlord'
import PropertyResult from '@/components/results/property'
import Searchbar from '@/components/search/Searchbar'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import './page.css'

async function getSearchData(type, query) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER}/data/search?type=${type}&query=${query}`
    )

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default function Search() {
    const searchParams = useSearchParams()
    const [search, setSearch] = useState({
        type: searchParams.get('type'),
        query: searchParams.get('query'),
    })
    const [searchData, setSearchData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            if (search.query !== '') {
                const data = await getSearchData(search.type, search.query)
                if (data) {
                    setSearchData(data)
                } else {
                    setSearchData([])
                }
            }
        }
        fetchData()
    }, [search])

    return (
        <main id='search-results'>
            <Searchbar
                type={searchParams.get('type')}
                showSuggestions={false}
                suggestions={searchData}
                onInput={(input) => setSearch({ ...search, query: input })}
                value={search.query}
            />

            <section id='all-results'>
                <ul>
                    {searchData.map((result) => {
                        return (
                            <li key={result.id}>
                                {search.type === 'landlord' ? (
                                    <LandlordResult data={result} />
                                ) : search.type === 'property' ? (
                                    <PropertyResult data={result} />
                                ) : (
                                    <CityResult data={result} />
                                )}
                            </li>
                        )
                    })}
                </ul>
            </section>
        </main>
    )
}
