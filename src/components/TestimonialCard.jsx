import React from 'react'

export default function TestimonialCard({ data }) {
  return (
    <div className='testimonial-card'>
      <div className='image'>
        <img src={data.photo} alt={data.name} />
      </div>

      <div className="info">
        <h5>{data.name}</h5>
        <p>{data.rating}</p>
        <p className='text'>{data.text}</p>
      </div>
    </div>
  )
}
