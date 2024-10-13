import React,{useState,useEffect, useRef} from 'react';
import { Poster } from './Poster.tsx';
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
    "thumbPc"?:string
    "downloads":number
}[]

export const Carousel:React.FC = () => {

    const [data,setData]=useState<ResponseType>([])
    const [currentPoster,setCurrentPoster]=useState(1)
    const posterRef = useRef<HTMLDivElement|null>(null);
    const fetchStatus = useRef(false)

    const divItems:JSX.Element[] = [];

    function fetchData():void{
        fetch('https://gstore-api.vercel.app/games/thumb')
        .then(res=>res.json())
        .then(result=>{
            setData(result)
        })
        .catch(err=>{
            console.log(err)
        })
    }


    useEffect(()=>{
        if(!fetchStatus.current){
        fetchData()
        fetchStatus.current=true
        }
    },[])

    useEffect(()=>{
        const cards = posterRef.current?.querySelectorAll('.poster') || [];
        
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach(entry=>{
                if(entry.isIntersecting && cards!==null){
                    const cardIndex = Array.from(cards).indexOf(entry.target);
                    setCurrentPoster(cardIndex+1)
                }
            })
        },{threshold:0.7});
        cards.forEach(card=>observer.observe(card));

        return()=>{
            observer.disconnect();
        }
    },[data])

    for(let i=1; i<=data.length;i++){
        divItems.push(<div key={i} className={`w-[5px] h-[5px] ${currentPoster===i?'bg-white':'bg-gray-500'} rounded-full`}></div>)
    }



    return<div className='w-[80%] sm:w-[70%] mx-auto'>
        <div ref={posterRef} className='poster-container grid grid-flow-col auto-cols-[90%] sm:auto-cols-[95%] overflow-x-auto overscroll-x-contain snap-mandatory snap-x sm:gap-8 gap-4 no-scrollbar'>
        {data && data.map((par,index)=>{
            return <Link to={`/games/${par.name}`} key={index}><Poster name={par.name} thumbPc={par.thumbPc} thumbMobile={par.thumbMobile} description={par.description}/>
            </Link>
        })}
    </div>
    <div className='w-[100%] flex my-8 justify-center gap-4'>
        {divItems}
    </div>
    </div>
}