
export default function LandlordResult({ data }) {

    return (
        <div className="landlord-result">
            <div className="landlord-name">
                {data.isOrganization ? (
                    data.organizationName
                ) : (
                    data.firstName.toUpperCase() + ' ' + data.lastName.toUpperCase()
                )}
            </div>
            <div className="landlord-rating">
                {data.rating}
            </div>
            <div className="landlord-cities">
                
            </div>
        </div>
        
    )
}