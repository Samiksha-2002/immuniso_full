import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import dashWhite from '../Images/dashboard_white.png'
import consBlack from '../Images/consultations_black.png'
import docBlack from '../Images/doctor_black.png'
import patBlack from '../Images/patients_black.png'
import profile from '../Images/profile.png'
import logout from '../Images/logout.png'


function Sidebar() {
    const location = useLocation();
    const { pathname } = location;

    return (
        <div className='sidebar'>
            <h1>Immuniso</h1>
            <div className="sideCont">
                <Link 
                    to={'/dash'} 
                    className="sdc" 
                    style={{ 
                        backgroundColor: (pathname === '/' || pathname.startsWith('/dash2')) ? '#404040' : 'white',
                        color: (pathname === '/' || pathname.startsWith('/dash2')) ? 'white' : '#404040'
                    }}

                    
                >
                    <img src={dashWhite} alt="Dashboard" />
                    <p>Dashboard</p>
                </Link>
                <p className='manset'>Manage</p>
                <Link 
                    to={'/consultations'} 
                    className="sdc" 
                    style={{ 
                        backgroundColor: pathname === '/consultations' ? '#404040' : 'white',
                        color: pathname === '/consultations' ? 'white' : '#404040' 
                    }}
                >
                    <img src={consBlack} alt="Consultations" />
                    <p>Consultations</p>
                </Link>
                <Link 
                    to={'/doctors'} 
                    className="sdc" 
                    style={{ 
                        backgroundColor: pathname === '/doctors' ? '#404040' : 'white',
                        color: pathname === '/doctors' ? 'white' : '#404040' 
                    }}
                >
                    <img src={docBlack} alt="Doctors" />
                    <p>Doctors</p>
                </Link>
                <Link 
                    to={'/patients'} 
                    className="sdc" 
                    style={{ 
                        backgroundColor: pathname === '/patients' ? '#404040' : 'white',
                        color: pathname === '/patients' ? 'white' : '#404040' 
                    }}
                >
                    <img src={patBlack} alt="Patients" />
                    <p>Patients</p>
                </Link>
            </div>
            <div className="sideBottom">
                <p className='manset'>Settings</p>
                <Link 
                    to={'/profile'} 
                    className="sdc" 
                    style={{ 
                        backgroundColor: pathname === '/profile' ? '#404040' : 'white',
                        color: pathname === '/profile' ? 'white' : '#404040' 
                    }}
                >
                    <img src={profile} alt="My Profile" className='profPic'/>
                    <p>My Profile</p>
                </Link>
                <Link 
                    to={'/logout'} 
                    className="sdc"
                >
                    <img src={logout} alt="Log Out" />
                    <p>Log Out</p>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar
