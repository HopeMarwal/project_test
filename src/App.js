import './assets/styles/global.scss';
import { useEffect } from 'react';
import Nav from './components/Nav';
import Main from './components/Main';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch(
          "https://my-json-server.typicode.com/HopeMarwal/project_test/posts"
        )
      ).json();

      // set state when the data received
      console.log(data);
    };

    dataFetch();
  }, [])


  return (
    <div className="App">
      <Nav />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
