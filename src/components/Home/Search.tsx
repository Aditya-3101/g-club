import React,{useEffect, useState} from 'react';
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import {useNavigate, useSearchParams,Link} from 'react-router-dom'

type ResponseType = {
    "name":string,
    "thumbMobile"?:string|null
}[]


export const SearchBar:React.FC = () => {
    const [query,setQuery]=useState<string>("")
    const [response,setResponse]=useState<ResponseType>([])

    const [searchParams,setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    const searchHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setQuery(e.target.value)
    }

    const handleKeyDown = (event:React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          event.preventDefault()
          setSearchParams({q:query})
          navigate(`/games/search?q=${query}`)    
          setQuery('')
        }
      };

    useEffect(()=>{
        const delayedDebounceFn:NodeJS.Timeout = setTimeout(()=>{
            fetchSearch(query)
        },800)
        return()=>clearTimeout(delayedDebounceFn)
    },[query])

    async function fetchSearch(para:string|null):Promise<void>{
        if(para?.length!==0){
        const req = await fetch(`https://gstore-api.vercel.app/search/name?name=${para}`)
        if(!req.ok){
            throw{
             code:req.status,
             status:req.statusText
            }
         }
         const result:ResponseType = await req.json()
         setResponse(result)
        }
    }

    return(
    <>
        <section className='w-[80%] ml-auto mr-auto flex items-center justify-center py-4'>
            <div className='w-[95%] sm:w-[90%] lg:w-[70%] h-[32px] sm:h-[38px] flex justify-center items-center bg-[#18181c] rounded'>
                <HiMiniMagnifyingGlass className='text-[#fff]' />
                <input type="text" name="search-bar" placeholder='Search Anything....' value={query} onChange={searchHandler} className='w-[90%] sm:h-[100%] px-2 rounded-sm bg-[#18181c] text-[#fff] my-4 focus-within:outline-none focus-visible:outline-none focus-visible:bg-[#18181c] autofill:bg-[#18181c]' autoComplete='off' onKeyDown={handleKeyDown} />
            </div>
            <div className='hidden sm:hidden  lg:flex w-[30%] gap-10 px-4 items-center justify-center'>
                <p className='text-slate-50 font-roboto'>
                <Link to="/New-Releases">Discover</Link></p>
                <p className='text-slate-50 font-roboto'><Link to="/top-sellers">Top Deals
                </Link></p>
            </div>
        </section>
        <div className='w-[80%] h-auto mx-auto -mt-4 mb-4 relative'>
            <div className='w-[95%] sm:w-[90%] lg:w-[70%] absolute top-0 left-0 right-0 bottom-0 z-10 bg-[#18181c]'>
                {response&&query.length!==0 ? response.map((para,index)=>{
                    return<Link className='w-[100%] text-slate-50 border-b text-left px-8 py-2 block bg-[#18181c] first:border-t' key={index} to={`/games/${para.name}`}>
                        {para.name}
                    </Link>
                }):null}
            </div>
        </div>
    </>
    )
}