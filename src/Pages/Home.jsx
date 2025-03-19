import { Link } from 'react-router-dom';
import image4 from './image/ban.png'
import image5 from './image/koodo.PNG'
import image6 from './image/happy.PNG'
import image7 from './image/marr.PNG'
import image8 from './image/comput1.JPG'
import image9 from './image/ang.PNG'
import image10 from './image/baby-20250307-ybbst-baby-basics-m.jpg'
import image11 from './image/pa-20250307-offer-hp-pa-on-sale-4col-m.jpg'
import image12 from './image/sportsandrec-20250307-offer-spring-sale-etransportation-4col-m.jpg'
import image13 from './image/outdoor-living-20240220-sbc-icon.jpg'
import image14 from './image/18658427.jpeg'
import image15 from './image/luggage-evergreen-category-icon-luggage-bags.jpg'
import image16 from './image/home-comfort-16042483-sbc-icon.jpeg'
import image17 from './image/di-evergreen-category-icon-cameras-drones.jpg'
import image18 from './image/15545205.jpg'
import image19 from './image/ht-20240705-homepage-sbc-icon.jpg'
import image20 from './image/computing-evergreen-category-icon-computers-and-tablets.jpg'
import image21 from './image/computing-evergreen-icon-computer-accessories.jpg'
import image22 from './image/homepage-shopbycategory-pa-on-sale.jpg'
import image23 from './image/15929829_1.jpg'
import image24 from './image/wi-20240223-icon-cellphones-and-accessories.jpg'
import image25 from './image/majorapps-icon.jpg'
import image26 from './image/17234373.jpg'
import image27 from './image/vacuums-sbc-icon-12370687.jpeg'
import image28 from './image/17477496.jpg'
import image29 from './image/computing-evergreen-category-icon-pc-gaming.jpg'
import image30 from './image/sh-20240112-icon-hp-smart-home-white.jpg'
import image31 from './image/vg-20250214-fsl-mar10-day-xs.jpg'
import image32 from './image/vg-evergreen-fsl-logo-mario-day-en.png'
import image33 from './image/logo-apple.jpg'
import image34 from './image/logo-lenovo.jpg'
import image35 from './image/logo-samsung.jpg'
import image36 from './image/logo-google.jpg'
import image37 from './image/logo-meta.png'
import image38 from './image/logo-breville.jpg'
import image39 from './image/global-latest-and-greatest-dark-blue-title-bg-xs.jpg'
import image40 from './image/ang.PNG'
import image41 from './image/global-latest-and-greatest-dark-blue-offerlist-bg-xs.jpg'
import image42 from './image/jemi2.jpg'
import image43 from './image/ang.PNG'
import image44 from './image/computing-250304-offer-ipad-air-4col-m.jpg'
import image45 from './image/computing-20250304-offer-ipad-11-4col-m.jpg'
import image46 from './image/wi-20250219-offer-iphone-16e-white-launch-4col-m.jpg'
import image47 from './image/global-evergreen-offer-refurbished-4col-m-en.png'
import image48 from './image/global-evergreen-offer-ybbst-2col-m-en.jpg'
// import i1 from './src/Pages/image/17291109.jpg'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
// import image49 from './'
// import { CiStar } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { FaAngleRight } from "react-icons/fa6";
import { LiaTruckMovingSolid } from "react-icons/lia";
import { LiaUndoAltSolid } from "react-icons/lia";
import { RiChatVoiceAiLine } from "react-icons/ri";
import image3 from './image/ima.svg'
import {FaAngleDown} from "react-icons/fa"
import React from 'react';
// import Slider from "react-slick"; // Import react-slick
// import image32 from './path_to_your_image'; 
import {useState} from "react"
import Slider from "react-slick"; // Import react-slick
// import { FaAngleDown } from "react-icons/fa";
// import { CiStar } from "react-icons/ci";
import { IoCheckmarkOutline } from "react-icons/io5";
// Import your images
import i1 from './image/17291109.jpg';
import i2 from './image/16011638.jpg';
import i3 from './image/17291110.jpg';
import i4 from './image/14933485.jpg';
import i5 from './image/17811119.jpg';
import i6 from './image/19180065.jpg';
import i7 from './image/18905513.jpg';
import i8 from './image/14933485.jpg';
import is9 from './image/15545205.jpg';
import is10 from './image/15829800.jpeg';
import is11 from './image/18595100.jpeg';
import is12 from './image/18595100.jpeg';
import is13 from './image/18246162.jpg';
import is14 from './image/17916312.jpg';
import is15 from './image/18657710.jpeg';
import is16 from './image/15565583.jpg';
import is17 from './image/18595100.jpeg';
import is18 from './image/15829800.jpeg';
import is19 from './image/14933485.jpg';
import is20 from './image/17916312.jpg';

