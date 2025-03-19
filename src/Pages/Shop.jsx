
import {useState} from "react"
const Shop=()=>{
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const handleSumit=(event)=>{
     event.preventDefault()
     if(!email.includes("@")){
        setError ("Invalid email address")
     }else if(name === "") {
        setError ("Name cannot be empty")
     }else{
        setError("");
        alert(`Hello ${name}, your email is ${email}`)
        setEmail("")
        setName("")

     }
    }
    return(
    <div>
        <form onSubmit={handleSumit} className="p-4 bg-white shadow-md rounded-md">
            <label className="block md-2">Email</label>
            <input
            className="border p-2 rounded-md w-full" 
            type="text"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Enter your email"
            />


<label className="block md-2">Name</label>
            <input
            className="border p-2 rounded-md w-full" 
            type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder="Enter your name"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
        </form>
    </div>
    )
}

export default Shop