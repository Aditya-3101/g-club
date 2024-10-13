import React,{useEffect, useState} from 'react'
import { useLocation, useParams,Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import type {DataEntry} from '../../app/dataSlice'
import { addData } from '../../app/dataSlice.ts';
import { HiXMark } from "react-icons/hi2";

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
    "downloads"?:number,
    "minimum":{
        "os":string,
        "Ram":number,
        "Storage":number,
        "Graphics_card":string,
        "Video_memory":string,
        "Processor":string
    },
    "recommended":{
        "os":string,
        "Ram":number,
        "Storage":number,
        "Graphics_card":string,
        "Video_memory":string,
        "Processor":string
    }
}[]

const GamePage:React.FC = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const query = new URLSearchParams(location.search)
    const searchQuery = query.get('q')
    const {game_name} = useParams()
    const [data,setData] = useState<ResponseType|null>([])
    const [loading,setLoading]=useState<boolean>(false)
    const [showPop,setShowPop]=useState<boolean>(false)
    const [hideImage,setHideImage]=useState<boolean>(true)

    useEffect(()=>{
        if(searchQuery===null){
            setLoading(true)
        fetchInfo(null)
        }else{
            setLoading(true)
            fetchInfo(searchQuery)
        }
        window.scrollTo(0,0)
    },[])


    const fetchInfo = async (para:string|null):Promise<null|void> =>{
        const req = await fetch(`https://gstore-api.vercel.app/games?name=${para!==null?searchQuery:game_name}`)
        if(!req.ok){
           throw{
            code:req.status,
            status:req.statusText
           }
        }
        const result = await req.json()
        if(result.length!==0){
        // dispatch(addData(result))
        setData(result)
        setLoading(false)
        document.title = `Download ${game_name!==undefined?String(game_name[0]).toLocaleUpperCase()+String(game_name).slice(1):
            searchQuery!==null&&
            String(searchQuery[0])?.toLocaleUpperCase()+String(searchQuery).slice(1)} | Gstore`
        }else{
            setData(null)
            setLoading(false)
        }
    }

    const downloadNow = (game:DataEntry):void => {
        dispatch(addData(game))
        setShowPop(true)
    }

    if(data==null){
        return<h1 className='text-slate-50 py-56 text-4xl capitalize'>No games found!!!</h1>
    }

    if(loading){
        return<h1 className='text-slate-50 py-56 text-4xl capitalize'>Loading....</h1>
    }

    function hideModal():void{
        setShowPop(false)
    }

    const handleImages=():void=>{
        setHideImage(false)
    }


  return (
    <div>
        <section className='relative py-8'>
            <div>
                <div className={`w-[90%] md:w-[40%] mx-auto text-slate-50 font-poppins ${showPop?'block':'hidden'} flex flex-col items-center bg-[#18181c] p-2 text-lg`}>
                <p className='text-right w-[100%] capitalize'><HiXMark className='ml-auto' onClick={hideModal} /></p>
                {game_name!==undefined?game_name:searchQuery} is added into cart
                <Link className='bg-[#38bdf8] w-fit text-black px-2 py-1 my-4' to="/downloads">View Downloads</Link>
                </div>  
            </div>
          
            {data.map((para,index)=>{
            return<React.Fragment key={index}>    
                <div className={`relative grid grid-cols-1 lg:grid-cols-3 w-[85%] sm:w-[75%] mx-auto my-4 sm:bg-cover sm:bg-center sm:bg-no-repeat bg-black/40 z-50 py-2 md:py-4 lg:min-h-[26rem] lg:max-h-[30rem]`}>
                    <div className='sm:col-span-1 sm:row-span-1 relative z-10 flex justify-center items-center'>
                    {hideImage&&<div className='w-[100%] bg-slate-800 aspect-[2/3] animate-pulse'></div>}
                        <img src={para.imgUrl} alt={para.name}  className={`sm:w-[70%] mx-auto z-10 object-cover transition-opacity duration-300 ${!hideImage ? 'opacity-100 block' : 'opacity-0 hidden'}`} onLoad={handleImages} />
                    </div>
                    <section className='font-poppins text-white text-left sm:col-span-2 sm:row-span-1 p-4 sm:py-4 sm:px-8 z-10'>
                        <p className='font-Chakra text-3xl lg:text-4xl font-bold my-1'>{para.name}</p>
                        <p className='text-gray-300 sm:mt-4 hyphens-auto text-justify sm:mb-1'>{para.description}</p>
                        <div className='flex justify-between items-center my-2 py-2'>
                            <p className='text-slate-200 text-xl font-poppins py-1 px-2'>{Number(para.price).toLocaleString('en-IN',{
                                style:'currency',
                                currency:"INR",
                                minimumFractionDigits:0
                            })}/-</p>
                            <button className='bg-[#38bdf8] text-black p-2 rounded cursor-pointer' onClick={()=>
                                downloadNow(para)
                                }>
                                Download Now
                            </button>
                        </div>
                    </section>
                    {para.thumbPc && <img src={para.thumbPc} loading='lazy' className=' hidden sm:hidden md:hidden lg:block sm:col-span-3 absolute -top-0 -bottom-0 object-cover w-[100%] h-[100%]' />}
                    {para.thumbPc && <div className='sm:col-span-3 absolute -inset-0 bg-black/60'></div>}
                </div>
                <p className='mx-auto w-[85%] sm:w-[75%] font-poppins text-slate-50 text-left pt-4 sm:text-xl'>{para.name} System Requirements</p>
                <section className='mx-auto my-4 w-[85%] sm:w-[75%] relative flex flex-col md:flex-row md:gap-4 bg-[#18181c] py-4 px-4 md:px-8 items-center rounded'>
                        <article className='w-[100%]'>
                            <div>
                                <h4 className='text-white font-poppins text-left mb-4 underline decoration-[#38bdf8] decoration-2'>Minimum</h4>
                                <div className='flex flex-col gap-4'>
                                    <p className='flex flex-col font-poppins text-left'>
                                        <span className='text-[#757577] font-bold'>Operating System</span>
                                        <span className='text-slate-50'>{para.minimum.os}</span>
                                    </p>
                                    <p className='flex flex-col font-poppins text-left'>
                                        <span className='text-[#757577] font-bold'>Processor</span>
                                        <span className='text-slate-50'>{para.minimum.Processor}</span>
                                    </p>
                                    <p className='flex flex-col font-poppins text-left'>
                                        <span className='text-[#757577] font-bold'>Memory</span>
                                        <span className='text-slate-50'>{para.minimum.Ram}GB</span>
                                    </p>
                                    <p className='flex flex-col font-poppins text-left'>
                                        <span className='text-[#757577] font-bold'>GPU</span>
                                        <span className='text-slate-50'>{para.minimum.Graphics_card}</span>
                                    </p>
                                    <p className='flex flex-col font-poppins text-left'>
                                        <span className='text-[#757577] font-bold'>Video Memory</span>
                                        <span className='text-slate-50'>{para.minimum.Video_memory}GB</span>
                                    </p>
                                </div>
                            </div>
                        </article>
                        <article className='w-[100%] pt-4 md:pt-0'>
                            <div>
                                <h4 className='text-white font-poppins text-left mb-4 md:pt-0 underline decoration-[#38bdf8] decoration-2'>Recommended</h4>
                                <div className='flex flex-col gap-4'>
                                    <p className='flex flex-col font-poppins text-left'>
                                        <span className='text-[#757577] font-bold'>Operating System</span>
                                        <span className='text-slate-50'>{para.recommended.os}</span>
                                    </p>
                                    <p className='flex flex-col font-poppins text-left'>
                                        <span className='text-[#757577] font-bold'>Processor</span>
                                        <span className='text-slate-50'>{para.recommended.Processor}</span>
                                    </p>
                                    <p className='flex flex-col font-poppins text-left'>
                                        <span className='text-[#757577] font-bold'>Memory</span>
                                        <span className='text-slate-50'>{para.recommended.Ram}GB</span>
                                    </p>
                                    <p className='flex flex-col font-poppins text-left'>
                                        <span className='text-[#757577] font-bold'>GPU</span>
                                        <span className='text-slate-50'>{para.recommended.Graphics_card}</span>
                                    </p>
                                    <p className='flex flex-col font-poppins text-left'>
                                        <span className='text-[#757577] font-bold'>Video Memory</span>
                                        <span className='text-slate-50'>{para.recommended.Video_memory}GB</span>
                                    </p>
                                </div>
                            </div>
                        </article>
                    </section>
                </React.Fragment>
            })}
        </section>
    </div>
  )
}

export default GamePage;
