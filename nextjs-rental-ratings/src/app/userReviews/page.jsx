'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const fetchReviews = async (user) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER}/data/userReviews?user=${user}`
    )
    const resJson = await res.json()
    return resJson
}

export default function UserReviews() {
    const [userReviews, setUserReviews] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        const getReviews = async () => {
            setUserReviews(await fetchReviews(searchParams.get('user')))
        }
        getReviews()
    }, [])

    const convertDate = (date) => {
        const givenDate = new Date(date)
        return (
            givenDate.getFullYear() +
            '/' +
            givenDate.getMonth() +
            1 +
            '/' +
            givenDate.getDate()
        )
    }

    const handleDelete = async (id) => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_SERVER}/data/deleteReview?reviewID=${id}`
        )
        const resStr = await res.text()
        console.log(resStr)
        setUserReviews(await fetchReviews(searchParams.get('user')))
    }

    return (
        <main>
            <h1>My Reviews</h1>
            <ul>
                {Array.from(userReviews).map((rev) => {
                    return (
                        <li key={rev.reviewID}>
                            <div id='edit-actions'>
                                <button
                                    onClick={() =>
                                        router.replace(
                                            `/review-form?id=${rev.reviewID}&user=${searchParams.get(
                                                'user'
                                            )}&edit=true`
                                        )
                                    }
                                >
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(rev.reviewID)}>
                                    Delete
                                </button>
                            </div>
                            <h2>{convertDate(rev.createdAt)}</h2>
                            <h3>Property</h3>
                            <div id='propertyAddress'>{rev.propertyAddress}</div>
                            <div id='propertyRating'>{rev.propertyRating}</div>
                            <div id='propertyComments'>{rev.propertyComments}</div>
                            <h3>Landlord</h3>
                            <div id='landlordName'>{rev.landlordName}</div>
                            <div id='landlordRating'>{rev.landlordRating}</div>
                            <div id='landlordComments'>{rev.landlordComments}</div>
                        </li>
                    )
                })}
            </ul>
        </main>
    )
}
