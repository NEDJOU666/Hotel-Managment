import React from 'react' 
import './activities.css'
const Activities = () => {
  const Body:React.CSSProperties = {
  }
  return (
    <div>
    <div className="container">
    <div className="activity">
        <b>Dining</b>
        <p>Savor delicious meals at our gourmet restaurant.</p>
    </div>
    <div className="activity">
        <b>live concert</b>
        <p>Enjoy live performance by artists at our stage.</p>
    </div>
    <div className="activity">
        <b>cooking classes</b>
        <p>Learn to cook exquisite dishes with our 5 stars chefs.</p>
    </div>
        <div className="activity">
            <b>Spa Services</b>
            <p>Relax and rejuvenate with our top-notch spa services.</p>
        </div>
        <div className="activity">
            <b>Swimming Pool</b>
            <p>Take a dip in our luxurious swimming pool.</p>
        </div>
        <div className="activity">
            <b>Fitness Center</b>
            <p>Stay fit and active in our state-of-the-art fitness center.</p>
        </div>
        <div className="activity">
            <b>Guided Tours</b>
            <p>Explore the local attractions with our guided tours.</p>
        </div>
        <div className="activity">
            <b>Tennis</b>
            <p> Play tennis on our well designed tennis stadium.</p>
            </div>
    </div>

    </div>
  )
}

export default Activities