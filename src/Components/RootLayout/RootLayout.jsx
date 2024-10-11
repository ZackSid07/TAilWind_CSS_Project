import React from 'react'
import HomeLeft from "../HomeComponent/HomeLeft/HomeLeft.jsx"
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='flex p-6 gap-x-10'>
      <HomeLeft/>
      <Outlet/>
    </div>
  )
}

export default RootLayout