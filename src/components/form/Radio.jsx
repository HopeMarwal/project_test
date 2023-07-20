import '../../assets/styles/formEls.scss'

export default function Radio({ checked, handleChange, item, classTitle, name, img, span, line }) {
  return (
    <label className={classTitle}>
      <input
        type="radio"
        checked={checked}
        onChange={handleChange}
        name={name}
        value={item}
      />
      {span && <span></span>}
      {img && <img src={img} alt={item}/>}
      {line && <div className='line'></div>}
      <p>{item}</p>
    </label>
  )
}
