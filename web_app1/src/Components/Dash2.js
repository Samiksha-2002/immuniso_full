import React, { useRef, useState, useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import patientProf from '../Images/patient_prof.jpg';
import search from '../Images/search.png';
import { database, storage } from '../firebase'; 
import { ref as storageRef, getDownloadURL } from 'firebase/storage';

import FollowUp from './FollowUp';
import GoalSettings from './GoalSettings';
import DetailedAssessment from './DetailedAssessment';
import HealthPlans from './HealthPlans';

function Dash2() {
  const { patientName } = useParams(); 
  const searchInputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [activeComponent, setActiveComponent] = useState('GoalSettings'); // Default to GoalSettings
  
  

  // Fetch patient data based on the patient's name
  useEffect(() => {
    if (patientName && !/[\.\#\$\[\]]/.test(patientName)) { 
      const escapedPatientName = patientName.replace(/[\.\#\$\[\]]/g, '_');
      const patientRef = ref(database, `patients/${escapedPatientName}`);
      onValue(patientRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setPatientData(data);
          fetchImage(data.ID); // Fetch image after patient data is loaded
        } else {
          console.log(`No data found for patient: ${patientName}`);
          setPatientData(null); 
        }
      }, (error) => {
        console.error('Error fetching patient data:', error);
      });
    }
  }, [patientName]);

  // Fetch profile image from Firebase storage
  const fetchImage = async (patientID) => {
    try {
      // Try fetching JPG first
      const jpgRef = storageRef(storage, `patientprofiles/patients/${patientID}.jpg`);
      let url = await getDownloadURL(jpgRef);
      setImageURL(url);
      return; // Exit if JPG is found
  
    } catch (error) {
      // If JPG not found, try fetching JPEG
      try {
        const jpegRef = storageRef(storage, `patientprofiles/patients/${patientID}.jpeg`);
        const url = await getDownloadURL(jpegRef);
        setImageURL(url);
      } catch (error) {
        console.error('Error fetching image:', error);
        setImageURL(patientProf); // Default image if error occurs
      }
    }
  };
  

  // Handle search logic
  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const patientRef = ref(database, 'patients');
      
      onValue(patientRef, (snapshot) => {
        const data = snapshot.val();
        const results = [];

        if (data) {
          Object.keys(data).forEach((key) => {
            const patient = data[key];
            if (
              patient.full_name.toLowerCase().includes(query) ||
              patient.ID.toString().includes(query)
            ) {
              results.push({ name: key, ...patient }); 
            }
          });
          setSearchResults(results);
        } else {
          console.log('No patients data available.');
        }
      }, (error) => {
        console.error('Error fetching patients data:', error);
      });
    } else {
      setSearchResults([]); 
    }
  }, [searchQuery]);

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

  const handleSearchResultClick = (patient) => {
    navigate(`/dash2/${patient.name}`); 
    setIsFocused(false);
  };

  const handleLinkClick = (componentName) => {
    setActiveComponent(componentName);
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
              placeholder='Search Patients'
              ref={searchInputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={handleBlur}
              onFocus={() => setIsFocused(true)}
            />
          </div>

          {isFocused && searchQuery && (
            <div 
              className="allResults" 
              tabIndex={-1}
              onMouseDown={(e) => e.preventDefault()} // Prevent losing focus on click
            >
              <p>In Profiles</p>
              {searchResults.length > 0 ? (
                searchResults.map((item, index) => (
                  <Link 
                    key={index}
                    to={`/dash2/${item.name}`} // Redirect on click
                    onClick={() => handleSearchResultClick(item)}
                  >
                    {item.name} - {item.ID}
                  </Link>
                ))
              ) : (
                <p>No results found</p>
              )}
            </div>
          )}
        </div>

        <div className="piwc">
          <div className="pi">
            <p>Patient id :  </p>
            <b>{patientData ? patientData.ID : 'N/A'}</b>
          </div>
          <div className="pi">
            <p>WA Contact :  </p>
            <b>{patientData ? patientData.contact : 'N/A'}</b>
          </div>
        </div>
      </div>

      <div className="d2Scroll">
        <div className="d2Top">
          <img src={imageURL} alt="patientProf" />
          <div className="desc">
            {patientData ? (  
              <>
                <div className="dtd">
                  <p>Name: <b>{patientData.full_name || 'N/A'}</b></p>
                  <p>Age: <b>{patientData.age || 'N/A'}</b></p>
                  <p>Gender: <b>{patientData.gender || 'N/A'}</b></p>
                  <p>BMI: <b>{patientData.bmi || 'N/A'}</b></p>
                </div>
                <div className="dtd">
                  <p>Address: <b>{patientData.address || 'N/A'}</b></p>
                </div>
                <div className="dtd">
                  <p>Medical History: <b>{patientData.medical_history || 'N/A'}</b></p>
                </div>
              </>
            ) : (
              <p>Loading data...</p>
            )}
          </div>
        </div>
        <div className="d2Links">
          <button to={'/dash2/goalsettings'} onClick={() => handleLinkClick('GoalSettings')} style={{ 
                        backgroundColor: pathname === '/dash2/goalsettings' ? '#404040' : 'white',
                        color: pathname === '/dash2/goalsettings' ? 'white' : '#404040' 
                    }}>Goal Settings</button>
          <button to={'/dash2/detass'} onClick={() => handleLinkClick('DetailedAssessment')} style={{
                        backgroundColor: pathname === '/dash2/detass' ? '#404040' : 'white',
                        color: pathname === '/dash2/detass' ? 'white' : '#404040' 
                    }}>Detailed Assessment</button>
          <button to={'/dash2/folup'} onClick={() => handleLinkClick('FollowUp')} style={{ 
                        backgroundColor: pathname === '/dash2/folup' ? '#404040' : 'white',
                        color: pathname === '/dash2/folup' ? 'white' : '#404040' 
                    }}>Follow Up</button>
          <button to={'/dash2/helpan'} onClick={() => handleLinkClick('HealthPlans')} style={{
                        backgroundColor: pathname === '/dash2/helpan' ? '#404040' : 'white',
                        color: pathname === '/dash2/helpan' ? 'white' : '#404040' 
                    }}>Health Plan</button>
        </div>
        
        {/* Conditional rendering for active components, passing patientData */}
        {activeComponent === 'GoalSettings' && <GoalSettings patientData={patientData} />}
        {activeComponent === 'DetailedAssessment' && <DetailedAssessment patientData={patientData} />}
        {activeComponent === 'FollowUp' && <FollowUp patientData={patientData} />}
        {activeComponent === 'HealthPlans' && <HealthPlans patientData={patientData} />}
      </div>
    </div>
  );
}

export default Dash2;
