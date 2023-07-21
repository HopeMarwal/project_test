import { useEffect, useState } from "react"
import arrow from '../assets/icons/arrow.svg'
import OfertaCard from "./OfertaCard"
import '../assets/styles/oferta.scss'


export default function Oferta() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await (
        await fetch(
          "https://my-json-server.typicode.com/HopeMarwal/next_learn_app/oferte"
        )
      ).json();
      // set state when the data received
      setData(data)
    }

    fetchData()
  }, [])

  return (
    <section className='oferta-wrapper'>
      <div className="oferta">

        <div className="oferta_header">
          <h2>Oferte</h2>
          <a href="/">
            Vezi toate ofertele 
            <img src={arrow} alt="Vezi toate ofertele" />
          </a>
        </div>

        <div className="oferta_body">
          {
            data && data.map((oferta) => (
              <OfertaCard data={oferta} key={oferta.id} />
            )) 
          }
        </div>
        
      </div>
    </section>
  )
}
