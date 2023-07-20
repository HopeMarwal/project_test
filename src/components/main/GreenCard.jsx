import { useEffect, useState } from 'react'
import '../../assets/styles/main/rca.scss'
import ShowPrice from './ShowPrice'
import Accordion from './Accordion'
import Checkbox from '../form/Checkbox'
import Radio from '../form/Radio'
import Select from '../form/Select'


export default function GreenCard({data, step, setStep, setTotalSteps}) {
  
  const [ forwardBtn, setForwardBtn ] = useState('Inainte')

  const [formData, setFormData] = useState({
    type: '',
    zona: '',
    valabil: ''
  })

  useEffect(() => {
    let arr = []

    for(let i = 0; i < data.progress.length; i++) {
      arr.push( i + 1 )
    }

    setStep(1)
    setTotalSteps(arr)

    return(() => {
      setTotalSteps([])
    })
    
  }, [data.progress.length])

  const handleChangeFormValues = (prop, value) => {
    setFormData({...formData, [prop]: value})
  }

  const handleChangeStep = (direc) => {
    if(direc === 'back') {
      setStep(prev => prev - 1)
      setForwardBtn('Inainte')
    } else {
      switch (true) {
        case (forwardBtn === 'Comandă și achită online'):
          break;
        case (forwardBtn === 'Vezi costul'):
          setForwardBtn('Comandă și achită online')
          break;
        case (step === data.progress.length - 1):
          setStep(prev => prev + 1)
          setForwardBtn('Vezi costul')
          break;
        case (step < data.progress.length):
          setStep(prev => prev + 1)
          break;
        default: return

      }
    }
  }

  return (
    <div className='container green-card'>
    <div className='w-50'>
      <h3>{data.progress[step-1].title}</h3>
    <form action="/">
      {step === 1 && 
        <div className='first'>
          {/* Map over all types of vehicles */}

          {data.progress[0].props.map((item) => (
            <Radio
              key={item.id}
              checked={formData.type === item.title}
              item={item.title}
              name='type'
              span={false}
              img={item.icon}
              handleChange={() => handleChangeFormValues('type', item.title)}
              classTitle={`${formData.type === item.title && 'selected'} custom-radio`}
            />
          ))}
        </div>
      }
      {
        step === 2 && 
        <div className='second'>
          <p className='title'>{data.progress[1].props.zona.title}</p>
          <div className='custom-checkbox_wrap'>
            {
              data.progress[1].props.zona.values.map((item) => (
                <Radio
                  key={item}
                  name='zona'
                  checked={formData.zona === item}
                  item={item}
                  handleChange={() => handleChangeFormValues('zona', item)}
                  classTitle='custom-checkbox'
                  img={false}
                  span
                />
              ))
            }
          </div>

          <p className="title">{data.progress[1].props.valid.title}</p>
          <div className="radio">
            {data.progress[1].props.valid.values.map((item) => (
              <Radio
                key={item.id}
                checked={formData.valabil === item}
                item={item}
                name='valabil'
                img={false}
                span={false}
                handleChange={() => handleChangeFormValues('valabil', item)}
                classTitle={`${formData.year === item && 'selected'}`}
                line
              />
            ))}
          </div>
          
          {/* Show price */}
          {forwardBtn === 'Comandă și achită online' && <ShowPrice total='267' /> }

        </div>
      }

    </form>
    <div className='step-btns'>
      <button
        className='btn btn-outline'
        onClick={() => handleChangeStep('back')}
        disabled={step === 1}
      >
        Inapoi
      </button>
      <button
        disabled = { (step === 1 && !formData.type ) || (step === 2 && (!formData.zona || !formData.valabil) ) }
        className='btn'
        onClick={(e) => handleChangeStep('forward', e.target.value)}
      >
        {forwardBtn}
      </button>
    </div>
    </div>

    <Accordion obiect={data.object} riscs={data.riscs}/>

    

  </div>
  )
}
