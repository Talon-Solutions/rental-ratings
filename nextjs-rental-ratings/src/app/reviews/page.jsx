'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import './page.css'

async function fetchData(type, id) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER}/data/getReviews?searchType=${type}&id=${id}`
    )

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default function Reviews() {
    const searchParams = useSearchParams()
    const [reviewData, setReviewData] = useState([])

    useEffect(() => {
        const fetchReviews = async () => {
            const data = await fetchData(
                searchParams.get('type'),
                searchParams.get('id')
            )
            console.log(data)
            if (data) {
                setReviewData(data)
            } else {
                setReviewData([])
            }
        }

        fetchReviews()
    }, [])

    const convertDate = (date) => {
        const givenDate = new Date(date)
        let month = givenDate.getMonth() + 1 
        let day = givenDate.getDate()
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day 
        }
        return (
            givenDate.getFullYear() +
            '/' +
            month +
            '/' +
            day
        )
    }

    return (
        <main className='reviews'>
            <h1>
                {searchParams.get('type') === 'landlord'
                    ? reviewData[0]?.name
                    : searchParams.get('type') === 'property'
                        ? reviewData[0]?.address
                        : 'City'}{' '}
                Reviews
            </h1>

            <ul>
                {Array.from(reviewData).map((rev) => {
                    if (searchParams.get('type') === 'landlord') {
                        return (
                            <li key={rev.id} className='landlord-review'>
                                <div className='rating'>{rev.landlordRating}/5</div>
                                <div className='created'>
                                    <em>{convertDate(rev.createdAt)}</em>
                                </div>
                                <div className='review'>{rev.landlordComments}</div>
                            </li>
                        )
                    }
                    if (searchParams.get('type') === 'property') {
                        return (
                            <li key={rev.id} className='property-review'>
                                <div className='property-rating'>{rev.propertyRating}/5</div>
                                <div className='rev-created'><em>{convertDate(rev.createdAt)}</em></div>
                                <div className='property-comments'>{rev.propertyComments}</div>
                                <div className='owner-review'>
                                    <label><strong>Landlord:</strong></label>
                                    <div className='landlord-name'>{rev.landlordName}</div>
                                    <div className='landlord-rating'>{rev.landlordRating}/5</div>
                                    <div className='landlord-comments'>{rev.landlordComments}</div>
                                </div>
                            </li>
                        )
                    }
                })}
            </ul>
        </main>
    )
}
