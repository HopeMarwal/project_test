import { useEffect, useState } from 'react'
import '../../assets/styles/main/casco.scss'
import ShowPrice from './ShowPrice'
import Accordion from './Accordion'
import Radio from '../form/Radio'
import Select from '../form/Select'

export default function Casco ({ data, step, setStep, setTotalSteps }) {

    const [ itemsModelMap, setItemsModal] = useState([])
    const [ forwardBtn, setForwardBtn ] = useState('Inainte')
    const [formData, setFormData] = useState({
      type: '',
      marca: '',
      model: '',
      year: '',
      marketPrice: 0,
      territory: '',
      franshise: ''
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

    useEffect(() => {
      let newItems  = []
      switch(formData.marca.toLocaleLowerCase()) {
        case 'alfa romeo': newItems = data.progress[1].props.marca[0].models
          break;
        case 'bentley': newItems = data.progress[1].props.marca[1].models
          break;
        case 'bmw':newItems = data.progress[1].props.marca[2].models
          break;
        case 'chevrolet': newItems = data.progress[1].props.marca[3].models
          break;
        default: newItems = []
          break;
    } 
    setItemsModal(newItems)
    }, [formData.marca, data.progress])
  
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

    const handleSelectMarca = (prop, value) => {
      setFormData({...formData, marca: value, model: ''})
    }
    
    return (
      <div className='container'>
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
          {step === 2 && 
            <div className='second'>
              {/* Marca */}
              <Select
                title='Marca'
                value={formData.marca.toLocaleUpperCase() || 'Introduceți marca'}
                mapItems={data.progress[1].props.marca}
                prop='marca'
                handleChange={handleSelectMarca}
              />

              {/* Models */}
              <Select
                title='Model'
                value={formData.model.toLocaleUpperCase() || 'Introduceți model'}
                mapItems={itemsModelMap}
                prop='model'
                handleChange={handleChangeFormValues}
              />
              
              {/* Map radio buttons to select year */}
              <p className="title">Anul producerii</p>
              <div className="radio">
              
              {data.progress[1].props.years.map((item) => (
                <Radio
                  key={item.id}
                  checked={formData.year === item}
                  item={item}
                  name='year'
                  img={false}
                  span={false}
                  handleChange={() => handleChangeFormValues('year', item)}
                  classTitle={`${formData.year === item && 'selected'}`}
                  line
                />
              ))}
              </div>
            </div>
          }
          {
            step === 3 && 
            <div className='third'>
              <label>
                <p className='title'>Valoarea de piață ( € )</p>
                <input
                  type='text'
                  value={formData.marketPrice}
                  onChange={(e) => setFormData({...formData, marketPrice: e.target.value})}
                />
              </label>

              <p className='title'>Teritoriul de acoperire CASCO</p>
              <div className='custom-checkbox_wrap'>
                {
                  data.progress[2].props.territory.map((item) => (
                    <label className="custom-checkbox">
                      <input
                        name='territory'
                        type="radio"
                        checked={formData.territory === item}
                        onChange={() => setFormData({...formData, territory: item})}
                      />
                      <span></span>
                      <p>{item}</p>
                    </label>
                  ))
                }
              </div>

              <p className="title">Franșiza</p>
              <div className='custom-checkbox_wrap'>
                {
                  data.progress[2].props.franchise.map((item) => (
                    <label className="custom-checkbox">
                      <input
                        name='franchise'
                        type="radio"
                        checked={formData.franshise === item}
                        onChange={() => setFormData({...formData, franshise: item})}
                      />
                      <span></span>
                      <p>{item}</p>
                    </label>
                  ))
                }
              </div>

              {/* Show price */}
              {forwardBtn === 'Comandă și achită online' && <ShowPrice total='569' /> }
              
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
            disabled = { (step === 1 && !formData.type) || (step === 2 && (!formData.marca || !formData.model || !formData.year)) || (step === 3 && (!formData.marketPrice || !formData.territory || !formData.franshise ))}
            className='btn'
            onClick={(e) => handleChangeStep('forward', e.target.value)}
          >
            {forwardBtn}
          </button>
        </div>
        </div>

          <Accordion obiect={data.object} riscs={data.riscs} />

      </div>
    )
  }