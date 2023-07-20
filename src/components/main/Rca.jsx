import { useEffect, useState } from 'react'
import '../../assets/styles/main/rca.scss'
import ShowPrice from './ShowPrice'
import Accordion from './Accordion'
import Checkbox from '../form/Checkbox'
import Radio from '../form/Radio'
import Select from '../form/Select'


export default function Rca({ data, step, setStep, setTotalSteps }) {

  const [ forwardBtn, setForwardBtn ] = useState('Inainte')

  const [formData, setFormData] = useState({
    imnatreculat: false,
    posesor: '',
    domiciliu: '',
    type: '',
    numLoc: '',
    numPerson: '',
    stagiul: '',
    pensionar: '',
    contractRca: '',
    remorca: '',
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
  <div className='container rca'>
    <div className='w-50'>
      <h3>{data.progress[step-1].title}</h3>
    <form action="/">
      {
        step === 1 && 
        <div className='thirst'>
          <p className='title'>{data.progress[0].props.imnatreculat.title}</p>
          <div className='custom-checkbox_wrap'>
            {
              data.progress[0].props.imnatreculat.values.map((item) => (
                <Checkbox
                  key={item}
                  checked={formData.imnatreculat}
                  item={item}
                  handleChange={() => setFormData({...formData, imnatreculat: !formData.imnatreculat})}
                />
              ))
            }
          </div>

          <p className='title'>{data.progress[0].props.posesor.title}</p>
          <div className='custom-checkbox_wrap'>
            {
              data.progress[0].props.posesor.values.map((item) => (
                <Radio
                  key={item}
                  name='posesor'
                  checked={formData.posesor === item}
                  item={item}
                  handleChange={() => handleChangeFormValues('posesor', item)}
                  classTitle='custom-checkbox'
                  img={false}
                  span
                />
              ))
            }
          </div>
          
          <p className="title">{data.progress[0].props.domiciliu.title}</p>
          <input
            type="text"
            placeholder='Alte localitati'
            value={formData.domiciliu}
            onChange={(e) => setFormData({...formData, domiciliu: e.target.value})}
          />
        </div>
      }
      {step === 2 && 
        <div className='second'>
          {/* Map over all types of vehicles */}

          {data.progress[1].props.map((item) => (
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

      {step === 3 && 
        <div className='third'>
          {/* Locuri */}
          <Select
            title={data.progress[2].props[0].name}
            value={formData.numLoc || 'Selecteaza o optiune'}
            mapItems={data.progress[2].props[0].options}
            prop='numLoc'
            handleChange={handleChangeFormValues}
          />

          {/* Persoane */}
          <Select
            title={data.progress[2].props[1].name}
            value={formData.numPerson || 'Selecteaza o optiune'}
            mapItems={data.progress[2].props[1].options}
            prop='numPerson'
            handleChange={handleChangeFormValues}
          />

          {/* Stage */}
          <Select
            title={data.progress[2].props[2].name}
            value={formData.stagiul || 'Selecteaza o optiune'}
            mapItems={data.progress[2].props[2].options}
            prop='stagiul'
            handleChange={handleChangeFormValues}
          />
        </div>
      }
      {
        step === 4 && 
        <div className="forth">

          {/* Sunteti pensionar sau aveti grad de invaliditate? */}
          <p className='title'>{data.progress[3].props[0].name}</p>
          <div className='custom-checkbox_wrap'>
            {
              data.progress[3].props[0].options.map((item) => (
                <Radio
                  key={item}
                  name='pensionar'
                  checked={formData.pensionar === item}
                  item={item}
                  handleChange={() => handleChangeFormValues('pensionar', item)}
                  classTitle='custom-checkbox'
                  img={false}
                  span
                />
              ))
            }
          </div>

          {/* Aţi mai încheiat contract de asigurare RCA?? */}
          <p className='title'>{data.progress[3].props[1].name}</p>
          <div className='custom-checkbox_wrap'>
            {
              data.progress[3].props[1].options.map((item) => (
                <Radio
                  key={item}
                  name='contract'
                  checked={formData.contractRca === item}
                  item={item}
                  handleChange={() => handleChangeFormValues('contractRca', item)}
                  classTitle='custom-checkbox'
                  img={false}
                  span
                />
              ))
            }
          </div>

          {/* Asigurare pentru remorci */}
          <p className='title'>{data.progress[3].props[2].name}</p>
          <div className='custom-checkbox_wrap'>
            {
              data.progress[3].props[2].options.map((item) => (
                <Radio
                  key={item}
                  name='remorca'
                  checked={formData.remorca === item}
                  item={item}
                  handleChange={() => handleChangeFormValues('remorca', item)}
                  classTitle='custom-checkbox'
                  img={false}
                  span
                />
              ))
            }
          </div>

          {/* Show price */}
          {forwardBtn === 'Comandă și achită online' && <ShowPrice total='1056' /> }

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
        disabled = { (step === 1 && (!formData.imnatreculat || !formData.posesor || !formData.domiciliu )) || (step === 2 && !formData.type ) || (step === 3 && (!formData.numLoc || !formData.numPerson || !formData.stagiul )) || (step === 4 && (!formData.pensionar || !formData.contractRca || !formData.remorca ))}
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
