import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import { ReleaseCard } from './ReleaseCard.tsx';
import { MdChevronRight } from 'react-icons/md';
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

export const Onsale = () =>{
    const [data,setData] = useState<responseType>([])
    const setCount:string[] = ['a','b','c','d']

    useEffect(()=>{
        fetchDeal()
    },[])

    async function fetchDeal():Promise<void>{
        
        const req = await fetch('https://gstore-api.vercel.app/popular/on-sale')
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


    return<div className='w-[90%] sm:w-[80%] mx-auto mt-8 relative pb-4'>
        <p className='w-[100%] font-roboto text-white flex items-center text-2xl sm:text-3xl md:text-3xl text-left relative'><Link to="/games" className='flex items-center'>Try Now<MdChevronRight/>
        </Link>
        <Link to="/games" className='text-lg sm:text-xl absolute right-0 bg-[#ffffff26] py-1 sm:py-2 px-4 rounded-md'>Browse</Link></p>
        <section className='w-[100%] grid grid-cols-2 sm:grid-cols-4 justify-evenly sm:justify-between justify-items-center sm:gap-8 mt-2 sm:mt-4 pb-2 sm:pb-4 gap-2'>
        {data&&
        data.map((par,index)=>{
            return<Link to={`/games/${par.name}`} key={index}>
            <ReleaseCard key={index} name={par.name} imgUrl={par.imgUrl} price={par.price} orgPrice={par.orgPrice} type="sale" /></Link>
        })}
        {data.length===0&&
            setCount.map((type,index)=>{
            return<Blank key={index}/>
        })}
        </section>

    </div>
}