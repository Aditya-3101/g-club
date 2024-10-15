import React from 'react'

interface propsType  {
    dir?:string
    type?:string
}

export const Blank:React.FC<propsType> = ({dir,type}) =>{

    return<div className={`w-[100%] ${type==="pc-release"?'md:w-[22%]':''} bg-slate-800 ${dir==="horizontal"?'aspect-[3/2] sm:aspect-[4/2] md:aspect-[5/2]':'aspect-[2/3]'}
    animate-pulse mx-auto block`}>

    </div>
}