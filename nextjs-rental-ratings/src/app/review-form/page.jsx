'use client'

import LandlordAutocomplete from '@/components/autocomplete/Landlord';
import { UserContext } from '@/context/user';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContext, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import './page.css';

export default function ReviewForm() {
    const { user } = useContext(UserContext)
    const [error, setError] = useState({ error: false, message: "" })
    const [address, setAddress] = useState(null)
    const [landlord, setLandlord] = useState(null)
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();


        const sendReview = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/data/leaveReview`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
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
                router.push(`/review-form?id=${resStr}&user=${user}`)
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
                                    selectProps={{address, onChange: setAddress}}
                                />
                            </div>

                            <div id="property-rating-container">
                                <label htmlFor="property_rating">Rating out of 5</label>
                                <input name="property_rating" required="required" type="number" max={5} min={1} />/5 
                            </div>
                            
                            <div id="property-comments-container">
                                <label htmlFor="property_comments">Comments</label>
                                <textarea name="property_comments" />
                            </div>
                        </section>
                        
                        <section id="landlord-review">
                            <h2>Landlord Review</h2>
                            <div id="landlord-organization">
                                <label>Is the landlord an organization?</label>
                                <input type="checkbox" name="is_organization" />
                            </div>

                            <div id="landlord-name-container">
                                <label>Landlord Name</label>
                                <LandlordAutocomplete 
                                    onInput={(e) => setLandlord(e)}
                                />
                            </div>
                            
                            <div id="landlord-rating-container">
                                <label htmlFor="landlord_rating">Rating out of 5</label>
                                <input name="landlord_rating" required="required" type="number" max={5} min={1} />/5
                            </div>

                            <div id="landlord-comments-container">
                                <label htmlFor="landlord_comments">Comments</label>
                                <textarea name="landlord_comments" /> 
                            </div>
                        </section>
                        
                        <button type="submit"><strong>Submit Review</strong></button>
                    </form>
                </section>
            ) : searchParams.get('user') !== user && searchParams.get('id') !== "-1" ? (
                <section>
                    <h1>You do not have access to edit this review!</h1>
                </section>
            ) : (
                <section>
                    {/* Existing review view */}
                </section>
            )}
            
        </main>
    )
}