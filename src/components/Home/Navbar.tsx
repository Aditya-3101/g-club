import React,{useState} from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import { NavLink,Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import type {DataState} from '../../app/dataSlice'


export function Navbar(){
  const [flag,setFlag] = useState<boolean>(false);
  const data = useSelector((state:DataState)=>state.data)

  const toggleFlag = () => {
    setFlag(!flag)
  }

  return (
    <header className='bg-[#121216f6] w-full p-4 sm:flex justify-between'>
      <h1 className='w-full sm:w-1/4 flex items-center justify-between'>
        <Link to="/" className='text-[#fff] text-left font-sans text-xl sm:text-2xl md:text-3xl flex items-center gap-2'>
          <img src="https://i.postimg.cc/cL6sq03P/image.png" className='w-[2rem] object-contain'/>
          <span className='text-[#fff] text-left font-poppins text-xl sm:text-2xl md:text-2xl'>G-Store</span></Link>  
      <span className='text-[#fff] block sm:hidden' onClick={toggleFlag}>{flag?<MdCancel/>:<GiHamburgerMenu/>}</span>
      </h1>
      <nav className={`w-full sm:2/3 lg:w-2/4 ${flag?'block':'hidden sm:flex justify-between'} text-[#fff] text-left py-2`}>
        <p className='border-b text-base sm:text-lg md:text-xl py-1 sm:border-none font-poppins'>
          <NavLink to="/">Home</NavLink>
        </p>
        <p className='border-b text-base sm:text-lg md:text-xl py-1 sm:border-none font-poppins'>
          <NavLink to="/games">Browse</NavLink>
        </p>
        <p className='border-b text-base sm:text-lg md:text-xl py-1 sm:border-none font-poppins relative'>
          <NavLink to="/downloads">
            Downloads{data.length!==0&&<span className='bg-sky-400 text-black text-sm w-5 h-5 sm:w-5 sm:h-5 text-center rounded-full absolute top-0 bottom-0 my-auto ml-1 mr-0 sm:-top-1 sm:bottom-auto'>{data.length}</span>}
          </NavLink>
          </p>
        <p className='border-b text-base sm:text-lg md:text-xl py-0.5 sm:border-none font-poppins'>About</p>
        <p className='border-b text-base sm:text-lg md:text-xl py-0.5 sm:border-none font-poppins'>Account</p>
      </nav>
    </header>
  )
}

