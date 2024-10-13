import React from 'react';
import { SearchBar } from './Search.tsx';
import { Carousel } from './Carousel.tsx';
import { NewRelease } from './NewReleases.tsx';
import { TopSellers } from './TopSellers.tsx';
import { Browse } from './Browse.tsx';
import { Deal } from './Deal.tsx';
import { Onsale } from './Onsale.tsx';
import { KeepAlive } from 'react-activation';

export const MainPage:React.FC = () => {
  return (<KeepAlive>
    <div className='bg-[#101014] w-full h-auto'>  
      <SearchBar/>
      <Carousel />
      <NewRelease/>
      <TopSellers/>
      <Browse/>
      <Deal/>
      <Onsale/>
    </div>
    </KeepAlive>
  )
}
