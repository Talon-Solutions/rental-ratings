
export default function LandlordResult({ data }) {

    return (
        <div className="landlord-result">
            <div className="landlord-name">
                <strong>
                    {data.isOrganization ? (
                        data.organizationName
                    ) : (
                        data.firstName.toUpperCase() + ' ' + data.lastName.toUpperCase()
                    )}
                </strong>
                
            </div>
            <div className="landlord-rating">
                {data.rating}/5
            </div>
            <div className="landlord-cities">
                Properties in: 
                {data.cities?.map(city => {
                    if (city)
                        return (
                            <div>
                                &emsp;{city.City}, {city.Region}
                            </div>
                        )
                })}
            </div>
        </div>
        
    )
}