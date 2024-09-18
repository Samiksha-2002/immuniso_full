import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import profile from '../Images/profile.png';
import search from '../Images/search.png'

function Dash1() {
  const searchInputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchClick = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
      setIsFocused(true);
    }
  };

  const handleBlur = (e) => {
    // Check if the blur event is related to clicking inside the allResults div
    if (e.relatedTarget && e.relatedTarget.closest('.allResults')) {
      return; // Prevent losing focus if clicking inside allResults
    }
    setIsFocused(false);
  };

  return (
    <div className='dash1'>
      {isFocused && <div className="blur"></div>}
      
      <div className="searchnRes">

        <div className="search" onClick={handleSearchClick}>
          {/* <div className="searchImg"></div> */}
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
            tabIndex={-1} // This allows the div to receive focus
            onMouseDown={(e) => e.preventDefault()} // Prevent losing focus on click
          >
            <p>In Profiles</p>
            <p>Prof 1</p>
            <p>Prof 2</p>
            <p>Prof 3</p>
          </div>
        )}
      </div>

      <div className="rcob">
        <div className="recSearch">
          <h2>Recently Searched</h2>
          <Link to={'/dash2'}>25045034</Link>
          <Link to={'/dash2'}>Ramesh Sharma</Link>
          <Link to={'/dash2'}>Saurabh Shah</Link>
          <Link to={'/dash2'}>75896412</Link>
          <Link to={'/dash2'}>65842132</Link>

          <button>Clear Search History</button>
        </div>
        <div className="newOn">
          <div className="noHead">
            <h2>New Onboarding</h2>
            <button>Manage All</button>
          </div>
          <div className="allNew">
            <div className="anPat">
              <img src={profile} alt="profile" />
              <div className="apInfo">
                <p>Deepak Sharma</p>
                <p>+91 62992-82990</p>
              </div>
            </div>
            <div className="anPat">
              <img src={profile} alt="profile" />
              <div className="apInfo">
                <p>Deepak Sharma</p>
                <p>+91 62992-82990</p>
              </div>
            </div>
            <div className="anPat">
              <img src={profile} alt="profile" />
              <div className="apInfo">
                <p>Deepak Sharma</p>
                <p>+91 62992-82990</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dash1;
