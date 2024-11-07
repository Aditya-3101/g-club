import React from 'react';
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { Link } from 'react-router-dom';

export const Footer:React.FC = () => {
    return(
        <React.Fragment>
        <div className='bg-[#18181c] w-full h-auto py-8 flex flex-col items-center sm:items-stretch justify-center sm:flex-row gap-2 sm:gap-6'>
            <div className='w-4/5 sm:w-[28%] lg:w-[24%] flex flex-col gap-2'>
                <p className='font-poppins text-left text-white text-2xl'>G-store</p>
                <div className='text-[#ffffffa6] text-left font-roboto'>
                Level up your gaming experience with the best gear, epic games, and unbeatable deals. Your ultimate gaming adventure starts here!
                </div>
                <p className='flex gap-4 text-white my-1'>
                    <Link to="https://github.com/Aditya-3101">
                    <FaGithub className='text-3xl' />
                    </Link>
                    <Link to="https://www.linkedin.com/in/aditya-dhayfule/"><FaLinkedin className='text-3xl'/>
                    </Link></p>
            </div>
            <div className='w-4/5 sm:w-[28%] lg:w-[24%] flex flex-col gap-1'>
                <p className='font-poppins text-left text-white text-2xl'>Support</p>
                <div className='text-[#ffffffa6] text-left font-poppins my-1'>
                Mobile
                </div>
                <div className='text-[#ffffffa6] text-left font-poppins my-1'>
                Careers
                </div>
                <div className='text-[#ffffffa6] text-left font-poppins my-1'>
                Blog
                </div>
                <div className='text-[#ffffffa6] text-left font-poppins my-1'>
                Contact
                </div>
            </div>
            <div className='w-4/5 sm:w-[28%] lg:w-[24%] flex flex-col gap-2'>
                <p className='font-poppins text-left text-white text-2xl'>Subscription</p>
                <div className='text-[#ffffffa6] text-left font-poppins'>
                Subscribe your Email address for latest news & updates.
                </div>
                <input className='w-[100%] h-10 font-poppins px-2' placeholder='Enter Your Email address' />
                <p className='py-2 bg-sky-400 w-[8rem] font-poppins rounded-lg'>Submit</p>
            </div>
        </div>
        <div className='font-poppins text-center py-2 text-slate-50 bg-[#101014]'>&#64;2024 G-store. All rights reserved</div>
        </React.Fragment>
    )
}