import is1 from './image/15446190.jpg';
import is2 from './image/computing-evergreen-category-icon-pc-gaming.jpg';
import is3 from './image/18245681.png';
import is4 from './image/19193940.jpeg';
import is5 from './image/15446190.jpg';
import is6 from './image/17746698.jpeg';
import is7 from './image/18599449.png';
import is8 from './image/15386732.jpg';

import i21 from './image/sh-20240112-icon-hp-smart-home-white.jpg';
import is22 from './image/16455592.webp';
import is33 from './image/wi-20240223-icon-cellphones-and-accessories.jpg';
import is44 from './image/sh-20240112-icon-hp-smart-home-white.jpg';
import is55 from './image/di-evergreen-category-icon-cameras-drones.jpg';
import is66 from './image/17980595.jpeg';
import is77 from './image/16455592.webp';
import is88 from './image/17083783.jpg';
import is99 from './image/18245681.png';




const Home=()=>{



    
const [slides, setSlides] = useState([
     
    <img className='w-60 rounded-t-lg mt-3' src={is9} alt="" />, 
    <img className='w-60 rounded-t-lg mt-3' src={is10} alt="" />, 
    <img className='w-60 rounded-t-lg mt-3' src={is11} alt="" />, 
    <img className='w-60 rounded-t-lg mt-3' src={is12} alt="" />, 
    <img className='w-60 rounded-t-lg mt-3' src={is13} alt="" />, 
    <img  className='w-60 rounded-t-lg mt-3' src={is14} alt="" />, 
    <img  className='w-60 rounded-t-lg mt-3' src={is15} alt="" />, 
    <img  className='w-60 rounded-t-lg mt-3' src={is16} alt="" />, 
    <img  className='w-60 rounded-t-lg mt-3' src={is17} alt="" />, 
    <img className='w-60 rounded-t-lg mt-3' src={is18} alt="" />, 
    <img className='w-60  rounded-t-lg mt-3' src={is19} alt="" />, 
    <img  className='w-60  rounded-t-lg mt-3' src={is20} alt="" />, 
    
    
   
  
  ]);





const [slidess, setSlidess] = useState([
<img className='w-60 rounded-t-lg mt-3' src={i8} alt="" />, 
  <img className='w-60 rounded-t-lg mt-3' src={i2} alt="" />, 
  <img className='w-60 rounded-t-lg mt-3' src={i3} alt="" />, 
  <img className='w-60 rounded-t-lg mt-3' src={i3} alt="" />, 
  <img className='w-60 rounded-t-lg mt-3' src={i7} alt="" />, 
  <img className='w-60 rounded-t-lg mt-3' src={i3} alt="" />, 
  <img  className='w-60 rounded-t-lg mt-3' src={i5} alt="" />, 
  <img  className='w-60 rounded-t-lg mt-3' src={i6} alt="" />, 
  <img  className='w-60 rounded-t-lg mt-3' src={i7} alt="" />, 
  <img  className='w-60 rounded-t-lg mt-3' src={i2} alt="" />, 
  <img className='w-60 rounded-t-lg mt-3' src={i1} alt="" />, 
  <img className='w-60  rounded-t-lg mt-3' src={i7} alt="" />, 
  <img  className='w-60  rounded-t-lg mt-3' src={i4} alt="" />, 
  
  
 

]);

// const ImageSlider = () => {
    const [slidesy, setSlidesy] = useState([
      <img className='w-50 rounded-t-lg mt-3  border-2 border-t-gray-500  border-l-gray-500  border-r-gray-500' src={is1} alt="" />,
      <img className='w-50 rounded-t-lg mt-3 border-2 border-t-gray-500  border-l-gray-500  border-r-gray-500' src={is2} alt="" />,
      <img className='w-50 rounded-t-lg mt-3 border-2 border-t-gray-500 border-l-gray-500  border-r-gray-500' src={is3} alt="" />,
      <img className='w-50 rounded-t-lg mt-3 border-2 border-t-gray-500 border-l-gray-500  border-r-gray-500' src={is4} alt="" />,
      <img className='w-50 rounded-t-lg mt-3 border-2 border-t-gray-500 border-l-gray-500  border-r-gray-500' src={is5} alt="" />,
      <img className='w-50 rounded-t-lg mt-3 border-2 border-t-gray-500 border-l-gray-500  border-r-gray-500' src={is6} alt="" />,
      <img className='w-50 rounded-t-lg mt-3 border-2 border-t-gray-500 border-l-gray-500  border-r-gray-500' src={is7} alt="" />,
      <img className='w-50 rounded-t-lg mt-3 border-2 border-t-gray-500  border-l-gray-500  border-r-gray-500' src={is8} alt="" />,
      <img className='w-50 rounded-t-lg mt-3 border-2 border-t-gray-500  border-l-gray-500  border-r-gray-500' src={is9} alt="" />,
    ]);


    const [slidesyy, setSlidesyy] = useState([
        <img className='w-50 rounded-t-lg mt-3  border-2 border-t-gray-500  border-l-gray-500  border-r-gray-500' src={i21} alt="" />,
        <img className='w-50 rounded-t-lg mt-3 border-2 border-t-gray-500  border-l-gray-500  border-r-gray-500' src={is22} alt="" />,
        <img className='w-50 rounded-t-lg mt-3 border-2 border-t-gray-500 border-l-gray-500  border-r-gray-500' src={is33} alt="" />,
        <img className='w-50 rounded-t-lg mt-3 border-2 border-t-gray-500 border-l-gray-500  border-r-gray-500' src={is44} alt="" />,
        <img className='w-50 rounded-t-lg mt-3 border-2 border-t-gray-500 border-l-gray-500  border-r-gray-500' src={is55} alt="" />,
        <img className='w-50 rounded-t-lg mt-3 border-2 border-t-gray-500 border-l-gray-500  border-r-gray-500' src={is66} alt="" />,
        <img className='w-50 rounded-t-lg mt-3 border-2 border-t-gray-500 border-l-gray-500  border-r-gray-500' src={is77} alt="" />,
        <img className='w-50 rounded-t-lg mt-3 border-2 border-t-gray-500  border-l-gray-500  border-r-gray-500' src={is88} alt="" />,
        <img className='w-50 rounded-t-lg mt-3 border-2 border-t-gray-500  border-l-gray-500  border-r-gray-500' src={is99} alt="" />,
      ]);


  const addSlidesy = () => {
    setSlidesy([
      ...slidesy, 
      `src/Pages/image/17291109.jpg+${slides.length + 1}`, // Corrected concatenation
      `src/Pages/image/17291109.jpg+${slides.length + 2}`, // Corrected concatenation
      `src/Pages/image/17291109.jpg+${slides.length + 3}`, // Corrected concatenation
      `src/Pages/image/17291109.jpg+${slides.length + 4}`, // Corrected concatenation
    ]);
  };

const addSlidess = () => {
  setSlidess([
    ...slidess, 
    `src/Pages/image/17291109.jpg+${slides.length + 1}`, // Corrected concatenation
    `src/Pages/image/17291109.jpg+${slides.length + 2}`, // Corrected concatenation
    `src/Pages/image/17291109.jpg+${slides.length + 3}`, // Corrected concatenation
    `src/Pages/image/17291109.jpg+${slides.length + 4}`, // Corrected concatenation
  ]);
};


const addSlides = () => {
    setSlides([
      ...slides, 
      `src/Pages/image/17291109.jpg+${slides.length + 1}`, // Corrected concatenation
      `src/Pages/image/17291109.jpg+${slides.length + 2}`, // Corrected concatenation
      `src/Pages/image/17291109.jpg+${slides.length + 3}`, // Corrected concatenation
      `src/Pages/image/17291109.jpg+${slides.length + 4}`, // Corrected concatenation
    ]);
  };
     

      const carouselConfig = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 3000,
        // pauseOnHover: true, // Pause autoplay on hover
    };


    const carouselConfigg = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 3000,
        // pauseOnHover: true, // Pause autoplay on hover
    };
    
    //   const carouselConfig = {
    //     dots: true,
    //     infinite: true,
    //     speed: 100,
    //     slidesToShow: 2,
    //     slidesToScroll: 2,
    //   };


