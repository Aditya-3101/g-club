import React, { useState } from 'react';
import fallback from '../../imgs/fallback.jpg';

type propsType = {
    name: string,
    price: number,
    orgPrice: number,
    imgUrl: string,
    type?:string,
}

export const ReleaseCard = ({imgUrl,name,orgPrice,price}:propsType) => {
    const [handleImage,setHandleImage] = useState(true)

    const calculateDiscount = (a:number,b:number) => {
        const c = ((a-b)/a)*100
        return Number(c).toFixed(0)
    }

    const handleImages = (event:React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = event.target as HTMLImageElement;
        target.src=fallback
    }

    const handleLoadingImages = ():void => {
        setHandleImage(false)
    }

    return<div className={`w-[90%] mx-auto`}>
        <img src={imgUrl} alt={name} className={`aspect-[2/3] object-cover no-scrollbar my-1 rounded-lg w-[100%] ${!handleImage?'block':'hidden'}`} loading='eager' onError={handleImages} onLoad={handleLoadingImages}/>
        {handleImage&&<div className='w-[100%] bg-slate-800 aspect-[2/3] animate-pulse'></div>}

        <p className='text-slate-200 text-lg text-left font-poppins'>{name}</p>
        <div className='text-white flex gap-4 font-poppins flex-wrap items-center'>
            <p className='line-through text-[#949494]'>{Number(orgPrice).toLocaleString('en-IN',{
                style:'currency',
                currency:"INR",
                minimumFractionDigits:0
            })}
            </p>
            <p className='text-slate-200'>{Number(price).toLocaleString('en-IN',{
                style:'currency',
                currency:'INR',
                minimumFractionDigits:0
                })}
            </p>
            <p className='bg-sky-400 text-black py-[1px] px-[4px] rounded-full'>-{calculateDiscount(orgPrice,price)}%</p>
            </div>
        </div>
}