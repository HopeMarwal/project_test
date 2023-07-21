//Styles
import '../assets/styles/embla.css'
import '../assets/styles/testimonials.scss'
//react Hooks
import { useEffect, useState } from "react"
//Components
import TestimonialCard from "./TestimonialCard.jsx"
import Carousel from "./Carousel.tsx"
import { Rating } from "react-simple-star-rating";

export default function Testimonials() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await (
        await fetch(
          "https://my-json-server.typicode.com/HopeMarwal/next_learn_app/testimonials"
        )
      ).json();
      // set state when the data received
  
      let array = [ data.slice(0,4), data.slice(4,8), data.slice(8,) ]
      console.log(array)

      setData(array)
    }

    fetchData()
  }, [])

  return (
    <section className='bg-lgray'>
      <div className="testimonials">
        <h3>Recenziile clientilor</h3>
        <Carousel>
        {
          data?.map((item, index) => (
            <div key={index} className="testimonials_wrapper">
              {item.map((card) => (
                <TestimonialCard key={card.id} data={card} />
              ))}
            </div>
          ))
        }
        </Carousel>
      </div>
        
    </section>
  )
}
