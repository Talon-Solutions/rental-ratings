import { useRouter } from 'next/navigation'

export default function PropertyResult({ data }) {
    const router = useRouter()

    let handleShowReviews = () => {
        router.push(`/reviews?type=property&id=${data.id}`)
    }

    return (
        <div onClick={() => handleShowReviews()} className='property-result'>
            <div className='property-address'>
                <strong>{data.address}</strong>
            </div>
            <div className='property-rating'>{data.rating}/5</div>
        </div>
    )
}
