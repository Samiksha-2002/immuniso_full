import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import '../css/home.css'

function Home() {
  return (
    <div className='home'>
        <Sidebar/>
        <Outlet/>
    </div>
  )
}

export default Home