import React from 'react';
import { BrowseCard } from './BrowseCard.tsx';

export const Browse:React.FC = () => {
    const types = [
        {
            type:'Action',
            thumb:'https://i.postimg.cc/PxPnqhcP/fighting-game-4597296-3828558-removebg-preview.png'
        },
        {
            type:'Multiplayer',
            thumb:'https://i.postimg.cc/Qxq4vw4P/image-removebg-preview-2.png'
        },
        {
            type:'Racing',
            thumb:'https://i.postimg.cc/LsW0NPC8/image-removebg-preview-1.png'
        },
        {
            type:'Casual',
            thumb:'https://i.postimg.cc/SKxwZkmD/image-removebg-preview.png'
        }
    ]

    return<div className='flex flex-col items-center justify-center'>
            <p className='w-4/5 font-roboto text-white flex items-center text-2xl sm:text-3xl text-left'>Browse By Category</p>
        <section className='w-4/5 grid grid-cols-2 sm:grid-cols-4  gap-4 sm:gap-8 my-2 sm:my-4'>
            {types&&types.map((par,index)=>{
                return<BrowseCard key={index} thumb={par.thumb} type={par.type} />
            })}
        </section>
    </div>
}