//   const products = [
//     { id: 1, name: 'Apple machBook Air 15.3"', price: '$1,699.99', image: im1 },
//     { id: 2, name: 'Apple machBook Air 15.3"', price: '$1,699.99', image: im2 },
//     { id: 3, name: 'Apple machBook Air 15.3"', price: '$1,699.99', image: im3 },
//     { id: 4, name: 'Apple machBook Air 15.3"', price: '$1,699.99', image: im4 },
//     // Add more products as necessary...
//   ];



   // Carousel settings
   const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 4, // Adjust based on your design
    slidesToScroll: 4,
};

// Alternative approach with comments

      
      const divStyle = {
          backgroundImage: `url(${image31})`,
          backgroundSize: 'cover', // Cover the entire area
          backgroundPosition: 'center', // Center the background image
          height: '70vh', // Set height as needed
          width: '100%', // Set width as needed
      };
  
      const divStyl = {
          backgroundImage: `url(${image39})`,
          backgroundSize: 'cover', // Cover the entire area
          backgroundPosition: 'center', // Center the background image
          height: '25vh', // Set height as needed
          width: '100%', // Set width as needed
      };
  
      const divSty = {
          backgroundImage: `url(${image41})`,
          backgroundSize: 'cover', // Cover the entire area
          backgroundPosition: 'center', // Center the background image
          height: '75vh', // Set height as needed
          width: '100%', // Set width as needed
      };
  return(
      
      
      
    <div>
        <div className="p-3 bg-white flex justify-center gap-15 font-bold">
              <div className="flex">
                <div className="t">Save</div>
                <div className="text-blue-400">13%</div>
                <div className="t">Save 13%  on select TurboTax Software</div>
              </div>

              <div>
                <img className='h-6 w-20' src={image3} alt="" />
              </div>
              <div className="flex">
              <div className="text-blue-400">Shop now</div>
              <FaAngleDown className="text-blue-400 mt-2"/>
              </div>
              
           </div>
                 <div className="border-b border-gray-300"></div>
      
                 <div className="flex h-150 w-full gap-6 p-5 ">
                 <div className="h-150 w-2/1 bg-white ">
                 <div className="bg-blue-800 h-50 w-full">
                 <img className='h-90 ml-30' src={image4} alt="" />
                 </div>
                 <div className="bg-blue-900 w-full h-100">
                 <div className="flex text-4xl font-bold pt-30 ml-40 gap-3 ">
              <div className="text-white">Spring</div>
              <div className="text-amber-300">Sales</div>
          </div>
          
          <button className="bg-red-700 p-1 text-white font-bold ml-60 mt-3">On Now</button>
          <div className="text-4xl text-white w-120 text-center font-bold ml-10">Get charged up with huge deals on fresh tech.</div>
          <button className="bg-white p-4 text-black font-bold ml-55 mt-3">Shop Now</button>
                 </div>
      
                
          
         
      </div>
                  <div className="h-100 w-2/1">
                <div className="h-73 w-full bg-blue-800 flex p-6">
                <div className="h-60 w-1/2 bg-blue-800 mt-7">
                     <div className="text-2xl font-bold text-white">Get 60GB of data for $39/month with select carriers.*</div>
                     <div className="text-white mt-3">Pluse, get more exclusive deals in-store.</div>
                     <button className="bg-white p-2 text-blue-600 font-bold  mt-3">Explore the Deals</button>
                     </div>
         
                     <div className="h-60 w-1/2 bg-blue-800 mt-7">
                        <img src={image5} alt="" />
                        </div>
                </div>
                  <div  className="h-71 w-full  flex  bg-white mt-6 gap-6">
                 <div className="h-71 w-2/1 bg-amber-300 ">
                 <img className='h-40 ml-15' src={image6} alt="" />
                 <div className="text-black text-center w-65 ml-6 font-semibold">Get $90 in value with this Nintendo Switch bundle, plus other deals.</div>
                 <button className="bg-blue-800 p-2 text-black font-bold ml-25 mt-3">Shop Now</button>
                 </div>
                 <div className="h-71 w-2/1 bg-blue-800">
                 <img className='h-40 ml-20' src={image7} alt="" />
                 <div className="text-1xl font-bold w-70 text-center text-white ml-5">Save up to $700 on select big screen TVs.</div>
                 <button className="bg-white p-2 text-black font-bold ml-30 mt-3">Shop Now</button></div>
                
                
                  </div>
                  </div>
                 </div>
      
                 <div className="text-3xl text-black mt-20 text-center font-bold">Our hottest offers</div>
      
                 <div className="p-6 flex gap-6">
                  <div className="bg-blue-800 h-50 w-80">
                      <img src={image8} alt="" />
                      <div className="text-xl font-semibold">Save up to $200 on select laptops.</div>
                      <div className="flex">
                      <div className="text-blue-600 text-1xl">Shop now</div>
                      <img className='h-3 mt-2 font-bold' src={image9} alt="" />
                      </div>
                      
                  </div>
      
                  <div className="bg-blue-800 h-50 w-80">
                      <img className='h' src={image10} alt="" />
                      <div className="text-xl font-semibold">Save up to 36% on select headphones and speakers.</div>
                      <div className="flex">
                      <div className="text-blue-600 text-1xl">Shop now</div>
                      <img className='h-3 mt-2 font-bold' src={image9} alt="" />
                      </div>
                      
                  </div>
      
      
                  <div className="bg-blue-800 h-50 w-80">
                      <img src={image11} alt="" />
                      <div className="text-xl font-semibold">Save up to $200 on select laptops.</div>
                      <div className="flex">
                      <div className="text-blue-600 text-1xl">Shop now</div>
                      <img className='h-3 mt-2 font-bold' src={image9} alt="" />
                      </div>
                      
                  </div>
      
                  
                  <div className="bg-blue-800 h-50 w-80">
                      <img src={image12} alt="" />
                      <div className="text-xl font-semibold">Save up to $200 on select laptops.</div>
                      <div className="flex">
                      <div className="text-blue-600 text-1xl">Shop now</div>
                      <img className='h-3 mt-2 font-bold' src={image9} alt="" />
                      </div>
                      
                  </div>
                  </div>
      
                  <div className="text-3xl text-black mt-20 text-center font-bold">Shop deals on spring essentials</div>
      
                  <div className="flex gap-16 p-10 ml-8 mr-8">
               
                     <div className="h-50 w-40 bg-white">
                     <img src={image13} alt="" />
                     <div className="mt-3 text-blue-500">Outdoor Living</div>
                     </div>
      
                     <div className="h-50 w-40 bg-white">
                     <img src={image14} alt="" />
                     <div className="mt-3 text-blue-500">Electric Transportation</div>
                     </div>
      
                     
                     <div className="h-40 w-40 bg-white">
                     <img src={image15} alt="" />
                     <div className="mt-3 text-blue-500">Travel and Luggage</div>
                     </div>
      
                     <div className="h-40 w-40 bg-white">
                     <img src={image16} alt="" />
                     <div className="mt-3 text-blue-500">Cooling, Heating, and Air Quality</div>
                     </div>
      
                     <div className="h-40 w-40 bg-white">
                     <img src={image17} alt="" />
                     <div className="mt-3 text-blue-500">Cameras, Camcorders, and Droanes</div>
                     </div>
      
                     <div className="h-40 w-40 bg-white">
                     <img src={image18} alt="" />
                     <div className="mt-3 text-blue-500">Car Tech</div>
                     </div>
      
                  
                  </div>
      
      
      
      
                  <div className="text-3xl text-black mt-20 text-center font-bold">Shop more deals by category</div>
      
      <div className="flex gap-16 p-10 ml-8 mr-8">
      
         <div className="h-40 w-40 bg-white">
         <img src={image19} alt="" />
         <div className="mt-3 text-blue-500">TVs, Home Theatre, and Accessories</div>
         </div>
      
         <div className="h-40 w-50 bg-white">
         <img className='h-40' src={image20} alt="" />
         <div className="mt-3 text-blue-500">Computers and Tablets</div>
         </div>
      
         
         <div className="h-30 w-50 bg-white">
         <img className='h-30' src={image21} alt="" />
         <div className="mt-3 text-blue-500">Computer Accessories</div>
         </div>
      
         <div className="h-20 w-40 bg-white">
         <img className='h-30' src={image22} alt="" />
         <div className="mt-3 text-blue-500">Headphones and Portable Speakers</div>
         </div>
      
         <div className="h-40 w-40 bg-white">
         <img className='h-25' src={image23} alt="" />
         <div className="mt-3 text-blue-500">Wearable Technology</div>
         </div>
      
         <div className="h-40 w-40 bg-white">
         <img className='h-25' src={image24} alt="" />
         <div className="mt-3 text-blue-500">Cell Phones and Accessories</div>
         </div>
      
      
      </div>
      
      <div className="flex gap-16 p-10 ml-8 mr-8 text-center">
      
         <div className="h-50 w-50 bg-white">
         <img className='h-25' src={image25} alt="" />
         <div className="mt-3 text-blue-500">Major Appliances</div>
         </div>
      
         <div className="h-50 w-50 bg-white">
         <img className='h-25' src={image26} alt="" />
         <div className="mt-3 text-blue-500">Small Kitchen Appliances</div>
         </div>
      
         
         <div className="h-40 w-40 bg-white">
         <img className='h-25' src={image27} alt="" />
         <div className="mt-3 text-blue-500">Vacuums</div>
         </div>
      
         <div className="h-40 w-60 bg-white">
         <img className='h-25' src={image28} alt="" />
         <div className="mt-3 text-blue-500">Video Games,  and 

Shop PC Gaming
</div>
         </div>
      
         <div className="h-40 w-50 bg-white">
         <img className='h-25' src={image29} alt="" />
         <div className="mt-3 text-blue-500">PC Gaming</div>
         </div>
      
         <div className="h-40 w-50 bg-white">
         <img className='h-25' src={image30} alt="" />
         <div className="mt-3 text-blue-500">Smart Home</div>
         </div>
      
      
      </div>
      {/* <div className="p-8 "> */}
   <div className="flex flex-col md:flex-row  bg-red-600"> 
    <div className='flex-1 p-5 w-20'>
      <img src={image32} alt="Game Promotion" className="rounded-lg shadow-lg" />
      <h1 className='text-white  mt-4'>
        Double-jump into savings and take your gameplay to the next level.
      </h1>
    </div>

   
    <div className=" h-150 w-260 overflow-hidden">
      <Slider {...carouselConfig} className="">
        {slidess.map((slide, index) => (
          <div key={index} className="w-50 h-150 overflow-hidden">
            <div className="text-3xl text-white">{slide}</div>
          <div className="bg-white h-55 w-60 p-3 justify-between rounded-b-lg"> 
            <div className="u"> Ninetendo Swetch (OLED Model)Supper maros bros. wond bordul with 3...</div>
              <div className="flex">
                          <CiStar className="text-yellow-400 text-2xl " />
                          <CiStar className="text-yellow-400 text-2xl" />
                          <CiStar className="text-yellow-400 text-2xl" />
                          <CiStar className="text-yellow-400 text-2xl" />
                          <CiStar className="text-gray-400 text-2xl" />
                         
                        </div>
                       <div className='text-gray-700'> (34 Reviews)</div>
                        <button className='p-2 text-white bg-red-700 rounded-lg'>Top Deals</button>
                        <div className="text-2xl font-bold text-red-700">$449.99</div>
          </div>
          </div>
        ))}
      </Slider>

      <div className="flex justify-center mt-6">
        
        <button
          onClick={addSlides}
          className="bg-blue-800 hover:bg-blue-700 transition duration-200 rounded-lg p-4 text-white text-lg"
        >
          Show More
        </button>
      </div>
    </div>
  </div>
{/* </div> */}
      
      <div className="text-3xl text-black mt-20 text-center font-bold">Explore tech from top brands</div>
      
      <div className="flex p-8 gap-30">
          <div className='h-50 w-30 bg-white'>
              <img src={image33} alt="" />
              <div className="text-blue-500 text-center">Apple</div>
          </div>
      
          <div className='h-50 w-30 bg-white'>
              <img src={image34} alt="" />
              <div className="text-blue-500 text-center">Lenove</div>
          </div>
      
          <div className='h-50 w-30 bg-white'>
              <img src={image35} alt="" />
              <div className="text-blue-500 text-center">Samsung</div>
          </div>
      
          <div className='h-50 w-30 bg-white'>
              <img src={image36} alt="" />
              <div className="text-blue-500 text-center">Google</div>
          </div>
      
          <div className='h-50 w-30 bg-white'>
              <img src={image37} alt="" />
              <div className="text-blue-500 text-center">Meta</div>
          </div>
      
          <div className='h-50 w-30 bg-white'>
              <img src={image38} alt="" />
              <div className="text-blue-500 text-center">Breville</div>
          </div>
      </div>
      
      <div className='flex gap-10 justify-center ' style={divStyl}>
          <div className="text-white text-center p-3 ">
      <div className="text-4xl font-bold text-center mt-2">Latest and Greatest Tech</div>
      <div className="mt-4">The newest releases, all in one place.</div>
      <div className="flex gap-2 justify-center">
          <div className='mt-2'>Explore all new tech</div>
          <img className='h-4 mt-2' src={image40} alt="" />
      </div>
          </div>
      
      </div>
      
      <div className='flex gap-8 justify-center pl-5 ' style={divSty}>
          <div className="h-95 w-85 text-white">
              <img src={image42} alt="" />
              <div className="text-2xl">MacBook Air13" and15". Built for Apple Intelligence.</div>
      
              <div className="text-xl">Available March 12. Apple Intelligence available now.</div>
      
              <div className="flex">
                  <div className="font-bold">Pre-order now</div>
                  <FaAngleRight className="text-white mt-2"/>
              </div>
          </div> <div className="h-95 w-85 text-white">
              <img src={image44} alt="" />
              <div className="text-2xl">MacBook Air13" and15". Built for Apple Intelligence.</div>
      
              <div className="text-xl">Available March 12. Apple Intelligence available now.</div>
      
              <div className="flex">
                  <div className="font-bold">Pre-order now</div>
                  <FaAngleRight className="text-white mt-2"/>
                 
              </div>
          
      
          </div> <div className="h-95 w-85 text-white">
              <img src={image45} alt="" />
              <div className="text-2xl">MacBook Air13" and15". Built for Apple Intelligence.</div>
      
              <div className="text-xl">Available March 12. Apple Intelligence available now.</div>
      
              <div className="flex">
                  <div className="font-bold">Pre-order now</div>
                  <FaAngleRight className="text-white mt-2"/>
               
              </div>
          {/* </div> */}
      
          </div> <div className="h-95 w-85 text-white">
              <img className='h-50 w-70' src={image46} alt="" />
              <div className="text-2xl">MacBook Air13" and15". Built for Apple Intelligence.</div>
      
              <div className="text-xl">Available March 12. Apple Intelligence available now.</div>
      
              <div className="flex">
                  <div className="font-bold">Pre-order now</div>
                  <FaAngleRight className="text-white mt-2"/>
                  
              </div>
          </div>
      
      
      
      
      
      </div>
      
      
      
      <div className="text-3xl text-black mt-20 text-center font-bold">More ways to shop and save</div>
      
      <div className="flex p-6 gap-6">
          <div className="h-80 w-1/2 bg-white">
          <img className='h-47 w-full' src={image47} alt="" />
          <div className="text-1xl font-bold mt-2">Increase your savings with reforbished tech.</div>
      <div className="text-gray-600 text-1xl mt-2">Score a deal on product that have been restored to 100% functionality</div>
      <div className="flex gap-1">
          <div className="text-blue-500 text-1xl font-bold mt-2">Shop now</div>
          <FaAngleRight className="text-blue-500 mt-4"/>
          
      </div>
          </div>
          <div className="h-08 w-1/2 bg-white">
          <img src={image48} alt="" />
      
          <div className="text-1xl font-bold mt-2">Yes Best Buy sells that.</div>
      <div className="text-gray-600 text-1xl mt-2">Explore a section of everyday essentials that might surprise you.</div>
      <div className="flex gap-1">
          <div className="text-blue-500 text-1xl font-bold mt-2">Shop now</div>
          <FaAngleRight className="text-blue-500 mt-4"/>
          
      </div>
         
          </div>
          {/* <CiStar /> */}
      </div>





      <div className="flex flex-col md:flex-row  bg-blue-800"> 
    <div className='flex-1 p-5 w-30 '>
   <div className='text-3xl font-bold text-white'> Discover more deals across an incredible selection.</div>
   <button className='text-blue-700 p-3 bg-white mt-4'>Shop now</button>
    </div>

   
    <div className=" h-150 w-260 overflow-hidden">
      <Slider {...carouselConfig} className="">
        {slides.map((slide, index) => (
          <div key={index} className="w-50 h-150 overflow-hidden">
            <div className="text-3xl text-white">{slide}</div>
          <div className="bg-white h-55 w-60 p-3  rounded-b-lg"> 
            <div className="u">Lenovo Ideapad pro 5i laptop. 16" Glass.intel core ultra 7 155H.16GB.... </div>
              <div className="flex">
                          <CiStar className="text-yellow-400 text-2xl " />
                          <CiStar className="text-yellow-400 text-2xl" />
                          <CiStar className="text-yellow-400 text-2xl" />
                          <CiStar className="text-yellow-400 text-2xl" />
                          <CiStar className="text-gray-400 text-2xl" />
                         
                        </div>
                       <div className='text-gray-700'> (34 Reviews)</div>
                        <button className='p-2 text-white bg-red-700 rounded-lg'>Top Deals</button>
                        <div className="text-2xl font-bold text-red-700">$449.99</div>
          </div>
          </div>
        ))}
      </Slider>

      <div className="flex justify-center mt-6">
        
        <button
          onClick={addSlides}
          className="bg-blue-800 hover:bg-blue-700 transition duration-200 rounded-lg p-4 text-white text-lg"
        >
          Show More
        </button>
      </div>
    </div>
  </div>

  <div className="pl-20 pr-20 pt-20">
  <div className="text-3xl font-bold p-5 text-center">Top Selling and Popular Product</div>
    
  <div className=" h-150 w-full overflow-hidden">
      <Slider {...carouselConfigg} className="">
        {slidesy.map((slide, index) => (
          <div key={index} className="w-50 h-150 overflow-hidden">
            <div className="text-3xl text-white">{slide}</div>
          <div className="bg-white h-55 w-50 p-3  rounded-b-lg  border-2 border-b-gray-500   border-l-gray-500  border-r-gray-500  border-t-none"> 
            <div className="u">Apple Air Tag Bluetooth  iterm tracker-white... </div>
              <div className="flex">
                          <CiStar className="text-yellow-400 text-2xl " />
                          <CiStar className="text-yellow-400 text-2xl" />
                          <CiStar className="text-yellow-400 text-2xl" />
                          <CiStar className="text-yellow-400 text-2xl" />
                          <CiStar className="text-gray-400 text-2xl" />
                         
                        </div>
                       <div className='text-gray-700'> (34 Reviews)</div>
                        <button className='p-2 text-white bg-red-700 rounded-lg'>Top Deals</button>
                        <div className="text-2xl font-bold text-red-700">$449.99</div>
          </div>
          </div>
        ))}
      </Slider>

      <div className="flex justify-center mt-6">
        
        <button
          onClick={addSlides}
          className="bg-blue-800 hover:bg-blue-700 transition duration-200 rounded-lg p-4 text-white text-lg"
        >
          Show More
        </button>
      </div>
    </div>
  </div>





  <div className="pl-20 pr-20">
  <div className="text-3xl font-bold p-5 text-center">Product we think you"ll Love</div>
    
  <div className=" h-150 w-full overflow-hidden">
      <Slider {...carouselConfigg} className="">
        {slidesyy.map((slide, index) => (
          <div key={index} className="w-50 h-150 overflow-hidden">
            <div className="text-3xl text-white">{slide}</div>
          <div className="bg-white h-55 w-50 p-3 justify-between rounded-b-lg  border-2 border-b-gray-500   border-l-gray-500  border-r-gray-500  border-t-none"> 
            <div className="u">Apple Air Tag Bluetooth  iterm tracker-white... </div>
              <div className="flex">
                          <CiStar className="text-yellow-400 text-2xl " />
                          <CiStar className="text-yellow-400 text-2xl" />
                          <CiStar className="text-yellow-400 text-2xl" />
                          <CiStar className="text-yellow-400 text-2xl" />
                          <CiStar className="text-gray-400 text-2xl" />
                         
                        </div>
                       <div className='text-gray-700'> (34 Reviews)</div>
                        <button className='p-2 text-white bg-red-700 rounded-lg'>Top Deals</button>
                        <div className="text-2xl font-bold text-red-700">$449.99</div>
          </div>
          </div>
        ))}
      </Slider>

      <div className="flex justify-center mt-6">
        
        <button
          onClick={addSlides}
          className="bg-blue-800 hover:bg-blue-700 transition duration-200 rounded-lg p-4 text-white text-lg"
        >
          Show More
        </button>
      </div>
    </div>
  </div>
      
      
      <div className="flex gap-40 justify-center items-center">
          <div className="flex text1-xl text-blue-700 font-bold gap-4">
              {/* <img src={image49} alt="" /> */}
             <  RiChatVoiceAiLine className="text-4xl text-blue-700 font-bold"/>
              <div>
              <div className="t">Quick and Easy</div>
              <div className="t">Store picup</div>
              </div>
          </div>
      
          <div className="flex text1-xl text-blue-700 font-bold gap-4">
             
             <  LiaTruckMovingSolid  className="text-4xl text-blue-700 font-bold"/>
              <div>
              <div className="t">Free Shipping</div>
              <div className="t">over $35</div>
              </div>
          </div>
      
          <div className="flex text1-xl text-blue-700 font-bold gap-4">
             
             <  LiaUndoAltSolid  className="text-4xl text-blue-700 font-bold"/>
              <div>
              <div className="t">Low price</div>
              <div className="t">Guarantee</div>
              </div>
          </div>
      
          <div className="flex text1-xl text-blue-700 font-bold gap-4">
             
             <  CiStar  className="text-4xl text-blue-700 font-bold"/>
              <div>
              <div className="t">Latest and</div>
              <div className="t">Greatest Tech</div>
              </div>
          </div>
      </div>
      
      
      
      
       </div>
  )
}

export default Home



