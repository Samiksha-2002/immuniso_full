import React, { useState } from "react";
import triangle from "../Images/triangle.png";
import bloodPressure from "../Images/bloodPressure.png";
import bloodSugar from "../Images/bloodSugar.png";
import kidneyTests from "../Images/kidneyTests.png";
import liverTests from "../Images/liverTests.png";
import lipidProf from "../Images/lipidProf.png";
import bloodCount from "../Images/bloodCount.png";
import bodyTemp from "../Images/bodyTemp.png";
import heartRate from "../Images/heartRate.png";
import respRate from "../Images/respRate.png";
import oxSat from "../Images/oxSat.png";

function FollowUp() {
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
    <div className="d2lCont">
      <div className="myNotes">
        <h1>My Notes</h1>
        <div className="noteScroll">
          <div className="noteHead">
            <p>Today</p>
            <div className="line"></div>
          </div>

          <textarea placeholder="Start Typing..." className="txt"></textarea>
          <div className="mnBtns">
            <button>Clear</button>
            <button>Save</button>
          </div>
          <div className="prevNotes">
            <div className="prvn">
              <div className="noteHead">
                <p>22 July 2024</p>
                <p>06:36 pm</p>
                <div className="line2"></div>
              </div>
              <p placeholder="Start Typing..." className="prevDesc">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Cupiditate, dolor quibusdam neque veniam officia natus
                reiciendis nemo fugiat mollitia, eveniet, minus suscipit minima
                iusto earum iste quam recusandae laudantium! Eius.
              </p>
            </div>
            <div className="prvn">
              <div className="noteHead">
                <p>23 July 2024</p>
                <p>06:36 pm</p>
                <div className="line2"></div>
              </div>
              <p placeholder="Start Typing..." className="prevDesc">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Cupiditate, dolor quibusdam neque veniam officia natus
                reiciendis nemo fugiat mollitia, eveniet, minus suscipit minima
                iusto earum iste quam recusandae laudantium! Eius.
              </p>
            </div>
            <div className="prvn">
              <div className="noteHead">
                <p>24 July 2024</p>
                <p>06:36 pm</p>
                <div className="line2"></div>
              </div>
              <p placeholder="Start Typing..." className="prevDesc">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Cupiditate, dolor quibusdam neque veniam officia natus
                reiciendis nemo fugiat mollitia, eveniet, minus suscipit minima
                iusto earum iste quam recusandae laudantium! Eius.
              </p>
            </div>
            <div className="prvn">
              <div className="noteHead">
                <p>25 July 2024</p>
                <p>06:36 pm</p>
                <div className="line2"></div>
              </div>
              <p placeholder="Start Typing..." className="prevDesc">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Cupiditate, dolor quibusdam neque veniam officia natus
                reiciendis nemo fugiat mollitia, eveniet, minus suscipit minima
                iusto earum iste quam recusandae laudantium! Eius.
              </p>
            </div>
            <div className="prvn">
              <div className="noteHead">
                <p>26 July 2024</p>
                <p>06:36 pm</p>
                <div className="line2"></div>
              </div>
              <p placeholder="Start Typing..." className="prevDesc">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Cupiditate, dolor quibusdam neque veniam officia natus
                reiciendis nemo fugiat mollitia, eveniet, minus suscipit minima
                iusto earum iste quam recusandae laudantium! Eius.
              </p>
            </div>
            <div className="prvn">
              <div className="noteHead">
                <p>27 July 2024</p>
                <p>06:36 pm</p>
                <div className="line2"></div>
              </div>
              <p placeholder="Start Typing..." className="prevDesc">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Cupiditate, dolor quibusdam neque veniam officia natus
                reiciendis nemo fugiat mollitia, eveniet, minus suscipit minima
                iusto earum iste quam recusandae laudantium! Eius.
              </p>
            </div>
            <div className="prvn">
              <div className="noteHead">
                <p>28 July 2024</p>
                <p>06:36 pm</p>
                <div className="line2"></div>
              </div>
              <p placeholder="Start Typing..." className="prevDesc">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Cupiditate, dolor quibusdam neque veniam officia natus
                reiciendis nemo fugiat mollitia, eveniet, minus suscipit minima
                iusto earum iste quam recusandae laudantium! Eius.
              </p>
            </div>
            <div className="noteBottom"></div>
          </div>
        </div>
        
      </div>
      <div className="d2lc">
        <div className="ccmMain">
          <div className="ccm">
            <div className="ccmTop">
              <h1>Chief Complaints</h1>
              <div className="udb">
                <p>Last Updated : </p>
                <p>30 July 2024</p>
                <button>+ Add New</button>
              </div>
            </div>
            <div className="sliderMain">
              <div className="sm">
                <div className="sliderBtns">
                  <button className="left" onClick={handleCcLeftSlide}>
                    <img src={triangle} alt="triangle" />
                  </button>
                  <button className="right" onClick={handleCcRightSlide}>
                    <img src={triangle} alt="triangle" />
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
                      <button>Edit</button>
                      <div className="slideCont">
                        <p>
                          Chief Complaint: <b>A015.7 Tuberculosis</b>
                        </p>
                      </div>
                      <div className="slideCont">
                        <p>
                          Ongoing: <b>Yes</b>
                        </p>
                        <p>
                          On Medication: <b>Yes</b>
                        </p>
                        <p>
                          Well Managed: <b>no</b>
                        </p>
                      </div>
                      <div className="slideCont">
                        <p>
                          Since When: <b>13/4/2017</b>
                        </p>
                        <p>
                          Duratoin: <b>7 years 3 months 23 days</b>
                        </p>
                      </div>
                      <div className="slideCont">
                        <p>
                          Description:{" "}
                          <i>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Culpa tempora officia magni quod praesentium
                            quas doloribus animi, aspernatur dignissimos cumque.
                          </i>
                        </p>
                      </div>
                    </div>
                    <div className="slide">
                      <button>Edit</button>
                      <div className="slideCont">
                        <p>
                          Chief Complaint: <b>A015.7 Tuberculosis</b>
                        </p>
                      </div>
                      <div className="slideCont">
                        <p>
                          Ongoing: <b>Yes</b>
                        </p>
                        <p>
                          On Medication: <b>Yes</b>
                        </p>
                        <p>
                          Well Managed: <b>no</b>
                        </p>
                      </div>
                      <div className="slideCont">
                        <p>
                          Since When: <b>13/4/2017</b>
                        </p>
                        <p>
                          Duratoin: <b>7 years 3 months 23 days</b>
                        </p>
                      </div>
                      <div className="slideCont">
                        <p>
                          Description:{" "}
                          <i>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Culpa tempora officia magni quod praesentium
                            quas doloribus animi, aspernatur dignissimos cumque.
                          </i>
                        </p>
                      </div>
                    </div>
                    <div className="slide">
                      <button>Edit</button>
                      <div className="slideCont">
                        <p>
                          Chief Complaint: <b>A015.7 Tuberculosis</b>
                        </p>
                      </div>
                      <div className="slideCont">
                        <p>
                          Ongoing: <b>Yes</b>
                        </p>
                        <p>
                          On Medication: <b>Yes</b>
                        </p>
                        <p>
                          Well Managed: <b>no</b>
                        </p>
                      </div>
                      <div className="slideCont">
                        <p>
                          Since When: <b>13/4/2017</b>
                        </p>
                        <p>
                          Duratoin: <b>7 years 3 months 23 days</b>
                        </p>
                      </div>
                      <div className="slideCont">
                        <p>
                          Description:{" "}
                          <i>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Culpa tempora officia magni quod praesentium
                            quas doloribus animi, aspernatur dignissimos cumque.
                          </i>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="smBtns">
                <div
                  className={ccIndex == 0 ? "smb smbc" : "smb"}
                  onClick={() => setCcIndex(0)}
                ></div>
                <div
                  className={ccIndex == 1 ? "smb smbc" : "smb"}
                  onClick={() => setCcIndex(1)}
                ></div>
                <div
                  className={ccIndex == 2 ? "smb smbc" : "smb"}
                  onClick={() => setCcIndex(2)}
                ></div>
              </div>
            </div>
            <p className="pages">{ccIndex + 1} of 3</p>
          </div>
          <div className="ccm">
            <div className="ccmTop">
              <h1>Medications</h1>
              <div className="udb">
                <p>Last Updated : </p>
                <p>30 July 2024</p>
                <button>+ Add New</button>
              </div>
            </div>
            <div className="sliderMain">
              <div className="sm">
                <div className="sliderBtns">
                  <button className="left" onClick={handleMedLeftSlide}>
                    <img src={triangle} alt="triangle" />
                  </button>
                  <button className="right" onClick={handleMedRightSlide}>
                    <img src={triangle} alt="triangle" />
                  </button>
                </div>
                <div className="sliderWindow">
                  <div
                    className="slider"
                    style={{
                      transform: `translateX(-${(medIndex * 100) / 3}%)`,
                    }}
                  >
                    <div className="slide">
                      <button>Edit</button>
                      <div className="slideCont">
                        <p>
                          Drug Name: <b>Adilip</b>
                        </p>
                        <p>
                          Drug Strength: <b>75</b>
                        </p>
                      </div>
                      <div className="slideCont">
                        <p>
                          Drug Frequency: <b>1/2 - 0 - 1</b>
                        </p>
                      </div>
                      <div className="slideCont">
                        <p>
                          From date: <b>20/7/2024</b>
                        </p>
                        <p>
                          Till date: <b>20/8/2024</b>
                        </p>
                        <p>
                          Duration: <b>0 years 1 months 1 days</b>
                        </p>
                      </div>
                      <div className="slideCont">
                        <p>
                          Description:{" "}
                          <i>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Culpa tempora officia magni quod praesentium
                            quas doloribus animi, aspernatur dignissimos cumque.
                          </i>
                        </p>
                      </div>
                    </div>
                    <div className="slide">
                      <button>Edit</button>
                      <div className="slideCont">
                        <p>
                          Drug Name: <b>Adilip</b>
                        </p>
                        <p>
                          Drug Strength: <b>75</b>
                        </p>
                      </div>
                      <div className="slideCont">
                        <p>
                          Drug Frequency: <b>1/2 - 0 - 1</b>
                        </p>
                      </div>
                      <div className="slideCont">
                        <p>
                          From date: <b>20/7/2024</b>
                        </p>
                        <p>
                          Till date: <b>20/8/2024</b>
                        </p>
                        <p>
                          Duration: <b>0 years 1 months 1 days</b>
                        </p>
                      </div>
                      <div className="slideCont">
                        <p>
                          Description:{" "}
                          <i>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Culpa tempora officia magni quod praesentium
                            quas doloribus animi, aspernatur dignissimos cumque.
                          </i>
                        </p>
                      </div>
                    </div>
                    <div className="slide">
                      <button>Edit</button>
                      <div className="slideCont">
                        <p>
                          Drug Name: <b>Adilip</b>
                        </p>
                        <p>
                          Drug Strength: <b>75</b>
                        </p>
                      </div>
                      <div className="slideCont">
                        <p>
                          Drug Frequency: <b>1/2 - 0 - 1</b>
                        </p>
                      </div>
                      <div className="slideCont">
                        <p>
                          From date: <b>20/7/2024</b>
                        </p>
                        <p>
                          Till date: <b>20/8/2024</b>
                        </p>
                        <p>
                          Duration: <b>0 years 1 months 1 days</b>
                        </p>
                      </div>
                      <div className="slideCont">
                        <p>
                          Description:{" "}
                          <i>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Culpa tempora officia magni quod praesentium
                            quas doloribus animi, aspernatur dignissimos cumque.
                          </i>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="smBtns">
                <div
                  className={medIndex == 0 ? "smb smbc" : "smb"}
                  onClick={() => setMedIndex(0)}
                ></div>
                <div
                  className={medIndex == 1 ? "smb smbc" : "smb"}
                  onClick={() => setMedIndex(1)}
                ></div>
                <div
                  className={medIndex == 2 ? "smb smbc" : "smb"}
                  onClick={() => setMedIndex(2)}
                ></div>
              </div>
            </div>
            <p className="pages">{medIndex + 1} of 3</p>
          </div>
        </div>
        <div className="vitals ccm">
          <div className="ccmTop">
            <h1>Vitals</h1>
            <div className="udb">
              <p>Last Updated : </p>
              <p>30 July 2024</p>
            </div>
          </div>
          <div className="allVits">
            <div className="slide vit">
              <button>Edit</button>
              <img src={bloodPressure} alt="bloodPressure" />
              <div className="vitDesc">
                <p>
                  <b>Blood Pressure: </b>Normal
                </p>
                <p>
                  Systolic:{" "}
                  <span>
                    <b>90-120 </b>mmHg
                  </span>
                </p>
                <p>
                  Diastolic:{" "}
                  <span>
                    <b>60-80 </b>mmHg
                  </span>
                </p>
              </div>
            </div>

            <div className="slide vit">
              <button>Edit</button>
              <img src={bloodSugar} alt="bloodSugar" />
              <div className="vitDesc">
                <p>
                  <b>Blood Sugar: </b>Normal
                </p>
                <p>
                  Fasting Blood Glucose:{" "}
                  <span>
                    <b>70-99 </b>mg/dL
                  </span>
                </p>
                <p>
                  Postprandial Blood Glucose:{" "}
                  <span>
                    <b>&lt;140 </b>mg/dL after two hours
                  </span>
                </p>
                <p>
                  Hemoglobin A1c:{" "}
                  <span>
                    <b>5.6 </b>%
                  </span>
                </p>
              </div>
            </div>

            <div className="slide vit">
              <button>Edit</button>
              <img src={kidneyTests} alt="kidneyTests" />
              <div className="vitDesc">
                <p>
                  <b>Kidney Function Tests: </b>Normal
                </p>
                <p>
                  Serum Creatinine:{" "}
                  <span>
                    <b>0.6-1.2 </b>mg/dL
                  </span>
                </p>
                <p>
                  Blood Urea Nitrogen:{" "}
                  <span>
                    <b>8-20 </b>mg/dL
                  </span>
                </p>
                <p>
                  Estimated GFR:{" "}
                  <span>
                    <b>&gt;90 </b>mL/min/1.73 m²
                  </span>
                </p>
                <p>
                  Electrolytes:{" "}
                  <span>
                    <b>Sodium: 135-145 </b>mmol/L
                  </span>
                </p>
                <p>
                  Electrolytes:{" "}
                  <span>
                    <b>Potassium: 3.5-5.0 </b>mmol/L
                  </span>
                </p>
              </div>
            </div>

            <div className="slide vit">
              <button>Edit</button>
              <img src={liverTests} alt="liverTests" />
              <div className="vitDesc">
                <p>
                  <b>Liver Function Tests: </b>Normal
                </p>
                <p>
                  Alanine Aminotransferase:{" "}
                  <span>
                    <b>7-56 </b>U/L
                  </span>
                </p>
                <p>
                  Aspartate Aminotransferase:{" "}
                  <span>
                    <b>10-40 </b>U/L
                  </span>
                </p>
                <p>
                  Alkaline Phosphatase:{" "}
                  <span>
                    <b>44-147 </b>U/L
                  </span>
                </p>
                <p>
                  Total Bilirubin:{" "}
                  <span>
                    <b>0.1-1.2 </b>mg/dL
                  </span>
                </p>
                <p>
                  Albumin:{" "}
                  <span>
                    <b>3.5-5.0 </b>g/dL
                  </span>
                </p>
                <p>
                  Total Protein:{" "}
                  <span>
                    <b>6.3-7.9 </b>g/dL
                  </span>
                </p>
              </div>
            </div>

            <div className="slide vit">
              <button>Edit</button>
              <img src={lipidProf} alt="lipidProfile" />
              <div className="vitDesc">
                <p>
                  <b>Lipid Profile: </b>Normal
                </p>
                <p>
                  Total Cholesterol:{" "}
                  <span>
                    <b>&lt;200 </b>mg/dL
                  </span>
                </p>
                <p>
                  LDL Cholesterol:{" "}
                  <span>
                    <b>&lt;100 </b>mg/dL
                  </span>
                </p>
                <p>
                  HDL Cholesterol:{" "}
                  <span>
                    <b>&gt;40 </b>mg/dL (Men) &gt;50 mg/dL (Women)
                  </span>
                </p>
                <p>
                  Triglycerides:{" "}
                  <span>
                    <b>&lt;150 </b>mg/dL
                  </span>
                </p>
              </div>
            </div>

            <div className="slide vit">
              <button>Edit</button>
              <img src={bloodCount} alt="cbc" />
              <div className="vitDesc">
                <p>
                  <b>Complete Blood Count (CBC): </b>Normal
                </p>
                <p>
                  White Blood Cells:{" "}
                  <span>
                    <b>4.0-11.0 </b>×10³/µL
                  </span>
                </p>
                <p>
                  Red Blood Cells:{" "}
                  <span>
                    <b>4.2-5.4 </b>million cells/µL (Women) 4.7-6.1 million
                    cells/µL (Men)
                  </span>
                </p>
                <p>
                  Hemoglobin:{" "}
                  <span>
                    <b>12.0-15.5 </b>g/dL (Women) 13.5-17.5 g/dL (Men)
                  </span>
                </p>
                <p>
                  Hematocrit:{" "}
                  <span>
                    <b>37-47% </b>(Women) 40-54% (Men)
                  </span>
                </p>
                <p>
                  Platelet Count:{" "}
                  <span>
                    <b>150-450 </b>×10³/µL
                  </span>
                </p>
                <p>
                  Mean Corpuscular Volume:{" "}
                  <span>
                    <b>80-96 </b>fL
                  </span>
                </p>
                <p>
                  Mean Corpuscular Hemoglobin Concentration:{" "}
                  <span>
                    <b>32-36 </b>g/dL
                  </span>
                </p>
              </div>
            </div>

            <div className="slide vit">
              <button>Edit</button>
              <img src={bodyTemp} alt="bodyTemperature" />
              <div className="vitDesc">
                <p>
                  <b>Body Temperature: </b>Normal
                </p>
                <p>
                  Body Temperature:{" "}
                  <span>
                    <b>36.1-37.2 </b>°C
                  </span>
                </p>
              </div>
            </div>

            <div className="slide vit">
              <button>Edit</button>
              <img src={heartRate} alt="heartRate" />
              <div className="vitDesc">
                <p>
                  <b>Heart Rate (Pulse): </b>Normal
                </p>
                <p>
                  Heart Rate:{" "}
                  <span>
                    <b>60-100 </b>bpm
                  </span>
                </p>
              </div>
            </div>

            <div className="slide vit">
              <button>Edit</button>
              <img src={respRate} alt="respiratoryRate" />
              <div className="vitDesc">
                <p>
                  <b>Respiratory Rate: </b>Normal
                </p>
                <p>
                  Respiratory Rate:{" "}
                  <span>
                    <b>12-20 </b>breaths per minute
                  </span>
                </p>
              </div>
            </div>

            <div className="slide vit">
              <button>Edit</button>
              <img src={oxSat} alt="oxygenSaturation" />
              <div className="vitDesc">
                <p>
                  <b>Oxygen Saturation (SpO2): </b>Normal
                </p>
                <p>
                  Oxygen Saturation:{" "}
                  <span>
                    <b>95-100% </b>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FollowUp;
