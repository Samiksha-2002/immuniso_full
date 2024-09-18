import React from 'react'
import { Outlet } from 'react-router-dom'

function Dashboard() {
  return (
    <div className='dashboard'>
        <Outlet/>
    </div>
  )
}

export default Dashboard