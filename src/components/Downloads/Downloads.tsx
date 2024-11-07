import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import type {DataState} from '../../app/dataSlice'
import { AiOutlineDelete } from "react-icons/ai";
import {removeData} from '../../app/dataSlice.ts'


export const Downloads:React.FC = () => {
    const data = useSelector((state:DataState)=>state.data)
    const dispatch = useDispatch()
    
    if(data.length===0){
        return<div className='w-[70%] h-auto text-center font-roboto mx-auto py-10 text-white text-2xl flex flex-col items-center justify-center'>
            <img src='https://i.ibb.co/d4mjM6T/undraw-Gaming-re-cma2-Photoroom.png' className='w-[40%]' />No Downloads</div>
    }

    return<div>

        {data.length!==0&&<div className='py-8 flex flex-col gap-4'>{data?.map((par,index)=>{
            return<div key={index} className='w-[94%] sm:w-[75%] md:w-[65%] lg:w-[55%] min-h-20 max-h-42 mx-auto flex gap-4 px-4 md:px-6 sm:gap-8 py-8 bg-[#18181c]'>
                <img src={par.imgUrl} alt={par.name} className='w-[30%] md:w-[15%] object-contain my-0 mx-4' />
                <div className='w-[65%] md:w-[80%] text-slate-50 font-poppins text-left'>
                    <p className='text-lg sm:text-2xl mb-1 relative'>{par.name}
                    <span className='absolute right-0 bottom-0 cursor-pointer' onClick={()=>dispatch(removeData(par._id))}><AiOutlineDelete/></span></p>
                    <div className='flex gap-4 flex-col sm:flex-row justify-center sm:justify-start my-4'>
                    <p className='text-slate-200 text-xl font-poppins py-1 sm:py-2'>{Number(par.price).toLocaleString('en-IN',{
                        style:'currency',
                        currency:"INR",
                        minimumFractionDigits:0
                    })}/-</p>                    
                    <button className='bg-sky-400 w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] text-black px-4 py-1 my-1 rounded'>Proceed to Payment</button></div>
                </div>
                </div>
        })}</div>}

    </div>
}