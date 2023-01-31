'use client'

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

async function fetchData(type, id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/data/getReviews?searchType=${type}&id=${id}`);
  
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
  
    return res.json();
  }

export default function Reviews() {
    const searchParams = useSearchParams();
    const [reviewData, setReviewData] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            const data = await fetchData(searchParams.get('type'), searchParams.get('id'));
            console.log(data)
            if (data) {
                setReviewData(data);
            } else {
                setReviewData([]);
            }
        }

        fetchReviews()
    }, [])

    return (
        <div>
            <h1>{reviewData[0].firstName + ' ' + reviewData[0].lastName} Reviews</h1>

            <ul>
                {reviewData[0].reviews.map(review => {
                    return (
                        <li>
                            <div className='rating'>{review.landlordRating}/5</div>
                            <div className='created'>{review.createdOn}</div>
                            <div className="review">{review.landlordReview}</div>
                        </li>
                    )
                })}
            </ul>
            
        </div>
    )
}