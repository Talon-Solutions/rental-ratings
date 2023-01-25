import Searchbar from '@/components/search/Searchbar'
import './page.css'

export default function Home() {
  return (
    <main>
      <h1>Rental Ratings</h1>
      <section id='search'>
        <h2>Find Reviews for a:</h2>
        <div id='search-selection'>
          <button 
            id='button-landlord'
            className='button-search'  
          >Landlord</button>
          <button 
            id='button-property'
            className='button-search'  
          >Property</button>
          <button 
            id='button-city'
            className='button-search'  
          >City</button>
        </div>
        <Searchbar />
      </section>
      <section id='contribute'>
        <h2>Leave a Rating</h2>
        <button id='register'><strong>Register</strong></button>
        <p>Users can leave anonymous reviews, edit their past reviews, and rate other users' reviews!</p>
      </section>
    </main>
  )
}
