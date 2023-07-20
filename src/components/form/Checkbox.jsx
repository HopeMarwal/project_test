import '../../assets/styles/formEls.scss'

export default function Checkbox({ checked, handleChange, item }) {
  return (
    <label className="custom-checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      <span></span>
      <p>{item}</p>
    </label>
  )
}
