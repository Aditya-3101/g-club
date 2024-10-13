import React,{useEffect, useState,useRef,useLayoutEffect} from 'react';
import { useLoaderData,useLocation,useParams } from 'react-router';
import { ReleaseCard } from '../Home/ReleaseCard.tsx';
import { Link} from 'react-router-dom';

type urlType={
    "games":string,
    "top-sellers":string,
    "New-Releases":string,
    "Action":string,
    "Multiplayer":string,
    "Racing":string,
    "Casual":string
}

type LoaderType = {
    
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

export const loader = async ({params}) => {
    const urlMap:urlType={
        "games":`https://gstore-api.vercel.app/games/limit?from=0&to=6`,
        "top-sellers":'https://gstore-api.vercel.app/popular/all-popular?from=0&to=6',
        "New-Releases":'https://gstore-api.vercel.app/popular/all-latest/limit?from=0&to=6',
        "Action":'https://gstore-api.vercel.app/games/sort-games/limit?type=Action&from=0&to=6',
        "Multiplayer":'https://gstore-api.vercel.app/games/sort-games/limit?type=Multiplayer&from=0&to=6',
        "Racing":'https://gstore-api.vercel.app/games/sort-games/limit?type=Racing&from=0&to=6',
        "Casual":'https://gstore-api.vercel.app/games/sort-games/limit?type=Casual&from=0&to=6',
    }

    const url:string = urlMap[params.type]

    const req = await fetch(url)
    if(!req.ok){
        throw{
            code:req.status,
            status:req.statusText
        }
    }
    const result:LoaderType = await req.json()
    return result;
}



export const MainPage:React.FC = () => {
    const data = useLoaderData() as LoaderType;
    const [moreData,setMoreData] = useState<LoaderType>([])
    const [limit,setLimit]=useState<boolean>(false)
    const counterRef:React.MutableRefObject<number> = useRef(0)
    const [totalResultsCount,setTotalResultsCount] = useState(0)
    const {type}=useParams()
    const itemsOnPage=6; //For Typescript this infers as number
    const location = useLocation()

    useLayoutEffect(()=>{
        window.scrollTo(0,0)
    },[])

    useEffect(()=>{
        if(type!=="games"){
            if(data.length<itemsOnPage){
                setLimit(true)
            }else{
                setLimit(false)
            }
        }
    },[data,type])

    const handleMore = async():Promise<void> =>{
        const mdLength = moreData!==undefined?moreData.length:0
        const currentDataLength = data.length + mdLength;
        const urlMap:urlType={
            "games":`https://gstore-api.vercel.app/games/limit?from=${currentDataLength}&to=${currentDataLength+itemsOnPage}`,
            "top-sellers":`https://gstore-api.vercel.app/popular/all-popular?from=${currentDataLength}&to=${currentDataLength+itemsOnPage}`,
            "New-Releases":`https://gstore-api.vercel.app/popular/all-latest/limit?from=${currentDataLength}&to=${currentDataLength+itemsOnPage}`,
            "Action":`https://gstore-api.vercel.app/games/sort-games/limit?type=Action&from=${currentDataLength}&to=${currentDataLength+itemsOnPage}`,
            "Multiplayer":`https://gstore-api.vercel.app/games/sort-games/limit?type=Multiplayer&from=${currentDataLength}&to=${currentDataLength+itemsOnPage}`,
            "Racing":`https://gstore-api.vercel.app/games/sort-games/limit?type=Racing&from=${currentDataLength}&to=${currentDataLength+itemsOnPage}`,
            "Casual":`https://gstore-api.vercel.app/games/sort-games/limit?type=Casual&from=${currentDataLength}&to=${currentDataLength+itemsOnPage}`,
        }

        const url=urlMap[type?type:String(location).replace('/','')]
        await totalRecords(url)
        const req = await fetch(url)
        if(!req.ok){
            throw{
                code:req.status,
                status:req.statusText
            }
        }
        const result:LoaderType = await req.json()
        setMoreData(prev=>[...prev,...result])
    }

    useEffect(() => {
        const totalCount = totalResultsCount;
        const currentDataLength = data.length + (moreData?.length || 0);
    
        if (totalCount === currentDataLength) {
            setLimit(true);
        }
    }, [moreData, totalResultsCount]);

    const totalRecords = async(url:string):Promise<void>=>{
        
        if(counterRef.current==0){
            await checkRecords(url)
        }
        
    }

    async function checkRecords(url:string|null){
        if (typeof url ===null){
            return;
        }
        const hostUrl = String(url).split('?')
        const queryUrl = String(url).split('&')
        const queryHost = queryUrl[0]?.split('?')

        const totalCount = await fetch(queryUrl.length!==0?queryHost[0]+"/count?"+queryHost[1]:hostUrl[0]+"/count")
        if(!totalCount.ok){
            throw{
                code:totalCount.status,
                status:totalCount.statusText
            }
        }
        const totalResultCount:number = await totalCount.json()
        counterRef.current +=counterRef.current+1
        setTotalResultsCount(totalResultCount)
    }

    return(
        <section className='bg-[#101014] flex flex-col  items-center py-4'>
            <div className='w-[80%] sm:w-[80%] mx-auto sm:py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center sm:gap-4 gap-8'>
            {(data||[]).concat(moreData||[]).map((para,index)=>{
                  return <Link to={`/games/${para.name}`} key={index}>
                  <ReleaseCard name={para.name} price={para.price} orgPrice={para.orgPrice} imgUrl={para.imgUrl} type="gamesPage" />
                 </Link>   
            })}
            </div>
        {limit===false&&<div className='text-slate-50 text-lg sm:text-xl bg-[#ffffff26] rounded-md py-2 sm:py-2 px-4 font-roboto my-4' onClick={handleMore}>Load More</div>}
        </section>
        
    )

}