import React from 'react'
import {Outlet} from 'react-router'
import { Navbar } from '../Home/Navbar.tsx'
import { Footer } from '../Home/Footer.tsx'
import { Suspense } from 'react'

export const HomeLayout:React.FC = () => {
    return<main className='App max-w-[1600px] mx-auto'>
        <Navbar/>
        <Suspense fallback={<h1 className='p-4 text-xl text-slate-50 w-full bg-[#101014] '>Loading.....</h1>}>
        <Outlet/>
        </Suspense>
        <Footer/>
    </main>
}