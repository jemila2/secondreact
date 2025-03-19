
// import {cu} from "react-router-dom";
import { Link } from 'react-router-dom'
import React, { useState, useEffect, Icons } from "react";
// import image1 from './image/cart.PNG'
import image2 from './image/th.JPEG'



import { LiaShoppingCartSolid } from "react-icons/lia";
import { FaRegUserCircle } from "react-icons/fa";
import { FaDollyFlatbed } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { CiSearch  } from "react-icons/ci";




const Navber=()=>{

    // const [currentSlide, setCurrentSlide] = useState(0);


    const [isOpen, setIsOpen] = useState(false);

   const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

 
    const dropdownItems = [
        'Latest and Greatest Tech',
        'Brands',
        'Yes, Best Buy sells that',
        <Link to="/Tshop" className="">Tax Software</Link>,
    
        'Gift Guide'
    ];


    
    return(
<div>
<div className="bg-blue-700 h-30 w-full shadow-md p-4">
       
       <div className="flex justify-between text-white">
       <div className=""></div>
               <div className="mr-2">Ordder Status Blog Best Business Francais</div>
              
       </div>
       {/* <div>{Icons}</div> */}
 {/* <Icons/>   */}
       <div className="flex gap-2 justify-between">
             <div className="flex gap-8">
           {/* <div className="t"> */}
               <img className="h-15" src={image2} alt="" />
           
           {/* </div> */}
      


    <div className="flex items-center border border-gray-300 rounded-l p-2 bg-white shadow-md w-100">
      <input
        type="text"
        className="flex-grow  w-full border-none rounded-l focus:outline-none"
        placeholder="Search Best Buy"
      />
      <button className=" bg-white rounded-lg flex items-center justify-center ml-2">
        <CiSearch className="text-3xl text-blue-800" />
      </button>
    </div>
               {/* </div> */}
           </div>

       <div className="flex mt-3 gap-8 text-white pr-2">
             
       <div className="flex gap-1">
                   {/* <img className="h-10" src={image1} alt="" /> */}
                  < FaDollyFlatbed className="text-3xl"/>
                   <div className="t">Stores</div>
              </div>

              
              <div className="flex gap-1">
                   {/* <img className="h-10" src={image1} alt="" /> */}
                   <FaRegUserCircle className="text-3xl"/>
                   <Link to="/Login" className="">My Best Buy Account</Link>,
                   {/* <div className="">My Best Buy Account</div> */}
              </div>

              <div className="flex gap-1">
                   {/* <img className="h-10" src={image1} alt="" /> */}
                   < LiaShoppingCartSolid className="text-4xl" />
                   <div className="mt-1">Cart</div>
              </div>

              {/* <Link to="Icons" className="font-bold">icons</Link>
              <Link to="Home" className="font-bold">HOME</Link> */}

              <Link to="/" className="font-bold">home</Link>
              <Link to="/Icons" className="font-bold">Cart</Link>
       </div>
       </div>
           </div>
           <div className="bg-blue-800 p-3 flex gap-10 font-semibold text-xl">
           <div className="relative">
            <div
                className="flex gap-1 text-white cursor-pointer"
                onClick={toggleDropdown}
            >
                <div>Shops</div>
                <FaAngleDown className="mt-2" />
            </div>
            {isOpen && (
                <div className="absolute left-0 mt-1 w-60 bg-white text-black rounded-md shadow-lg z-10">
                    {dropdownItems.map((item, index) => (
                        <div 
                            key={index} 
                            className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                            onClick={() => console.log(item)} // Handle item click
                        >
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>


            <div className="flex gap-1 text-white">
                <div>Spring Sale</div>
                <FaAngleDown className="mt-2" />
               
            </div>

            <div className="flex gap-1 text-white">
                <div>Deals</div>
                <FaAngleDown className="mt-2" />
               
            </div>

            <div className="flex gap-1 text-white">
                <div>Outlet</div>
                <FaAngleDown className="mt-2" />
                
            </div>


            <div className="flex gap-1 text-white">
                <div>Services</div>
                <FaAngleDown className="mt-2" />
                
            </div>
           </div>
         
           </div>
   
    )
}
export default Navber;