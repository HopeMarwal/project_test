import img from '../../assets/icons/image.png'
export default function ShowPrice({ total }) {
  return (
    <div className='show-price'>
        <p>{total} $</p>
        <p>+</p>
        <img src={img} alt="24 hours delivery" />
        <span>Livrare gratuită</span>
    </div>
  )
}
