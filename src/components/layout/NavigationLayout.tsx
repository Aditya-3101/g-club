import React from 'react'
import { Outlet } from 'react-router'
import { BreadCrumb } from '../Navigation/BreadCrumb.tsx'

export const NavigationLayout = () => {

    return(
        <div className='bg-[#101014] w-[100%] text-wrap'>
            <BreadCrumb/>
            <Outlet/>
        </div>
    )
}