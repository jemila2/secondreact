
import { useState } from 'react';



const Counter = () => {
    // let count = 0;
    const [count, setCount] = useState(0);
    const [name, setName] = useState("john Doe");

    const incre = () => {
        setCount(count + 1)
    }

    const decre = () => {
      setCount(count - 1)
        
        console.log(count);
      }

        const changeName = () => {
          setName('Gift')
        }
        

   

    
  return (
    <div>
       <p>Count:{count}</p>
       <p>Updateed Name: {name}</p>
       <button onClick={changeName}>Change name</button>
       <br />
        <button onClick={incre}>incre</button>
        <br />
        <button onClick={decre}>decre</button>
        {/* <Counter/> */}
    </div>
    
    
  )
}

export default Counter