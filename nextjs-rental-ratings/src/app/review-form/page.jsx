'use client'

import LandlordAutocomplete from '@/components/autocomplete/Landlord';
import { UserContext } from '@/context/user';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import './page.css';

export default function ReviewForm() {
    const { user } = useContext(UserContext)
    const [error, setError] = useState({ error: false, message: "" })
    const [address, setAddress] = useState(null)
    const [landlord, setLandlord] = useState(null)
    const [review, setReview] = useState({})
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const getReview = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/data/getReview?reviewID=${searchParams.get('id')}`);
            const resJson = await res.json();

            setReview(resJson);
            setAddress(resJson.placesInfo);
            setLandlord(resJson.landlordName);
        }
        
        if (searchParams.get('id') !== '-1') {
            getReview()
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        const sendReview = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/data/leaveReview`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: searchParams.get('id'),
                    user: user,
                    placesInfo: address,
                    address: address.value.description,
                    propertyRating: e.target.property_rating.value,
                    propertyComments: e.target.property_comments.value,
                    isOrganization: e.target.is_organization.value === "on" ? false : true,
                    landlordName: landlord,
                    landlordCity: address.value.structured_formatting.secondary_text,
                    landlordRating: e.target.landlord_rating.value,
                    landlordComments: e.target.landlord_comments.value
                })
            })

            const resStr = await res.text();
            
            if (resStr === "Could not leave review") {
                setError({ error: true, message: resStr })
            } else {
                setError({ error: false, message: "" })
                router.push(`/userReviews?user=${user}`)
            }
        }

        sendReview();
    }

    return (
        <main>
            {searchParams.get('id') === "-1" || (searchParams.get('edit') === "true" && searchParams.get('user') === user) ? (
                <section>
                    <h1>Leave a Review</h1>

                    <div id="error">
                        {error.error && error.message}
                    </div>

                    <form id="review-form" onSubmit={(e) => handleSubmit(e)}>
                        <section id="property-review">
                            <h2>Property Review</h2>
                            <div id="address-container">
                                <label>Address</label>
                                <GooglePlacesAutocomplete 
                                    apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY}
                                    minLengthAutoComplete={5}
                                    debounce={1500}
                                    selectProps={{defaultInputValue: review?.address, value: address, onChange: setAddress}}
                                />
                            </div>

                            <div id="property-rating-container">
                                <label htmlFor="property_rating">Rating out of 5</label>
                                <input name="property_rating" required="required" type="number" max={5} min={1} defaultValue={review?.propertyRating}/>/5 
                            </div>
                            
                            <div id="property-comments-container">
                                <label htmlFor="property_comments">Comments</label>
                                <textarea name="property_comments" defaultValue={review?.propertyComments} />
                            </div>
                        </section>
                        
                        <section id="landlord-review">
                            <h2>Landlord Review</h2>
                            <div id="landlord-organization">
                                <label>Is the landlord an organization?</label>
                                <input type="checkbox" name="is_organization" defaultValue={review?.isOrganization}/>
                            </div>

                            <div id="landlord-name-container">
                                <label>Landlord Name</label>
                                <LandlordAutocomplete 
                                    onInput={(e) => setLandlord(e)}
                                    value={landlord}
                                />
                            </div>
                            
                            <div id="landlord-rating-container">
                                <label htmlFor="landlord_rating">Rating out of 5</label>
                                <input name="landlord_rating" required="required" type="number" max={5} min={1} defaultValue={review?.landlordRating}/>/5
                            </div>

                            <div id="landlord-comments-container">
                                <label htmlFor="landlord_comments">Comments</label>
                                <textarea name="landlord_comments" defaultValue={review?.landlordComments}/> 
                            </div>
                        </section>
                        
                        <button type="submit"><strong>Submit Review</strong></button>
                        <button type="cancel" onClick={(e) => {e.preventDefault; router.replace(`/userReviews?user=${user}`)}}><strong>Cancel</strong></button>
                    </form>
                </section>
            ) : searchParams.get('user') !== user && searchParams.get('id') !== "-1" ? (
                <section>
                    <h1>You do not have access to edit this review!</h1>
                </section>
            ) : (
                <section>
                    <h2>Property Review</h2>
                    <div id="view-address">
                        <label>Address</label>
                        <input readOnly value={review?.propertyAddress} />
                    </div>

                    <div id="view-rating">
                        <label>Rating</label>
                        <input readOnly value={review?.propertyRating} />/5
                    </div>

                    <div id="view-property-comments">
                        <label>Comments</label>
                        <textarea readOnly value={review?.propertyComments} />
                    </div>

                    <h2>Landlord Review</h2>
                    <div id="view-name">
                        <label>Name</label>
                        <input readOnly value={review?.landlordName} />
                    </div>

                    <div id="view-landord-rating">
                        <label>Rating</label>
                        <input readOnly value={review?.landlordRating} />/5
                    </div>

                    <div id="view-landlord-comments">
                        <label>Comments</label>
                        <textarea readOnly value={review?.landlordComments} />
                    </div>
                </section>
            )}
            
        </main>
    )
}
