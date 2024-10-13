import React, { useEffect, useState } from 'react';
import { MdChevronRight } from 'react-icons/md';
import { ReleaseCard } from './ReleaseCard.tsx';
import { Link } from 'react-router-dom';

type ResponseType = {
    
    "_id": string,
    "name": string,
    "price": number,
    "orgPrice": number,
    "imgUrl": string,
    "description": string,
    "genre":string[],
    "thumbMobile"?:string,
    "thumbPc"?:string,
    "downloads"?:number
}[]

export const TopSellers:React.FC = () => {

    const [data,setData] = useState<ResponseType>([])

    useEffect(()=>{
        fetchTopSellers()
    },[])

    const fetchTopSellers = async():Promise<void> => {
        const controller = new AbortController()
        const req = await fetch('https://gstore-api.vercel.app/popular/top-popular',controller)
        if(!req.ok){
            controller.abort()
            throw{
                status:req.statusText,
                code:req.status,
                message:"Failed to fetch data",
            }
        }
        const res:ResponseType = await req.json()
        setData(res)
    }

    return <div className='my-8'>
    <section className='w-[80%] mx-auto'>
        <Link to={`/top-sellers`}><p className='w-[100%] font-roboto text-white flex items-center text-2xl sm:text-3xl md:text-3xl text-left'>
            Top Sellers<MdChevronRight/>
            </p></Link>
        <div className='my-2 sm:my-4 w-[100%] mx-auto grid grid-flow-col auto-cols-[85%] sm:flex sm:flex-wrap sm:justify-between overflow-x-auto no-scrollbar'>
            {data&&data.map((par,index)=>{
                return <Link to={`/games/${par.name}`} key={index} className='w-[90%] sm:w-[22%]'>
                    <ReleaseCard imgUrl={par.imgUrl} name={par.name} orgPrice={par.orgPrice} price={par.price} />
                </Link>
            })}
        </div>
    </section>
</div>
}