import { useEffect, useState } from 'react';
import '../assets/styles/home.scss'
//Components
import Casco from './main/Casco';

export default function Home() {

  const [mainData, setData] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('casco')

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch(
          "https://my-json-server.typicode.com/HopeMarwal/instagramm_clone/main"
        )
      ).json();

      // set state when the data received
      console.log(data)
      setData(data);
    };

    dataFetch();
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
          {mainData && selectedCategory === 'casco' && <Casco data={mainData?.casco} />}
        </div>
      </div>

      <aside>
        progress
      </aside>
    </section>
  )
}
