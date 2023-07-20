import '../../assets/styles/main/accordion.scss'
import { useState } from 'react'
import close from '../../assets/icons/close.svg'


export default function Accordion({obiect, riscs}) {
  // Move to sepaate accordion component
  const [ isObjOpen, setIsObjOpen ] = useState(true)
  const [ isRiskOpen, setIsRiskOpen ] = useState(false)

  return (
    <div className='w-50'>

      <div className='accordion obj'>

        <div className="accordion_header" >
          <h6 onClick={() => setIsObjOpen(prev => !prev)}>Obiectul asigurării</h6>
          <button onClick={() => setIsObjOpen(false)}>
            <img src={close} alt='close accordion object' />
          </button>
        </div>

        <div className='border-bt'></div>

        <div className={`${isObjOpen && 'active'} accordion_body-wrapper`}>
          <div className='accordion_body'>
            {
              obiect.map((item, index) => (
                <p key={index}>{item}</p>
              ))
            }
          </div>
        </div>
      </div>

      <div className='accordion risk'>

        <div className="accordion_header" >
          <h6 onClick={() => setIsRiskOpen(prev => !prev)}>Riscuri și obligațiuni</h6>
          <button onClick={() => setIsRiskOpen(false)}>
            <img src={close} alt='close accordion object' />
          </button>
        </div>

        <div className='border-bt'></div>

        <div className={`${isRiskOpen && 'active'} accordion_body-wrapper`}>
          <div className='accordion_body'>
            {
              riscs.map((item, index) => (
                <>
                {
                  item.title ? <p key={index}>{item.title}</p> : <p key={index}>{item}</p>
                }
                
                <ul>
                  {item.list && item.list.map((li) => (
                    <li key={li}><p>{li}</p></li>
                  ))
                  }
                </ul>
                
                </>
                
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}
