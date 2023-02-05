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

    const convertDate = (date) => {
        const givenDate = new Date(date);
        return givenDate.getFullYear() + '/' + givenDate.getMonth() + 1 + '/' + givenDate.getDate()
    }

    return (
        <div>
            <h1>{searchParams.get('type') === 'landlord' ? (
                reviewData[0]?.name
            ) : searchParams.get('type') === 'property' ? (
                reviewData[0]?.address
            ) : (
                "City"
            )} Reviews</h1>

            <label>Landlord:</label>
            <p>{reviewData[0]?.landlordName}</p>

            <ul>
                {Array.from(reviewData).map(rev => {
                    if (searchParams.get('type') === 'landlord') {
                        return (
                            <li key={rev.id} className="landlord-review">
                                <div className="rating">{rev.landlordRating}/5</div>
                                <div className="created">{convertDate(rev.createdAt)}</div>
                                <div className="review">{rev.landlordComments}</div>
                            </li>
                        ) 
                    }
                    if (searchParams.get('type') === 'property') {
                        return (
                            <li key={rev.id} className="property-review">
                                <div className="rating">{rev.propertyRating}/5</div>
                                <div className="created">{convertDate(rev.createdAt)}</div>
                                <div className="review">{rev.propertyComments}</div>
                                <div className="landlord-comments">
                                    <label>Comments on landlord</label>
                                    <textarea readOnly value={rev.landlordComments} />
                                </div>
                            </li>
                        )
                    }
                })} 
            </ul>
            
        </div>
    )
}
