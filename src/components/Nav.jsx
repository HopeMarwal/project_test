import React, { useEffect } from 'react'

export default function Nav() {
    useEffect(() => {
        const dataFetch = async () => {
          const data = await (
            await fetch(
              "https://my-json-server.typicode.com/HopeMarwal/project_test/nav"
            )
          ).json();
    
          // set state when the data received
          console.log(data);
        };
    
        dataFetch();
      }, [])
  return (
    <nav>Nav</nav>
  )
}
