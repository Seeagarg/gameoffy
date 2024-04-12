

import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../src/assets/images/logo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import gamelogo from '../assets/images/gamelogo.png'
import {useSelector} from 'react-redux';
import { arr } from "../Data";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


const Header = ({ category }) => {
  let lang = useSelector((state)=>state.langSlice)
  lang = lang.langSlice.lang
  const navigate = useNavigate()
  // console.log(lang.langSlice.lang)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

 const number = localStorage.getItem('number')
 const checkUser=()=>{
  const data={
    msisdn:number
}
  axios.get(`http://gamelover.gameofyy.com/checkuser`,data)
            .then(response => {
            console.log("response data", response.data)
                if (response.data.statusId !== '1') {
                    navigate(`/login`); 
                } 
            })
           
 }

 useEffect(()=>{
checkUser()
 },[])


  const changeLang=(key)=>{
    console.log(`(${key})`,lang)
    if(lang == 0){
      return key;
    }
    if(lang == 1){
      console.log("====",lang,key)
     const data = arr.findIndex((item)=>item.key == key);
     console.log(data)
     if(data>=0){
      return arr[data].value.slice(0,10);
     }
     return key;
    }
  }




 
  return (
    <div className="bg-gradient-to-r from-emerald-500 to-amber-500 text-white border-b border-white ">
      <div className="flex items-center justify-between uppercase mb-2">
      
        <Link to="/">
          <img className="w-full h-10 mx-3 py-1"
   
            src={gamelogo}
            alt="logo"
          />
        </Link>

        {/* Categories in header for lg screens */}
        <div className="hidden lg:flex justify-between items-center gap-4 mr-12 lg:mt-2">
       
          {category.map((e) => (
            // <Link
            //   key={e.cat_name}
            //   to={`/category/${e.cat_name}`}
            //   className={` text-[16px] ml-4 bg-amber-300 hover:text-white font-bold rounded-lg px-2 py-2 ${
            //     e.cat_name === "Kids" ? "text-yellow-400" : "text-black "
            //   }`}
            // >
            <Link
              key={e.cat_name}
              to={`/category/${e.cat_name}`}
              className={` text-[16px] ml-4 bg-gray-300/20 skew-y-1  hover:scale-110 shadow-lg hover:shadow-amber-300 hover:text-white font-bold rounded-lg px-2 py-2 `}
            >
              {changeLang(e.cat_name)}
            </Link>
          ))}
        </div>

        {/* Hamburger Icon (visible on smaller screens) */}
        <div className="lg:hidden ml-auto mr-8 mb-1 mt-4 ">
       
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <FaTimes className="h-8 w-8 text-white" />
            ) : (
              <FaBars className="h-8 w-8 text-white" />
            )}
          </button>
        </div>

        {/* Categories in mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute left-0 top-16 h-auto z-10 bg-emerald-500/60 px-2 py-4">
            {category.map((e) => (
              <Link
                key={e.cat_name}
                to={`/category/${e.cat_name}`}
                onClick={toggleMobileMenu}
                className="font-serif hover:bg-emerald-700 px-1 py-1 rounded-lg block mb-2"
              >
                {changeLang(e.cat_name)}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;