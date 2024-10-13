import React from 'react'
import {useLocation,Link} from 'react-router-dom'

export const BreadCrumb:React.FC = () => {
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const searchQuery:string|null = query.get('q')

    const routes:string[] = String(location.pathname).split("/").filter((x)=>x);

    let urlPath = "";

    
    return(
        <div>
            <div className='w-[80%] sm:w-[90%] mx-auto bg-[#101014] text-white text-lg sm:text-xl py-4 md:py-8 font-poppins capitalize text-left text-wrap flex flex-wrap overflow-hidden relative'>
            <Link to="/">
                Home
            </Link>
            <div className='flex flex-wrap'>
                {routes.map((par,index)=>{
                    urlPath += `/${par}`

                    const lastKey = index === routes.length-1;
                    const searchedQuery = par.includes('search') ===true ? par?.replace('search',searchQuery):par

                    return lastKey ?<span key={urlPath}>/{searchedQuery.replaceAll("%20"," ")}</span>:
                    <span key={urlPath} className=''>/
                        <Link to={urlPath}>{par!.replaceAll("%20"," ")}</Link>
                    </span>
                })}
            </div>
            </div>
        </div>
    )
}