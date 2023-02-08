'use client'
import Searchbar from '@/components/search/Searchbar'
import { UserContext } from '@/context/user'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
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

export default function Home() {
    const [search, setSearch] = useState({ type: 'landlord', query: '' })
    const [searchData, setSearchData] = useState([])
    const { user } = useContext(UserContext)

    const router = useRouter()

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
        <main>
            <h1>Rental Ratings</h1>
            <section id='search'>
                <h2>Find Reviews for a:</h2>
                <div id='search-selection'>
                    <button
                        id='button-landlord'
                        className={
                            search.type === 'landlord'
                                ? 'button-search selected'
                                : 'button-search'
                        }
                        onClick={() => setSearch({ ...search, type: 'landlord' })}
                    >
                        Landlord
                    </button>
                    <button
                        id='button-property'
                        className={
                            search.type === 'property'
                                ? 'button-search selected'
                                : 'button-search'
                        }
                        onClick={() => setSearch({ ...search, type: 'property' })}
                    >
                        Property
                    </button>
                    <button
                        id='button-city'
                        className={
                            search.type === 'city'
                                ? 'button-search selected'
                                : 'button-search'
                        }
                        onClick={() => setSearch({ ...search, type: 'city' })}
                    >
                        City
                    </button>
                </div>
                <Searchbar
                    type={search.type}
                    showSuggestions={true}
                    suggestions={searchData}
                    onInput={(input) => setSearch({ ...search, query: input })}
                    value={search.query}
                />
            </section>
            <section id='contribute'>
                <h2>Leave a Rating</h2>
                {user ? (
                    <button
                        id='leave-review'
                        onClick={() => router.push('/review-form?id=-1')}
                    >
                        <strong>Leave Review</strong>
                    </button>
                ) : (
                    <button
                        id='register'
                        onClick={() => router.push('/auth?type=register')}
                    >
                        <strong>Register</strong>
                    </button>
                )}

                <p>
                    Users can leave anonymous reviews, edit their past reviews, and rate
                    other users' reviews!

                    City
                </p>
            </section>
        </main >
    )
}
