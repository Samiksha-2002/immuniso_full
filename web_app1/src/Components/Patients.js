import React, { useRef, useState } from 'react'
import search from '../Images/search.png'
import backBtn from '../Images/back.png'
import profile from '../Images/profile.png'
import add from '../Images/add.png'
import '../css/consultations.css'
import '../css/doctors.css'
import triangle from "../Images/triangle.png";
import copy from '../Images/copy_green.png'
import '../css/patients.css'
import heart from '../Images/heart.png'

function Patients() {
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


  const [ccIndex, setCcIndex] = useState(0);
  const [medIndex, setMedIndex] = useState(0);

  const handleCcLeftSlide = () => {
    if (ccIndex > 0) {
      setCcIndex(ccIndex - 1);
      console.log(ccIndex);
    }
  };

  const handleCcRightSlide = () => {
    if (ccIndex < 2) {
      setCcIndex(ccIndex + 1);
      console.log(ccIndex);
    }
  };

  const handleMedLeftSlide = () => {
    if (medIndex > 0) {
      setMedIndex(medIndex - 1);
      console.log(medIndex);
    }
  };
  const handleMedRightSlide = () => {
    if (medIndex < 2) {
      setMedIndex(medIndex + 1);
      console.log(medIndex);
    }
  };
  return (
    <div className='conMain docMain'>
      {isFocused && <div className="blur"></div>}
      <div className="sna">
      
      
      <div className="searchnRes">

        <div className="cdpNavbar" onClick={handleSearchClick}>
          <div className="cdpn">
          {/* <div className="searchImg"></div> */}
          <button><img src={backBtn} alt="" /></button>
          <div className="cdpSearch">
              <input type="text" placeholder='Search Patients & Doctors'
              ref={searchInputRef}
              onBlur={handleBlur}
              onFocus={() => setIsFocused(true)}/>
              <div className="sImg">
                <img src={search} alt="search" />
              </div>
            </div>
            </div>
            <div className="penProf">
              <button>Pending List</button>
              <img src={profile} alt="profile" />
            </div>
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
        <div className="cdpNewOn allCon">
          
          <div className="cdpno">
            <div className="cdpProf">
              <div className="pinkBox">
                <div className="profImg">
                  <img src={profile} alt="profile" />
                  <div className="pDesc">
                    <p>Deepak</p>
                    <p>+91 62992-82990</p>
                    <p>PID: #123456789</p>
                  </div>
                </div>
                <button>View Profile</button>
              </div>
              {/* <div className="pinkLine pl"></div> */}
              <div className="hfu">
                  <button>
                    <img src={heart} alt="heart" />
                    <p>Health Plan</p>
                  </button>
                  <button>
                    <img src={heart} alt="heart" />
                    <p>Follow Up</p>
                  </button>
              </div>
              <div className="pinkBox">
                <p>Focus Area</p>
                <b>Diabetes</b>
              </div>
              {/* <div className="pinkLine pl2"></div> */}
              <div className="pinkBox pb">
                <p>Linked Doctor</p>
                <b className='pink'>Dr. Rishabh</b>
              </div>
             
            </div>
          </div>
          <div className="cdpno">
            <div className="cdpProf">
              <div className="pinkBox">
                <div className="profImg">
                  <img src={profile} alt="profile" />
                  <div className="pDesc">
                    <p>Deepak</p>
                    <p>+91 62992-82990</p>
                    <p>PID: #123456789</p>
                  </div>
                </div>
                <button>View Profile</button>
              </div>
              {/* <div className="pinkLine pl"></div> */}
              <div className="hfu">
                  <button>
                    <img src={heart} alt="heart" />
                    <p>Health Plan</p>
                  </button>
                  <button>
                    <img src={heart} alt="heart" />
                    <p>Follow Up</p>
                  </button>
              </div>
              <div className="pinkBox">
                <p>Focus Area</p>
                <b>Diabetes</b>
              </div>
              {/* <div className="pinkLine pl2"></div> */}
              <div className="pinkBox pb">
                <p>Linked Doctor</p>
                <b className='pink'>Dr. Rishabh</b>
              </div>
             
            </div>
          </div>
          <div className="cdpno">
            <div className="cdpProf">
              <div className="pinkBox">
                <div className="profImg">
                  <img src={profile} alt="profile" />
                  <div className="pDesc">
                    <p>Deepak</p>
                    <p>+91 62992-82990</p>
                    <p>PID: #123456789</p>
                  </div>
                </div>
                <button>View Profile</button>
              </div>
              {/* <div className="pinkLine pl"></div> */}
              <div className="hfu">
                  <button>
                    <img src={heart} alt="heart" />
                    <p>Health Plan</p>
                  </button>
                  <button>
                    <img src={heart} alt="heart" />
                    <p>Follow Up</p>
                  </button>
              </div>
              <div className="pinkBox">
                <p>Focus Area</p>
                <b>Diabetes</b>
              </div>
              {/* <div className="pinkLine pl2"></div> */}
              <div className="pinkBox pb">
                <p>Linked Doctor</p>
                <b className='pink'>Dr. Rishabh</b>
              </div>
             
            </div>
          </div>
          <div className="cdpno">
            <div className="cdpProf">
              <div className="pinkBox">
                <div className="profImg">
                  <img src={profile} alt="profile" />
                  <div className="pDesc">
                    <p>Deepak</p>
                    <p>+91 62992-82990</p>
                    <p>PID: #123456789</p>
                  </div>
                </div>
                <button>View Profile</button>
              </div>
              {/* <div className="pinkLine pl"></div> */}
              <div className="hfu">
                  <button>
                    <img src={heart} alt="heart" />
                    <p>Health Plan</p>
                  </button>
                  <button>
                    <img src={heart} alt="heart" />
                    <p>Follow Up</p>
                  </button>
              </div>
              <div className="pinkBox">
                <p>Focus Area</p>
                <b>Diabetes</b>
              </div>
              {/* <div className="pinkLine pl2"></div> */}
              <div className="pinkBox pb">
                <p>Linked Doctor</p>
                <b className='pink'>Dr. Rishabh</b>
              </div>
             
            </div>
          </div>
          <div className="cdpno">
            <div className="cdpProf">
              <div className="pinkBox">
                <div className="profImg">
                  <img src={profile} alt="profile" />
                  <div className="pDesc">
                    <p>Deepak</p>
                    <p>+91 62992-82990</p>
                    <p>PID: #123456789</p>
                  </div>
                </div>
                <button>View Profile</button>
              </div>
              {/* <div className="pinkLine pl"></div> */}
              <div className="hfu">
                  <button>
                    <img src={heart} alt="heart" />
                    <p>Health Plan</p>
                  </button>
                  <button>
                    <img src={heart} alt="heart" />
                    <p>Follow Up</p>
                  </button>
              </div>
              <div className="pinkBox">
                <p>Focus Area</p>
                <b>Diabetes</b>
              </div>
              {/* <div className="pinkLine pl2"></div> */}
              <div className="pinkBox pb">
                <p>Linked Doctor</p>
                <b className='pink'>Dr. Rishabh</b>
              </div>
             
            </div>
          </div>
          <div className="cdpno">
            <div className="cdpProf">
              <div className="pinkBox">
                <div className="profImg">
                  <img src={profile} alt="profile" />
                  <div className="pDesc">
                    <p>Deepak</p>
                    <p>+91 62992-82990</p>
                    <p>PID: #123456789</p>
                  </div>
                </div>
                <button>View Profile</button>
              </div>
              {/* <div className="pinkLine pl"></div> */}
              <div className="hfu">
                  <button>
                    <img src={heart} alt="heart" />
                    <p>Health Plan</p>
                  </button>
                  <button>
                    <img src={heart} alt="heart" />
                    <p>Follow Up</p>
                  </button>
              </div>
              <div className="pinkBox">
                <p>Focus Area</p>
                <b>Diabetes</b>
              </div>
              {/* <div className="pinkLine pl2"></div> */}
              <div className="pinkBox pb">
                <p>Linked Doctor</p>
                <b className='pink'>Dr. Rishabh</b>
              </div>
             
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Patients