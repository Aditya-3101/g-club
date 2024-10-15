import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Blank } from '../Navigation/Blank.tsx';

type responseType = {
    _id:string,
    name:string,
    price:number,
    orgPrice:number,
    imgUrl:string,
    description:string,
    genre:string[],
    thumbMobile?:string,
    thumbPc?:string,
    downloads:number
}[]

export const Deal:React.FC = () =>{

    const [data,setData] = useState<responseType>([])

    useEffect(()=>{
        fetchDeal();
    },[])

    async function fetchDeal():Promise<void>{
        const req = await fetch('https://gstore-api.vercel.app/specials/today')
        if(!req.ok){
            throw{
                status:req.statusText,
                code:req.status,
                message:"Failed to fetch data",
            }
        }
        const res:responseType = await req.json()
        setData(res)
        
    }

    return<div className='w-[100%] flex items-center justify-center mt-8 pb-8'>
        <section className='w-4/5'>
            {data&&data.map((par,index)=>{
                return<div key={index} className='w-[100%] flex flex-col sm:flex-row sm:justify-between'>
                    <img src={par.thumbPc} alt={par.name} className='w-[100%] sm:w-[47%] object-cover rounded-xl' />
                    <div className='w-[100%] sm:w-[50%]'>
                    <p className='text-white font-poppins text-left text-xl sm:text-3xl mb-2'>{par.name}</p>
                    <p className='text-left text-[#ffffffa6] line-clamp-2 sm:line-clamp-4 font-poppins'>{par.description}</p>
                    <p className='bg-sky-400 w-[8rem] font-poppins rounded-lg py-2 my-2 cursor-pointer'><Link to={`/games/${par.name}`}>Buy Now
                    </Link></p>
                    </div>
                </div>
            })}
            {data.length===0&&<Blank dir='horizontal' type="pc-deal"/>}
        </section>
    </div>
}