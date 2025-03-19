// import React from 'react'

// import {cu} from "react-router-dom";
import { Link } from 'react-router-dom'
import React, { useState, useEffect, Icons } from "react";

import { FaAngleRight } from "react-icons/fa6";

import { FaApple } from "react-icons/fa6";
import { AiFillAndroid } from "react-icons/ai";


import { FaFacebookF } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";


const Footer = () => {
  return (
    <div>
        
<div className="flex gap-10 p-8 bg-gray-100 mt-8">
    <div className="h-110 w-70">
        <h1 className="mt-3 font-semibold text-xl">Customer Support</h1>
       <div className="ml-2">
       <div className="mt-2">Contact Us</div>
        <div className="mt-2">Help Centre</div>
        <div className="mt-2 t">Returns & Exchanges</div>
        <div className="mt-2 t">Best Buy Financing </div>
        <div className="mt-2 t">About Best Buy Marketplace</div>
       </div>
        <div className="mt-12 font-semibold text-xl">About Us</div>
        <div className="mt-2 t">Careers</div>
        <div className="mt-2 t">Corporate Information</div>
        <div className="mt-2 t">Newsroom</div>
        <div className="mt-2 t">Our Commitment to the Environment</div>
        <div className="mt-2 t">Best Buy US</div>
       
    </div>
    <div className="h-110 w-70">
    <h1 className="mt-3 font-semibold text-xl">My Best Buy Account</h1>
    <div className="mt-2">Order Status</div>
    <div className="mt-2">Manage Account</div>
    <div className="mt-2">Preference Centre</div>
    <div className="mt-2">Personal Information Request</div>

     <div>
     <div className="mt-20 font-semibold text-xl">Partner With Us
     </div>
     <div className="mt-2">Advertise with Best Buy</div>
     <div className="mt-2">Become a Best Buy Affiliate</div>
     <div className="mt-2">Sell on Best Buy Marketplace</div>

     </div>
    </div>
    <div className="h-110 w-70 ">
    <h1 className="mt-3 font-semibold text-xl">Services</h1>
    <div className="mt-2">Geek Squad</div>
    <div className="mt-2">Best Buy Membership</div>
    <div className="mt-2">Monthly Subscription</div>
    <div className="mt-2">Best Buy Financing</div>
    <div className="mt-2">Trade-In Program</div>
    <div className="mt-2">Best Buy Health</div>
    <div className="mt-6 font-semibold text-xl">Mobile Apps</div>
    <div className="flex gap-2">
    <AiFillAndroid className="mt-3.5" />
    <div className="mt-2">Android App</div>
    </div>

    <div className="flex gap-2">
    <FaApple className="mt-3"/>
    <div className="mt-2">iOS App</div>
    </div>
    
    </div>
    <div className="h-110 w-90 ">
    <div className="mt-6 font-semibold text-xl">Be the first to know</div>
    <div className="mt-2">Sign up to stay in the loop about the hottest deals, coolest new products, and exclusive sales events.</div>

    <div className="flex mt-3">
        <div className="text-blue-600">How does Best Buy use my email address?
        </div>
        <  FaAngleRight  className="text-blue-600 mt-2"/>
    </div>
    <div className="flex mt-4">
        
        <input type="text" placeholder="Email Address" className="border border-gray-400 p-3 w-60" />
        <div className="bg-blue-800 h-14 w-26 text-center pt-3 text-white">Sign Up</div>
    </div>

    <div className="flex mt-4 gap-12">
        <FaFacebookF/>
        <FiInstagram/>
        < FaLinkedinIn/>
        <FaPinterestP/>
        <FaXTwitter/>
        <IoLogoYoutube/>
    </div>
    </div>
</div>


<div className="h-20  p-6 bg-gray-100">
    <div className="t">© Best Buy Canada Ltd. Suite #102, 425 West 6th Avenue, Vancouver, BC V5Y 1L3</div>
    <div className="flex gap-2 mt-2 text-sm">
        <div className="g">Terms & Conditions</div>
        <div className="text-xs mt-1">|</div>
        <div className="h">Conditions of Use</div>
        <div className="text-xs mt-1">|</div>
        <div className="h">Online Policies</div>
        <div className="text-xs mt-1">|</div>
        <div className="h">Privacy Policy</div>
        <div className="text-xs mt-1">|</div>
        <div className="h">Cookie Policy</div>
        <div className="text-xs mt-1">|</div>
        <div className="h">Accessibility Policy</div>
        <div className="text-xs mt-1">|</div>
        <div className="h">Geek Squad Terms & Conditions</div>
        <div className="text-xs mt-1">|</div>
        <div className="h">Product Recalls</div>
        <div className="text-xs mt-1">|</div>
        <div className="h">Credits</div>
    </div>
</div>
</div>
  )
  
}


export default Footer