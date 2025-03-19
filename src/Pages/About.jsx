// import { useState } from "react"

// const About=()=>{

//     const [formData, setFormData] = useState({
//         firstName: "",
//         lastName: "",
//         userName: "",
//         dob: "",
//         avatar: null,
//         password: "",
//     })

//      const [submittedData, setSumittedData] = useState(null);
//      const [error, setError] = useState("");

//      const handleChange = (e) => {
//         const {name, value} = e.target;
//         setFormData({...formData, [name]: value});
        
//      }

//      const handleFileChange = (e) =>{
//         setFormData({...formData, image: URL.createObjectURL(e.target.files[0])})
//      }

//      const handleSumit=(e)=>{
//         e.preventDefault();
//         if(!formData.firstName || !formData.lastName || !formData.userName || !formData.dob || !formData.avatar || !formData.password) {
//             setError('All files are required');
//             return;
//         }

//         setError("") 
//         setSumittedData(formData);
//         // console.log(formData);

//         setFormData({
//             firstName: "",
//             lastName: "",
//             userName: "",
//             dob: "",
//             avatar: null,
//             password: "",
//         })

        
        
//      }
//     return(

//         <div>
//            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//             <form onSubmit={handleSumit} className="bg-white p-6 rounded-lg shadow-md w-96">
//                 <h2 className="text-2x1 font-bold mb-4 text-center">Register</h2>
//                 {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//                 <input type="text"
//                 className="w-full p-2 border rounded mt-2" 
//                 name="firstName"
//                 placeholder="First Name"
//                 value={formData.firstName}
//                 onChange={handleChange}

//                 />


//                 <input type="text"
//                 className="w-full p-2 border rounded mt-2" 
//                 name="lastName"
//                 placeholder="last Name"
//                 value={formData.lastName}
//                 onChange={handleChange}

//                 />
//                 <input type="text"
//                 className="w-full p-2 border rounded mt-2" 
//                 name="userName"
//                 placeholder="user Name"
//                 value={formData.userName}
//                 onChange={handleChange}
                
//                 />



//              <input type="date"
//                 className="w-full p-2 border rounded mt-2" 
//                 name="dob"
//                 value={formData.dob}
//                 onChange={handleChange}
                
//                 />


//                 <input type="file"
//                 className="w-full p-2 border rounded mt-2" 
//                 name="avatar"
            
//                 onChange={handleChange}
                
//                 />



//                 <input type="password"
//                 className="w-full p-2 border rounded mt-2" 
//                 name="password"
//                 placeholder="password"
//                 value={formData.password}
//                 onChange={handleChange}
                
//                 />
//                 <button className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">Submit</button>
//             </form>
//             {submittedData && (
//     <div className="mt-6 p-4 bg-white shadow-md w-96 text-center">
//         <h2 className="text-xl font-bold">Submitted Data</h2>
        
//         {/* Suppose your submittedData has an image property */}
//         {submittedData.avatar && (
//             <img src={submittedData.avatar} alt="avatar" className="w-20 h-20 mx-auto rounded-full mt-2" />
//         )}

//         {/* Display username and other attributes */}
//         <p><strong>Username:</strong> {submittedData.username}</p>
//         <p><strong>Email:</strong> {submittedData.email}</p>
//         <p><strong>Gender:</strong> {submittedData.gender}</p>
//     </div>
// )}



//             </div> 
//         </div>
//     )
// }

// export default About












import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    dop: '',
    file: '',
    password: '',
    confirmPassword: '',
    gender: '',
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = 'Username is required.';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    if (!formData.gender) {
      newErrors.gender = 'Gender selection is required.';
    }
    if (!formData.terms) {
      newErrors.terms = 'You must accept the terms & conditions.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e) =>{
    setFormData({...formData, avatar: URL.createObjectURL(e.target.file[0])})
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setSuccessMessage('Registration Successful!');
      setErrors({});
      setSubmittedData(formData);  // Save submitted data
      // Reset the form if needed
      setFormData({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        dob:  '',
        file: '',
        password: '',
        confirmPassword: '',
        gender: '',
        terms: false,
      });
    } else {
      setSuccessMessage('');
      setSubmittedData(null);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-lg font-bold mb-4">Registration Form</h2>
      <form onSubmit={handleSubmit}>


      <div className="mb-4">
          <label className="block mb-1">firstname</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="border px-2 py-1 w-full rounded"
          />
          {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
        </div>


        <div className="mb-4">
          <label className="block mb-1">lastname</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="border px-2 py-1 w-full rounded"
          />
          {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="border px-2 py-1 w-full rounded"
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border px-2 py-1 w-full rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>


        <div className="mb-4">
          <label className="block mb-1">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="border px-2 py-1 w-full rounded"
          />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
        </div>



        <div className="mb-4">
          <label className="block mb-1">files</label>
          <input
            type="file"
            name="file"
           
            onChange={handleChange}
            className="border px-2 py-1 w-full rounded"
          />
          {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border px-2 py-1 w-full rounded"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border px-2 py-1 w-full rounded"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>

        <div className="mb-4">
          <p className="block mb-1">Gender</p>
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
              className="form-radio"
            />
            <span className="ml-2">Male</span>
          </label>
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
              className="form-radio"
            />
            <span className="ml-2">Female</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="gender"
              value="other"
              checked={formData.gender === 'other'}
              onChange={handleChange}
              className="form-radio"
            />
            <span className="ml-2">Other</span>
          </label>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
        </div>

        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span className="ml-2">I accept the terms & conditions</span>
          </label>
          {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Register
        </button>
        
        {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
      </form>

      {/* Display submitted data if available */}
      {submittedData && (
                <div className="mt-6 p-4 bg-white shadow-md w-full text-center">
                    <h2 className="text-xl font-bold">Submitted Data</h2>

                   
                   
                    {submittedData.avatar &&  <img src={submittedData.avatar} alt="avatar" className="w-20 h-20 mx-auto rounded-full mt-2" 
                        />
                    }
                    
                    <p><strong>Firstname:</strong> {submittedData.firstname} {submittedData.lastname}</p>
                    {/* <p><strong>lastname:</strong> {submittedData.lastname}</p> */}
                    <p><strong>Username:</strong> {submittedData.username}</p>
                    <p><strong>Date of Birth:</strong> {submittedData.dob}</p>
                    <p><strong>Email:</strong> {submittedData.email}</p>
                    <p><strong>Gender:</strong> {submittedData.gender}</p>
                </div>
            )}
        </div>

  );
};


export default RegistrationForm;  //  const [count, setCount] = useState(3)
    //  const [loggedIn, setLoggedIn] = useState (false)
    //  const [firstName, setFirstName] = useState("")
    //  const [Detail, setDetail] = useState({})
    //  const add=()=>{
    //   setCount(count+1)
    //  }

        //  const [seconds, setSeconds] = useState(0)
  
    // useEffect(()=>{
    //   const interval = setInterval(()=>{
    //     setSeconds((prev)=> prev + 1);
    //   }, 1000);
    //   return ()=> clearInterval(interval);
    // },[])