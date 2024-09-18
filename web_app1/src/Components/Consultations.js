import React, { useRef, useState } from 'react'
import search from '../Images/search.png'
import backBtn from '../Images/back.png'
import profile from '../Images/profile.png'
import add from '../Images/add.png'
import '../css/consultations.css'


function Consultations() {
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
    <div className='conMain'>
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
          <img src={profile} alt="profile" />
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
        <div className="cdpNewOn">
          <h1>New Onboards</h1>
          <div className="cdpno">
            <div className="cdpProf">
              <div className="pinkBox">
                <div className="profImg">
                  <img src={profile} alt="profile" />
                  <div className="pDesc">
                    <p>Deepak</p>
                    <p>+91 62992-82990</p>
                  </div>
                </div>
                <button>View Profile</button>
              </div>
              <div className="pinkLine pl"></div>
              <div className="pinkBox">
                <p>First Consultation Call</p>
                <button>Consultation Form</button>
              </div>
              <div className="pinkLine pl2"></div>
              <div className="pinkBox pb">
                <p>Link Doctor</p>
                <select>
                  <option value="Speciality">Speciality</option>
                  <option value="Speciality2">Speciality2</option>
                  <option value="Speciality3">Speciality3</option>
                </select>
                <select>
                  <option value="Select Doctor">Select Doctor</option>
                  <option value="Select Doctor2">Select Doctor2</option>
                  <option value="Select Doctor3">Select Doctor3</option>
                </select>
              </div>
              <div className="pinkLine pl2"></div>
              <div className="saveBtn">
                <button>Save</button>
              </div>
            </div>
            <div className="cdpProf">
              <div className="pinkBox">
                <div className="profImg">
                  <img src={profile} alt="profile" />
                  <div className="pDesc">
                    <p>Deepak</p>
                    <p>+91 62992-82990</p>
                  </div>
                </div>
                <button>View Profile</button>
              </div>
              <div className="pinkLine pl"></div>
              <div className="pinkBox">
                <p>First Consultation Call</p>
                <button>Consultation Form</button>
              </div>
              <div className="pinkLine pl2"></div>
              <div className="pinkBox pb">
                <p>Link Doctor</p>
                <select>
                  <option value="Speciality">Speciality</option>
                  <option value="Speciality2">Speciality2</option>
                  <option value="Speciality3">Speciality3</option>
                </select>
                <select>
                  <option value="Select Doctor">Select Doctor</option>
                  <option value="Select Doctor2">Select Doctor2</option>
                  <option value="Select Doctor3">Select Doctor3</option>
                </select>
              </div>
              <div className="pinkLine pl2"></div>
              <div className="saveBtn svBtn">
                <button>Save</button>
              </div>
            </div>
          </div>
        </div>
        <div className="cdpNewOn allCon">
          <div className="cdpnTop">
            <div className="headFit">
              <h1>All Consultations</h1>
              <div className="filters">
                <div className="flt">
                  <p>Upcoming Consultations</p>
                  <p>&#10005;</p>
                </div>
              </div>
            </div>
            <button>
              <img src={add} alt="add" />
              <p>Add Filter</p>
            </button>
          </div>
          
          <div className="cdpno">
            <div className="cdpProf">
              <div className="pinkBox">
                <div className="profImg">
                  <img src={profile} alt="profile" />
                  <div className="pDesc">
                    <p>Deepak</p>
                    <p>+91 62992-82990</p>
                  </div>
                </div>
                <button>View Profile</button>
              </div>
              {/* <div className="pinkLine pl"></div> */}
              <div className="pinkBox">
                <p>Focus Area</p>
                <b>Diabetes</b>
              </div>
              {/* <div className="pinkLine pl2"></div> */}
              <div className="pinkBox pb">
                <p>Linked Doctor</p>
                <b className='pink'>Dr. Rishabh</b>
              </div>
              <div className="pinkBox">
                <p>Recent Consultation Report</p>
                <button>Download</button>
              </div>
              {/* <div className="pinkLine pl2"></div> */}
              <div className="upCon">
                <p>Upcoming</p>
                <p>16/08/2024</p>
                <div className="conNumber">
                  <p>10<sup>th</sup></p>
                  <p>Consultation</p>
                </div>
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
                  </div>
                </div>
                <button>View Profile</button>
              </div>
              {/* <div className="pinkLine pl"></div> */}
              <div className="pinkBox">
                <p>Focus Area</p>
                <b>Diabetes</b>
              </div>
              {/* <div className="pinkLine pl2"></div> */}
              <div className="pinkBox pb">
                <p>Linked Doctor</p>
                <b className='pink'>Dr. Rishabh</b>
              </div>
              <div className="pinkBox">
                <p>Recent Consultation Report</p>
                <button>Download</button>
              </div>
              {/* <div className="pinkLine pl2"></div> */}
              <div className="upCon">
                <p>Upcoming</p>
                <p>16/08/2024</p>
                <div className="conNumber">
                  <p>10<sup>th</sup></p>
                  <p>Consultation</p>
                </div>
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
                  </div>
                </div>
                <button>View Profile</button>
              </div>
              {/* <div className="pinkLine pl"></div> */}
              <div className="pinkBox">
                <p>Focus Area</p>
                <b>Diabetes</b>
              </div>
              {/* <div className="pinkLine pl2"></div> */}
              <div className="pinkBox pb">
                <p>Linked Doctor</p>
                <b className='pink'>Dr. Rishabh</b>
              </div>
              <div className="pinkBox">
                <p>Recent Consultation Report</p>
                <button>Download</button>
              </div>
              {/* <div className="pinkLine pl2"></div> */}
              <div className="upCon">
                <p>Upcoming</p>
                <p>16/08/2024</p>
                <div className="conNumber">
                  <p>10<sup>th</sup></p>
                  <p>Consultation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Consultations