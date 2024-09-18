import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDatabase, ref, get, update, onValue } from "firebase/database";

function GoalSettings() {
  const { patientName } = useParams();
  const navigate = useNavigate();
  const db = getDatabase();

  // State for personal information
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [wUnit, setWUnit] = useState('Kg');
  const [height, setHeight] = useState('');
  const [hUnit, setHUnit] = useState('Cm');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [bmi, setBmi] = useState('');
  const [whr, setWhr] = useState('');
  const [idealWeightRange, setIdealWeightRange] = useState('');

  // State for goal settings
  const [healthGoal, setHealthGoal] = useState('');
  const [healthProblems, setHealthProblems] = useState([]);
  const [otherHealthProblems, setOtherHealthProblems] = useState('');
  const [cuisineOption, setCuisineOption] = useState('');
  const [foodAllergies, setFoodAllergies] = useState('');
  const [foodDislikes, setFoodDislikes] = useState('');
  const [dietType, setDietType] = useState('');
  const [editPersonalInfo, setEditPersonalInfo] = useState(false);
  const [editMode, setEditMode] = useState(true);

  // Calculate age based on birthdate
  const calAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    setAge(calculatedAge);
  };

  const calculateBmi = (weight, height) => {
    if (weight && height) {
      const heightInMeters = height / 100; // Convert height to meters
      const calculatedBmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(calculatedBmi);
    }
  };

  const savePersonalInfo = async () => {
    const personalInfoRef = ref(db, `patients/${patientName}`);
    const updatedPersonalInfo = {
      full_name: name,
      birthdate,
      age,
      gender,
      weight,
      height,
      state,
      city,
      bmi,
    };

    try {
      await update(personalInfoRef, updatedPersonalInfo);
      setEditPersonalInfo(false); // Exit edit mode after saving
    } catch (error) {
      console.error('Error saving personal info:', error);
    }
  };

  // Handle saving data to Firebase
  const saveData = async () => {
    const patientRef = ref(db, `patients/${patientName}/goal_settings`);
    const updatedData = {
      current_health_goal: healthGoal,
      health_problems: healthProblems,
      other_specify: otherHealthProblems,
      cuisine_option: cuisineOption,
      food_allergies: foodAllergies,
      food_dislikes: foodDislikes,
      diet_type: dietType,
    };
    try {
      await update(patientRef, updatedData);
      alert('Data saved successfully!');
      setEditPersonalInfo(false);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  
  // Load data from Firebase
  useEffect(() => {
    const patientRef = ref(db, `patients/${patientName}/goal_settings`);
    onValue(patientRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setHealthGoal(data.current_health_goal || '');
        setHealthProblems(data.health_problems || []);
        setOtherHealthProblems(data.other_specify || '');
        setCuisineOption(data.cuisine_option || '');
        setFoodAllergies(data.food_allergies || '');
        setFoodDislikes(data.food_dislikes || '');
        setDietType(data.diet_type || '');
      
      }
    });

    const calculateIdealWeightRange = (age, gender) => {
      let minWeight, maxWeight;
  
      if (age < 18) {
        minWeight = 40; // Example values, adjust as needed
        maxWeight = 70;
      } else if (age < 30) {
        minWeight = 50;
        maxWeight = 80;
      } else if (age < 50) {
        minWeight = 55;
        maxWeight = 85;
      } else {
        minWeight = 60;
        maxWeight = 90;
      }
  
      if (gender === 'Female (F)') {
        minWeight -= 5;
        maxWeight -= 5;
      }
  
      setIdealWeightRange(`${minWeight} kg - ${maxWeight} kg`);
    };

    // Load personal info from Firebase
    const personalInfoRef = ref(db, `patients/${patientName}`);
    onValue(personalInfoRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setName(data.full_name || '');
        setBirthdate(data.birthdate || '');
        setGender(data.gender || '');
        setWeight(data.weight || '');
        setHeight(data.height || '');
        setState(data.state || '');
        setCity(data.city || '');
        setAge(data.age || '');
        calculateBmi(data.weight || '', data.height || ''); // Fetch BMI
        setWhr(data.WHR || ''); // Fetch WHR
        calculateIdealWeightRange(data.age || '', data.gender || ''); 
      }
    });
  }, [patientName, db]);

  const handleBirthdateChange = (e) => {
    const newBirthdate = e.target.value;
    setBirthdate(newBirthdate);
    calAge(newBirthdate);
  };

  return (
    <div className="gsMain">
      <div className="ccm goalSet">
      <div className="gs">
        <div className="ccmTop">
          <h1>Personal Info</h1>
        </div>
        <div
          className="slide"
          style={{ border: editPersonalInfo ? "" : "1px solid #F23D76" }}
        >
          <button
            onClick={() => {
              if (editPersonalInfo) {
                savePersonalInfo();
              } else {
                setEditPersonalInfo(true);
              }
            }}
            style={{
              backgroundColor: editPersonalInfo ? "transparent" : "#F23D76",
              color: editPersonalInfo ? "#F23D76" : "#FFFFFF",
            }}
          >
            {editPersonalInfo ? "Save" : "Edit"}
          </button>
          <div className="slideCont">
            <p>
              Name:
              {editPersonalInfo ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                <b>{name}</b>
              )}
            </p>
            <p>
              {editPersonalInfo ? "Birthdate:" : "Age:"}
              {editPersonalInfo ? (
                <input
                  type="date"
                  value={birthdate}
                  onChange={(e) => {
                    setBirthdate(e.target.value);
                    calAge(e.target.value);
                  }}
                />
              ) : (
                <b>{age}</b>
              )}
            </p>
            <p>
              Gender:
              {editPersonalInfo ? (
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="Male (M)">Male (M)</option>
                  <option value="Female (F)">Female (F)</option>
                  <option value="Other (O)">Other (O)</option>
                </select>
              ) : (
                <b>{gender}</b>
              )}
            </p>
          </div>
          <div className="slideCont">
            <p>
              State:
              {editPersonalInfo ? (
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                </select>
              ) : (
                <b>{state}</b>
              )}
            </p>
            <p>
              City:
              {editPersonalInfo ? (
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Chennai">Chennai</option>
                </select>
              ) : (
                <b>{city}</b>
              )}
            </p>
          </div>
          <div className="slideCont">
            <p>
              Weight:
              {editPersonalInfo ? (
                <div>
                  <label>
                    <input
                      type="number"
                      name="weight"
                      value="Lbs"
                      onChange={(e) => setWUnit(e.target.value)}
                    />{" "}
                    Lbs
                  </label>
                  <label>
                    <input
                      type="number"
                      name="weightUnit"
                      value="Kg"
                      defaultChecked
                      onChange={(e) => setWUnit(e.target.value)}
                    />{" "}
                    Kg
                  </label>
                  <input
                    type="numberUnit"
                    value={weight}
                    onChange={(e) => { setWeight(e.target.value); calculateBmi(height, e.target.value);}}
                  />
                </div>
              ) : (
                <b>{weight + wUnit}</b>
              )}
            </p>
            <p>
              Height:
              {editPersonalInfo ? (
                <div>
                  <label>
                    <input
                      type="number"
                      name="heightUnit"
                      value="Ft/In"
                      onChange={(e) => setHUnit(e.target.value)}
                    />{" "}
                    Ft/In
                  </label>
                  <label>
                    <input
                      type="number"
                      name="heightUnit"
                      value="Cm"
                      defaultChecked
                      onChange={(e) => setHUnit(e.target.value)}
                    />{" "}
                    Cm
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => { setHeight(e.target.value); calculateBmi(weight, e.target.value);}}
                  />
                </div>
              ) : (
                <b>{height + hUnit}</b>
              )}
            </p>
          </div>
          <div className="slideCont">
            <p>
              BMI: <b className="bmi">{bmi}</b>
            </p>
            <p>
              WHR: <b className="bmi">{whr}</b>
            </p>
            <p>
              Ideal Weight Range: <b className="iwr">{idealWeightRange}</b>
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Health Goal Section */}
    <div className="ccm goalSet">
        <div className="gs">
          <div className="ccmTop">
            <h1>Health Goal</h1>
          </div>
          <div className="slide" style={{ border: editMode ? '' : '1px solid #F23D76' }}>
            <button
              onClick={() => {
                if (!editMode) saveData();
                setEditMode(!editMode);
              }}
              style={{ backgroundColor: editMode ? 'transparent' : '#F23D76', color: editMode ? '#F23D76' : '#FFFFFF' }}
            >
              {editMode ? 'Edit' : 'Save'}
            </button>
            <div className="slideCont">
              <p>What is your Current Health Goal?</p>
              {editMode ? (
                <b>{healthGoal}</b>
              ) : (
                <input
                  type="text"
                  value={healthGoal}
                  onChange={(e) => setHealthGoal(e.target.value)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Health Problems Section */}
      <div className="ccm goalSet">
        <div className="gs">
          <div className="ccmTop">
            <h1>Health Problems</h1>
          </div>
          <div className="slide" style={{ border: editMode ? '' : '1px solid #F23D76' }}>
            <button
              onClick={() => {
                if (!editMode) saveData();
                setEditMode(!editMode);
              }}
              style={{ backgroundColor: editMode ? 'transparent' : '#F23D76', color: editMode ? '#F23D76' : '#FFFFFF' }}
            >
              {editMode ? 'Edit' : 'Save'}
            </button>
            <div className="slideCont">
              <p>Select your health problems:</p>
              {editMode ? (
                <div>
                  {healthProblems.join(', ')}
                  {otherHealthProblems && <div>Other: {otherHealthProblems}</div>}
                </div>
              ) : (
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Diabetes"
                      checked={healthProblems.includes("Diabetes")}
                      onChange={() => setHealthProblems(prev => prev.includes("Diabetes") ? prev.filter(hp => hp !== "Diabetes") : [...prev, "Diabetes"])}
                    />
                    Diabetes
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Hypertension"
                      checked={healthProblems.includes("Hypertension")}
                      onChange={() => setHealthProblems(prev => prev.includes("Hypertension") ? prev.filter(hp => hp !== "Hypertension") : [...prev, "Hypertension"])}
                    />
                    Hypertension
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Cholesterol"
                      checked={healthProblems.includes("Cholesterol")}
                      onChange={() => setHealthProblems(prev => prev.includes("Cholesterol") ? prev.filter(hp => hp !== "Cholesterol") : [...prev, "Cholesterol"])}
                    />
                    Cholesterol
                  </label>
                  <textarea
                    value={otherHealthProblems}
                    onChange={(e) => setOtherHealthProblems(e.target.value)}
                    placeholder="Specify other health problems"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cuisine Preferences Section */}
      <div className="ccm goalSet">
        <div className="gs">
          <div className="ccmTop">
            <h1>Cuisine Preferences</h1>
          </div>
          <div className="slide" style={{ border: editMode ? '' : '1px solid #F23D76' }}>
            <button
              onClick={() => {
                if (!editMode) saveData();
                setEditMode(!editMode);
              }}
              style={{ backgroundColor: editMode ? 'transparent' : '#F23D76', color: editMode ? '#F23D76' : '#FFFFFF' }}
            >
              {editMode ? 'Edit' : 'Save'}
            </button>
            <div className="slideCont">
              <p>Preferred Cuisine:</p>
              {editMode ? (
                <b>{cuisineOption}</b>
              ) : (
                <select
                  value={cuisineOption}
                  onChange={(e) => setCuisineOption(e.target.value)}
                >
                  <option value="Maharashtrian">Maharashtrian</option>
                  <option value="Gujarati">Gujarati</option>
                  <option value="Kerela">Kerela</option>
                  <option value="Punjabi">Punjabi</option>
                  <option value="Bengali">Bengali</option>
                </select>
              )}
              <p>Food Allergies:</p>
              {editMode ? (
                <b>{foodAllergies}</b>
              ) : (
                <textarea
                  value={foodAllergies}
                  onChange={(e) => setFoodAllergies(e.target.value)}
                  placeholder="List any food allergies"
                />
              )}
              <p>Food Dislikes:</p>
              {editMode ? (
                                <b>{foodDislikes}</b>
                              ) : (
                                <textarea
                                  value={foodDislikes}
                                  onChange={(e) => setFoodDislikes(e.target.value)}
                                  placeholder="List any food dislikes"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                
                      {/* Diet Type Section */}
                      <div className="ccm goalSet">
                        <div className="gs">
                          <div className="ccmTop">
                            <h1>Diet Type</h1>
                          </div>
                          <div className="slide" style={{ border: editMode ? '' : '1px solid #F23D76' }}>
                            <button
                              onClick={() => {
                                if (!editMode) saveData();
                                setEditMode(!editMode);
                              }}
                              style={{ backgroundColor: editMode ? 'transparent' : '#F23D76', color: editMode ? '#F23D76' : '#FFFFFF' }}
                            >
                              {editMode ? 'Edit' : 'Save'}
                            </button>
                            <div className="slideCont">
                              <p>Diet Type:</p>
                              {editMode ? (
                                <b>{dietType}</b>
                              ) : (
                                <select
                                  value={dietType}
                                  onChange={(e) => setDietType(e.target.value)}
                                >
                                  <option value="Veg">Veg</option>
                                  <option value="Non-Veg">Non-Veg</option>
                                  <option value="Eggetarian">Eggetarian</option>
                                </select>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                export default GoalSettings;
