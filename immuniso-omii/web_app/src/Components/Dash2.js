import React, { useRef, useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import patientProf from '../Images/patient_prof.jpg';
import search from '../Images/search.png';
import copy from '../Images/copy.png';
import copyGreen from '../Images/copy_green.png';
import { database } from '../firebase'; // Ensure this is the correct path to your firebase.js
import { storage } from '../firebase'; // Ensure this path is correct
import { ref as storageRef, getDownloadURL } from 'firebase/storage';

function Dash2() {
  const searchInputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [patientData, setPatientData] = useState(null); // State for patient data
  const location = useLocation();
  const { pathname } = location;
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    const patientRef = ref(database, 'patients/ramesh'); // Adjust path to match your database structure

    onValue(patientRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Retrieved data:', data); // Log the data retrieved
      setPatientData(data); // Set patient data to state
    }, (error) => {
      console.error('Error fetching data:', error);
    });

    const fetchImage = async () => {
      try {
        const imageRef = storageRef(storage, 'gs://immunisofire1.appspot.com/patientprofiles/images.jpeg'); // Replace with your image path
        const url = await getDownloadURL(imageRef);
        setImageURL(url);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, []);

  const handleSearchClick = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
      setIsFocused(true);
    }
  };

  const handleBlur = (e) => {
    if (e.relatedTarget && e.relatedTarget.closest('.allResults')) {
      return; 
    }
    setIsFocused(false);
  };


  return (
    <div className='dash2'>
      <div className="navbar">
        {isFocused && <div className="blur"></div>}
        
        <div className="searchnRes">
          <div className="search" onClick={handleSearchClick}>
            <img src={search} alt="search" className='searchImg'/>
            <input
              type="text"
              placeholder='Search Patients, Patient Id & Doctors'
              ref={searchInputRef}
              onBlur={handleBlur}
              onFocus={() => setIsFocused(true)}
            />
          </div>

          {isFocused && (
            <div 
              className="allResults" 
              tabIndex={-1}
              onMouseDown={(e) => e.preventDefault()}
            >
              <p>In Profiles</p>
              <p>Prof 1</p>
              <p>Prof 2</p>
              <p>Prof 3</p>
            </div>
          )}
        </div>

        <div className="piwc">
          <div className="pi">
            <p>Patient ID :  </p>
            <b>{patientData?.ID || 'N/A'}</b>
            <img src={copy} alt="copy" className='copy'/>
          </div>
          <div className="pi">
            <p>WA Contact :  </p>
            <b>{patientData?.contact || 'N/A'}</b>
            <img src={copyGreen} alt="copy" className='copy'/>
          </div>
        </div>
      </div>

      <div className="d2Scroll">
        <div className="d2Top">
          <img src={imageURL || patientProf} alt="patientProf" /> {/* Add a default image if needed */}
          <div className="desc">
            {patientData ? (
              <>
                <div className="dtd">
                  <p>Name: <b>{patientData.name || 'N/A'}</b></p>
                  <p>Age: <b>{patientData.age || 'N/A'}</b></p>
                  <p>Gender: <b>{patientData.gender || 'N/A'}</b></p>
                  <p>BMI: <b>{patientData.bmi || 'N/A'}</b></p>
                </div>
                <div className="dtd">
                  <p>Address: <b>{patientData.address || 'N/A'}</b></p>
                </div>
                <div className="dtd">
                  <p>Medical History: <b>{patientData.medicalHistory || 'N/A'}</b></p>
                </div>
              </>
            ) : (
              <p>Loading data...</p>
            )}
          </div>
        </div>
        <div className="d2Links">
          <Link to={'/dash2/goalsettings'} style={{ 
                        backgroundColor: pathname === '/dash2' ? '#404040' : 'white',
                        color: pathname === '/dash2' ? 'white' : '#404040' 
                    }}>Goal Settings</Link>
          <Link to={'/dash2/detass'} style={{ 
                        backgroundColor: pathname === '/dash2/detass' ? '#404040' : 'white',
                        color: pathname === '/dash2/detass' ? 'white' : '#404040' 
                    }}>Detailed Assessment</Link>
          <Link to={'/dash2/folup'} style={{ 
                        backgroundColor: pathname === '/dash2/folup' ? '#404040' : 'white',
                        color: pathname === '/dash2/folup' ? 'white' : '#404040' 
                    }}>Follow Up</Link>
          <Link to={'/dash2/helpan'} style={{ 
                        backgroundColor: pathname === '/dash2/helpan' ? '#404040' : 'white',
                        color: pathname === '/dash2/helpan' ? 'white' : '#404040' 
                    }}>Health Plan</Link>
        </div>
        <Outlet/>
      </div>
    </div>
  );
}

export default Dash2;