import React, { useRef, useState } from 'react'
import search from '../Images/search.png'
import backBtn from '../Images/back.png'
import profile from '../Images/profile.png'
import add from '../Images/add.png'
import '../css/consultations.css'
import '../css/doctors.css'
import triangle from "../Images/triangle.png";
import copy from '../Images/copy_green.png'

function Doctors() {
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
      <div className="dSpec">
        <div className="dsTop cdpnTop">
          <h1>Speciality</h1>
          <button>
              <img src={add} alt="add" />
              <p>Add Filter</p>
            </button>
        </div>
        <div className="dsSlide d2lc">
          <div className="ccm">
          <div className="sliderMain">
              <div className="sm">
                <div className="sliderBtns">
                  <button className="left" onClick={handleCcLeftSlide}>
                    <img src={backBtn} alt="triangle" />
                  </button>
                  <button className="right" onClick={handleCcRightSlide}>
                    <img src={backBtn} alt="triangle" />
                  </button>
                </div>
                <div className="sliderWindow">
                  <div
                    className="slider"
                    style={{
                      transform: `translateX(-${(ccIndex * 100) / 3}%)`,
                    }}
                  >
                    <div className="slide">
                      <p>Orthopaedic</p>
                      <p>Cardiology</p>
                      <p>Dermatology</p>
                      <p>Gastroenterology</p>
                      <p>Neurology</p>
                    </div>
                    <div className="slide">
                      <p>Orthopaedic</p>
                      <p>Orthopaedic</p>
                      <p>Orthopaedic</p>
                      <p>Orthopaedic</p>
                      <p>Orthopaedic</p>
                    </div>
                      <div className="slide">
                        <p>Orthopaedic</p>
                        <p>Orthopaedic</p>
                        <p>Orthopaedic</p>
                        <p>Orthopaedic</p>
                        <p>Orthopaedic</p>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          
        </div>
      </div>
        <div className="cdpNewOn allCon">
          <div className="cdpnTop">
            <div className="headFit">
              <h1>Doctors</h1>
              
            </div>
           
          </div>

          <div className="ind pink">
            <b>Invite New Doctor :</b>
            <button>
              <img src={copy} alt="copy" />
              <p>Copy Link</p>
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
                <p>Speciality(ies)</p>
                <div className="sps">
                <b>Orthopaedic</b>
                <b>Cardiology</b>
                </div>
                
              </div>
              {/* <div className="pinkLine pl2"></div> */}
              <div className="pinkBox pb">
                <p>Linked Patients</p>
                <button>View all</button>
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
                <p>Speciality(ies)</p>
                <div className="sps">
                <b>Orthopaedic</b>
                <b>Cardiology</b>
                </div>
                
              </div>
              {/* <div className="pinkLine pl2"></div> */}
              <div className="pinkBox pb">
                <p>Linked Patients</p>
                <button>View all</button>
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
                <p>Speciality(ies)</p>
                <div className="sps">
                <b>Orthopaedic</b>
                <b>Cardiology</b>
                </div>
                
              </div>
              {/* <div className="pinkLine pl2"></div> */}
              <div className="pinkBox pb">
                <p>Linked Patients</p>
                <button>View all</button>
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
                <p>Speciality(ies)</p>
                <div className="sps">
                <b>Orthopaedic</b>
                <b>Cardiology</b>
                </div>
                
              </div>
              {/* <div className="pinkLine pl2"></div> */}
              <div className="pinkBox pb">
                <p>Linked Patients</p>
                <button>View all</button>
              </div>
             
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Doctors