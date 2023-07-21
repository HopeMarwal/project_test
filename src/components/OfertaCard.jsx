import arrow from '../assets/icons/arrow.svg'

export default function OfertaCard({ data }) {
  return (
  <div className='oferta-card'>
    <img src={data.img} alt={data.title} />

    <div className="oferta-card_body">
      <h4>{data.title}</h4>
      <p>{data.desc}</p>
      <a href="/">
        {data.link}
        <img src={arrow} alt={data.link} />
      </a>
    </div>

  </div>
  )
}
