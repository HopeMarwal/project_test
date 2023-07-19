import { useEffect, useState } from 'react'
import '../assets/styles/nav.scss'

export default function Nav() {
    const [navData, setNavData] = useState(null)
    const [isMenuOpen, setIsMenuOpen] = useState(true)

    const session = null
    useEffect(() => {
        const dataFetch = async () => {
          const data = await (
            await fetch(
              "https://my-json-server.typicode.com/HopeMarwal/project_test/nav"
            )
          ).json();
    
          // set state when the data received
          console.log(data)
          setNavData(data);
        };
    
        dataFetch();
      }, [])
  
  if(!navData) {
    return 'Loading'
  }
  return (
    <nav>

      <div className='burger-btn'>
        <button onClick={() => setIsMenuOpen(true)}>
          <img src={navData?.burgerBtn} alt='open menu button'/>
        </button>
      </div>

      {/* Menu */}
      {isMenuOpen && 
        <div className='menu'>
          <div className='menu-header'>
            <button onClick={() => setIsMenuOpen(false)}>
              <img src={navData?.closeBtn} alt='close menu button' />
            </button>
            <h2>Menu</h2>
          </div>

          <ul className="menu-body">
            {
              navData.menu.map((item) => (
                // Enable router to push link 
                <li className='menu_item' key={item.id}>
                  <img src={item.img} alt={item.text} />
                  <p>{item.text}</p>
                </li>
              ))
            }
          </ul>

          <div className="lang">
            <p>Рус</p>|
            <p>Ro</p>
          </div>

          <div className='menu-footer'>
            {
              navData.contacts.map((item) => (
                <div key={item.value}>
                  <img src={item.icon} alt='contact' />
                  <p>{item.value}</p>
                </div>
              ))
            }
          </div>

        </div>

      }

      <div className="logo">
        <img src={navData?.logoBtn} alt='minicode logo' />
      </div>

      <div className="line"></div>

      <h3> {navData?.heading} </h3>

      <div className="line"></div>

      {/* If logged in display log out btn*/}
      {session ? '' :
        <div className='not-loggedin'>

          <div className='btn-log-wrapper'>
            <img src={navData?.singIn.icon} alt='logare' />
            <p>{navData?.singIn.text}</p>
          </div>

          <div className='btn-log-wrapper'>
            <img src={navData?.singUp.icon} alt='logare' />
            <p>{navData?.singUp.text}</p>
          </div>
        </div>
      }
    </nav>
  )
}
