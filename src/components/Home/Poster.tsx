import React,{useState} from 'react'

type propsType = {
name:string,
thumbMobile?:string,
thumbPc?:string,
description:string
}


export const Poster = ({name,thumbMobile,thumbPc,description}:propsType) => {
    const [hideImage,setHideImage]=useState<boolean>(true)

    const handleImage = ()=>{
        setHideImage(false)
    }

    const showImages = () => {
        return <picture>
            <source media="(max-width:576px)" srcSet={thumbMobile} data-image={thumbMobile}/>
                <source media="(max-width:1280px)" srcSet={thumbPc} data-image={thumbPc}/>
                <img src={thumbPc} alt="game-cover" className={`${hideImage?'hidden':'block'} object-cover sm:object-cover w-[100%] relative aspect-[2/3] sm:aspect-[16/9]`}onLoad={handleImage}/>
        </picture>
    }

    return<div className='poster w-[95x%] sm:w-[100%] mx-auto relative snap-start'>
        {hideImage&&<div className='w-[100%] bg-slate-800 aspect-[2/3] animate-pulse'></div>}
        {showImages()}
            <div className='absolute inset-0 bg-gradient-to-t from-black/70'></div>
            <div className='absolute w-[100%] -left-0 -bottom-0 py-1'>
                <p className=' text-white font-prism text-xl sm:text-4xl font-medium pl-2 text-left'>{name}</p>
                <p className='line-clamp-2 sm:line-clamp-2 text-slate-400 sm:text-2xl font-roboto text-xs w-4/5 text-left pl-2'>{description}</p>
            </div>
        </div>
}