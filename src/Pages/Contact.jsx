import { useState } from "react"
import UserList from "../components/UserList"
// import NormalUser from "../components/Components/NormalUser"

const Contact=()=>{

   const [isLoggedIn, setIsLoggedIn] = useState(false)
   const [number, setNuMeR] = useState(5)
   const [text, setText] = useState("")
   const [user, setuser] = useState("")

   

   const users = [
    {id: 1, name: "Alice", isAdmin: true},
    {id: 2, name: "Hajara", isAdmin: false},
    {id: 3, name: "Emmanuel", isAdmin: true},
    {id: 4, name: "Bob", isAdmin: false}
   ]

   const handleChange = (e) => {
    setText(e.target.value)
   }

   const handleChang = (e) => {
    setuser(e.target.value)
   }


   const checkStatus = () => {
    setIsLoggedIn(!isLoggedIn)


    const checkStatu = () => {
      setNuMeR(10)

      
 
   }

  }
    return(
      <div>

        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <h1 className="text-2x1 font-bold mb-4">User list</h1>
          <ul className="bg-white p-4 rounded-md shadow-md">
            {
              // users.map((user)=>{
              //   if(user.isAdmin === true){
              //     return   <UserList key={user.id}  user={user}/>
              //   }else{
              //     return;
              //   }
              // first name lastname email image
              // })

              users.map((user)=>(
                <li  className="p-2 border-b">{user.name}</li>
              ))
            }
          </ul>
        </div>

<div className="flex flex-col items-center justify-center h-screen bg-gray-100">
  <input type="text" placeholder="Type something.."
  value={text} className="border p-2 rounded-md shdow-md"
  onChange={handleChange}/>

  <p className="mt-4 text-lg font-semibold">you type: {text}</p>

  

  <input type="name" placeholder="Type user Name.."
  value={user} className="border p-2 rounded-md shdow-md"
  onChange={handleChang}/>

  <p className="mt-4 text-lg font-semibold">you type: {user}</p>

  

</div>

        <p>{number}</p>
        <button onClick={checkStatus}>chan</button>
     {isLoggedIn ?    <h1>welcome to contact page</h1>: <h1>please login to view contact page</h1>}
    
        <button onClick={checkStatus} className="p-3 bg-red-500 text-wihte">{isLoggedIn ? "log in": "log out"}</button>
     
      </div>

    )
}

export default Contact




