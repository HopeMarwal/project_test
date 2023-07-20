import { useEffect, useState } from 'react';
import '../assets/styles/home.scss'
//Components
import Casco from './main/Casco';

export default function Home() {

  const [mainData, setData] = useState(null)
  const [ rca, setRca ] = useState(null)
  const [ greenCard, setGreenCard ] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('casco')
  const [ steps, setTotalSteps ] = useState([])
  const [ step, setStep ] = useState(1)

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch(
          "https://my-json-server.typicode.com/HopeMarwal/instagramm_clone/main"
        )
      ).json();

      // set state when the data received
      setData(data);
    };

    const fetchGreenCard = async () => {
      const data = await (
        await fetch(
          "https://my-json-server.typicode.com/HopeMarwal/fake_api/main"
        )
      ).json();

      // set state when the data received
      console.log(data)
      //setData(data);
    }

    dataFetch();
    fetchGreenCard()

  }, [])

  const handleChangeCategory = (category) => {
    console.log(category)
    setSelectedCategory(category.toLocaleLowerCase())
  }


  return (
    <section>
      <aside>
        left
      </aside>

      <div className='wrapper'>

        <div className="header-banner">
          <h3>Alege tipul de asigurare</h3>
          <ul>
            {
              mainData?.categories.map((category) => (
                <li
                  key={category.id}
                  className={`${category.title.toLocaleLowerCase() === selectedCategory.toLocaleLowerCase() && 'selected'}`}
                  onClick={() => handleChangeCategory(category.title)}
                >
                  <span>{category.title}</span>
                </li>
              ))
            }
          </ul>
        </div>

        <div className='wrapper_category'>
          {mainData && selectedCategory === 'casco' && 
            <Casco
              data={mainData?.casco}
              step={step}
              setStep={setStep}
              setTotalSteps={setTotalSteps}
            />
          }
        </div>
      </div>

      <aside>
        <div className='progress-bar'>
         
          <div className='step_container'>
            {/* map */}
            {
              steps.map((item) => (
                <div key={item} className='step-wrapper'>

                <div className={`${step >= item && 'completed'} step-style`}>
                  {step > item 
                    ? <div className='check-mark'>L</div>
                    :<div className='step-count'>{item}</div>
                  }
                </div>
                
                <div className={`${step > item  && 'completed'} progress-line`}>
                  <div></div>
                </div>

              </div>
              ))
            }
            
          </div>
          
        </div>
      </aside>
    </section>
  )
}
