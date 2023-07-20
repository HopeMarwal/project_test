import { useState, useEffect } from "react"
import '../assets/styles/contactus.scss'

export default function ContactUs() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await (
        await fetch(
          "https://my-json-server.typicode.com/HopeMarwal/next_learn_app/contactUs"
        )
      ).json();

      // set state when the data received
      setData(data)
      
    }

    fetchData()
  }, [])
  return (
    <div className='contact-us'>
      <div className="w-50">
        <h3>{data?.title}</h3>
        <p>{data?.desc}</p>
      </div>

      <div className="w-50">
        <form action="/">
          <div className="form-group">
            <input
              type="text"
              placeholder="Nume/Prenume"
            />
            <input
              type="text"
              placeholder="(+373) __-___-___ "
            />
          </div>
          
          <button className="btn">{data?.btnValue}</button>
        </form>
      </div>

    </div>
  )
}
