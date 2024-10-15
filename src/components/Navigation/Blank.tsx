import React from 'react'

interface propsType  {
    dir?:string
    type?:string
    about?:string
}

export const Blank:React.FC<propsType> = ({dir,type,about}) =>{

    // ${dir==="vertical"?'aspect-[2/3] sm:aspect-[4/2] md:aspect-[5/2]':'aspect-[3/2] sm:aspect-[4/2] md:aspect-[5/2]'}

    console.log(about)

    return<div className={`w-[100%] ${type==="pc-release"?'md:w-[22%]':''} bg-slate-800 ${dir==="horizontal"?'aspect-[3/2] sm:aspect-[4/2] md:aspect-[5/2]':about==="carousel"?'aspect-[2/3] sm:aspect-[4/2] md:w-[5/2]':'aspect-[2/3]'}`}>
    </div>
}