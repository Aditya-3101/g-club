import React from 'react';
import { Link } from 'react-router-dom';

type propsType = {
    thumb:string,
    type:string
}

export const BrowseCard = ({thumb,type}:propsType) =>{
    return<Link to={`/${type}`}><div className='flex-1  relative p-4 border rounded-xl'>
    <img src={thumb} alt={type} loading='lazy' className='invert aspect-square object-cover w-[40%] mx-auto' />
    <p className='text-xl font-poppins -left-0 -bottom-0 -right-0 text-slate-100 mx-auto truncate'>{type}</p>
</div>
    </Link>
}