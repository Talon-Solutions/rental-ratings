import { useRouter } from 'next/navigation';

export default function LandlordResult({ data }) {
    const router = useRouter();

    let handleShowReviews = () => {
        router.push(`/reviews?type=landlord&id=${data.id}`)
    }

    return (
        <div 
            onClick={() => handleShowReviews()}
            className="landlord-result">
            <div className="landlord-name">
                <strong>
                    {data.name}
                </strong>
                
            </div>
            <div className="landlord-rating">
                {data.rating}/5
            </div>
            <div className="landlord-city">
                {data.city}
            </div>
        </div>
        
    )
}
