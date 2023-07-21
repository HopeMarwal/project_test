import StarRatings from "react-star-ratings"

export default function TestimonialCard({ data }) {
  return (
    <div className='testimonial-card'>
      <div className='image'>
        <img src={data.photo} alt={data.name} />
      </div>

      <div className="info">
        <h5>{data.name}</h5>
        
        <StarRatings 
          rating={data.rating}
          starDimension="20px"
          starSpacing="2px"
          starRatedColor="#E8A412"
          starEmptyColor="#E7E5E4"
          
        />
        <p className='text'>{data.text}</p>
      </div>
    </div>
  )
}
