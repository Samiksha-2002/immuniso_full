import React, { useEffect, useState } from "react";
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
import addPink from "../Images/addPink.png";
import add from '../Images/addPink.png'
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { getDatabase, ref, get, update, onValue } from "firebase/database";
import { push, remove, set } from 'firebase/database';
import { format } from "date-fns";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 

function DetailedAssessment() {
  const { patientName } = useParams();
  const navigate = useNavigate();
  const db = getDatabase();
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [sw, setSw] = useState("");
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [relation, setRelation] = useState('');
  const [surgery, setSurgery] = useState('');
  const [wid, setWid] = useState("");
  const [wUnit, setWUnit] = useState("Kg");
  const [height, setHeight] = useState('');
  const [hUnit, setHUnit] = useState("Cm");
  const [edit, setEdit] = useState(true);
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [edit2, setEdit2] = useState(true);
  const [edit3, setEdit3] = useState(true);
  const [edit4, setEdit4] = useState(true);
  const [edit5, setEdit5] = useState(true);
  const [editPersonalInfo, setEditPersonalInfo] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [bmi, setBmi] = useState('');
  const [whr, setWhr] = useState('');
  const [idealWeightRange, setIdealWeightRange] = useState('');
  const [email, setemail] = useState('');
  const [contact, setContact] = useState(""); // State for WA phone number
  const [alternatePhone, setAlternatePhone] = useState(""); // State for alternate phone number
  const [address, setAddress] = useState(""); // State for address
  const [vitalsData, setVitalsData] = useState({});
  const [chiefComplaints, setChiefComplaints] = useState({});
  const [newComplaint, setNewComplaint] = useState({});
  const [editComplaint, setEditComplaint] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [showFormMed, setShowFormMed] = useState(false);
  const [editComplaintId, setEditComplaintId] = useState(null);
  const [lastUpdatedDate, setLastUpdatedDate] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [medications, setMedications] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMed, setCurrentMed] = useState(null);
  const [medIndex, setMedIndex] = useState(0);
  const [fhIndex, setFhIndex] = useState(0);
  const [shIndex, setShIndex] = useState(0);
  const [familyHistory, setFamilyHistory] = useState([]);
  const [description, setDescription] = useState("");
  const [showFormFamilyHistory, setShowFormFamilyHistory] = useState(false);
  const [surgicalHistory, setSurgicalHistory] = useState([]);
  const [currentRecord, setCurrentRecord] = useState({ surgery: '', when: '', description: '' });
  

  const calAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      calculatedAge--;
    }
    setAge(calculatedAge);
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
      contact,
      alternate_phone: alternatePhone,
      email,
      address,
      bmi,
    };

    try {
      await update(personalInfoRef, updatedPersonalInfo);
      alert('Personal Information saved successfully!');
      setEditPersonalInfo(false); // Exit edit mode after saving
    } catch (error) {
      console.error('Error saving personal info:', error);
    }
  };

  const calculateBmi = (weight, height) => {
    if (weight && height) {
      const heightInMeters = height / 100; // Convert height to meters
      const calculatedBmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(calculatedBmi);
    }
  };

  

  useEffect(() => {
    const db = getDatabase();
  
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
    const handlePersonalInfo = (snapshot) => {
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
        setemail(data.email || '');
        setContact(data.contact || '');
        setAlternatePhone(data.alternate_phone || '');
        setAddress(data.address || '');
      }
    };
    onValue(personalInfoRef, handlePersonalInfo);
  
    // Load medications
    const medRef = ref(db, `medications/patients/${patientName}/medications`);
    const handleMedications = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMedications(Object.entries(data)); // Store medication data as an array of [key, value]
      }
    };
    onValue(medRef, handleMedications);

    const familyHistoryRef = ref(db, `family_relations/patients/${patientName}/family_history`);
    onValue(familyHistoryRef, (snapshot) => {
      const data = snapshot.val() ? Object.values(snapshot.val()) : [];
      setFamilyHistory(data);
      if (data.length > 0) {
        const { relation, diagnosis, since_when, description } = data[0];
        setRelation(relation);
        setDiagnosis(diagnosis);
        setSw(since_when);
        setDescription(description);
      }
    });
  
    // Load chief complaints
    const complaintsRef = ref(db, `chief_complaints/${patientName}`);
    const handleComplaints = (snapshot) => {
      if (snapshot.exists()) {
        setChiefComplaints(snapshot.val());
      }
    };
    onValue(complaintsRef, handleComplaints);
  
    // Load vitals data
    const vitalsRef = ref(db, 'patients/patientID/vitals');
    const handleVitals = (snapshot) => {
      if (snapshot.exists()) {
        setVitalsData(snapshot.val());
      } else {
        console.log("No data available");
      }
    };
    const unsubscribe = onValue(vitalsRef, handleVitals);
    return () => unsubscribe();
  
  }, [patientName]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = db.database().ref(`surgical_history/patients/${patientName}/surgical_history`);
        dbRef.on('value', (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setSurgicalHistory(data);
            setCurrentRecord(data[shIndex] || { surgery: '', when: '', description: '' });
          }
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [patientName, shIndex]);

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
  const handleFhLeftSlide = () => {
    if (fhIndex > 0) {
      setFhIndex(fhIndex - 1);
      updateFields(fhIndex - 1);
    }
  };
  const handleFhRightSlide = () => {
    if (fhIndex < familyHistory.length - 1) {
      setFhIndex(fhIndex + 1);
      updateFields(fhIndex + 1);
    }
  };
  const handleShLeftSlide = () => {
    if (shIndex > 0) {
      setShIndex(shIndex - 1);
    }
  };

  const handleShRightSlide = () => {
    if (shIndex < surgicalHistory.length - 1) {
      setShIndex(shIndex + 1);
    }
  };
  const [hg, setHg] = useState("PCOD Management");

  const handleInputChange = (e, field) => {
    setVitalsData((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  const [healthProblems, setHealthProblems] = useState([]);
  const handleHp = (value) => {
    setHealthProblems((prev) =>
      prev.includes(value)
        ? prev.filter((hp) => hp !== value)
        : [...prev, value]
    );
  };
  const [healthProblems2, setHealthProblems2] = useState([]);
  const handleHp2 = (value) => {
    setHealthProblems2((prev) =>
      prev.includes(value)
        ? prev.filter((hp) => hp !== value)
        : [...prev, value]
    );
  };
  const [healthProblems3, setHealthProblems3] = useState([]);
  const handleHp3 = (value) => {
    setHealthProblems3((prev) =>
      prev.includes(value)
        ? prev.filter((hp) => hp !== value)
        : [...prev, value]
    );
  };
  const [healthProblems4, setHealthProblems4] = useState([]);
  const handleHp4 = (value) => {
    setHealthProblems4((prev) =>
      prev.includes(value)
        ? prev.filter((hp) => hp !== value)
        : [...prev, value]
    );
  };
  const [healthProblems5, setHealthProblems5] = useState([]);
  const handleHp5 = (value) => {
    setHealthProblems5((prev) =>
      prev.includes(value)
        ? prev.filter((hp) => hp !== value)
        : [...prev, value]
    );
  };

  const [healthProblems6, setHealthProblems6] = useState([]);
  const handleHp6 = (value) => {
    setHealthProblems6((prev) =>
      prev.includes(value)
        ? prev.filter((hp) => hp !== value)
        : [...prev, value]
    );
  };

  const handleBirthdateChange = (e) => {
    const newBirthdate = e.target.value;
    setBirthdate(newBirthdate);
    calAge(newBirthdate);
  };

  //chief complaints

  const handleEdit = (complaintId) => {
    const complaint = chiefComplaints[complaintId];
    setEditComplaintId(complaintId);
    setEditComplaint({ ...complaint });
    setShowForm(true);
  };

  const handleInputChangeComplaints = (e, field) => {
    if (editComplaintId) {
      setEditComplaint({ ...editComplaint, [field]: e.target.value });
    } else {
      setNewComplaint({ ...newComplaint, [field]: e.target.value });
    }
  };

  const handleDateChange = (date) => {
    const dateString = date.toLocaleDateString();
    handleInputChangeComplaints({ target: { value: dateString } }, "since_when");
  };

  const handleAddNew = () => {
    const complaintsRef = ref(db, `chief_complaints/${patientName}`);
    push(complaintsRef, newComplaint).then(() => {
      setNewComplaint({});
      setShowForm(false);
      updateLastUpdatedDate();
    });
  };

  const handleSaveEdit = () => {
    const complaintRef = ref(db, `chief_complaints/${patientName}/${editComplaintId}`);
    update(complaintRef, editComplaint).then(() => {
      updateLastUpdatedDate();
      setEditComplaintId(null);
      setEditComplaint({});
    });
  };


  const handleDelete = (complaintId) => {
    const complaintRef = ref(db, `chief_complaints/${patientName}/${complaintId}`);
    remove(complaintRef).then(() => {
      updateLastUpdatedDate();
    });
  };

  const handleEditComplaints = (complaintId) => {
    const complaint = complaints.find((c) => c.id === complaintId);
    setEditComplaintId(complaintId);
    setEditComplaint({
      chief_complaint: complaint.chief_complaint,
      ongoing: complaint.ongoing,
      on_medication: complaint.on_medication,
      well_managed: complaint.well_managed,
      since_when: complaint.since_when,
      duration: complaint.duration,
      description: complaint.description,
    });
  };

  const calculateDuration = (sinceWhen) => {
    if (!sinceWhen) return "";
    const startDate = new Date(sinceWhen);
    const today = new Date();
    const diffTime = today - startDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    const days = diffDays % 30;
    return `${years} years ${months} months ${days} days`;
  };

  const updateLastUpdatedDate = () => {
    setLastUpdatedDate(new Date().toLocaleDateString());
  };

  useEffect(() => {
    const complaintsRef = ref(db, `chief_complaints/${patientName}`);
    onValue(complaintsRef, (snapshot) => {
      const data = snapshot.val();
      setChiefComplaints(data || {});
      setComplaints(Object.entries(data || {}).map(([id, value]) => ({ id, ...value })));
    });
  }, [db, patientName]);

  //medications

  const handleEditMed = (med, index) => {
    // Initialize `drug_frequency` if not present
    const updatedMed = {
      ...med[1], // Assume med is [key, value] pair
      drug_frequency: med[1]?.drug_frequency || { morning: '', afternoon: '', night: '' }
    };
    setCurrentMed({ key: med[0], data: updatedMed }); // Update currentMed to have a `key` and `data`
    setIsEditing(true);
    setMedIndex(index);
  };
    

  const handleSaveMed = () => {
    const db = getDatabase();
    const medRef = ref(db, `medications/patients/${patientName}/medications/${currentMed.key}`);
    
    update(medRef, currentMed.data)  // Save only the data part of currentMed
      .then(() => setIsEditing(false))
      .catch(error => console.error("Error updating medication:", error));
  };  

  const handleAddNewMed = () => {
    const db = getDatabase();
    const newMedRef = push(ref(db, `medications/patients/${patientName}/medications`));
    const newMedData = {
      drug_name: '',
      drug_strength: '',
      drug_frequency: { morning: '', afternoon: '', night: '' },
      from_date: '',
      to_date: '',
      duration: '',
      description: ''
    };
  
    setCurrentMed({ key: newMedRef.key, data: newMedData });
    setIsEditing(true);
  };  

  const handleChangeMed = (field, value) => {
    setCurrentMed(prev => ({
      ...prev,
      data: { ...prev.data, [field]: value } // Update the `data` part only
    }));
  };
  const [newMedication, setNewMedication] = useState({
    drug_name: "",
    drug_strength: "",
    drug_frequency: { morning: "", afternoon: "", night: "" },
    from_date: "",
    to_date: "",
    description: ""
  });
  
  const handleInputChangeMedication = (e, field) => {
    const value = e.target.value;
    setNewMedication(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleFrequencyChangeMedication = (e, timeOfDay) => {
    const value = e.target.value;
    setNewMedication(prev => ({
      ...prev,
      drug_frequency: {
        ...prev.drug_frequency,
        [timeOfDay]: value
      }
    }));
  };  

  const handleAddNewMedication = () => {
    const db = getDatabase();
    const newMedRef = push(ref(db, `medications/patients/${patientName}/medications`));
    
    // Save the new medication to Firebase
    update(newMedRef, newMedication)
      .then(() => {
        setNewMedication({
          drug_name: "",
          drug_strength: "",
          drug_frequency: { morning: "", afternoon: "", night: "" },
          from_date: "",
          to_date: "",
          description: ""
        });
        setShowFormMed(false); // Hide the form after saving
      })
      .catch(error => console.error("Error adding medication:", error));
  };
  
  //Family Relations

  const [newFamilyHistory, setNewFamilyHistory] = useState({
    relation: "",
    diagnosis: "",
    since_when: "",
    description: ""
  });

  const updateFields = (index) => {
    const { relation, diagnosis, since_when, description } = familyHistory[index];
    setRelation(relation);
    setDiagnosis(diagnosis);
    setSw(since_when);
    setDescription(description);
  };

  const handleSaveFr = () => {
    const updatedData = { relation, diagnosis, since_when: sw, description };
    const familyHistoryRef = ref(db, `family_relations/patients/${patientName}/family_history/${fhIndex}`);
    
    update(familyHistoryRef, updatedData)
      .then(() => console.log("Data updated successfully"))
      .catch((error) => console.error("Error updating data: ", error));

    setEdit3(!edit3);
  };
  const handleAddNewFamilyHistory = () => {
    if (newFamilyHistory.relation && newFamilyHistory.diagnosis && newFamilyHistory.since_when && newFamilyHistory.description) {
      const newFamilyHistoryData = {
        relation: newFamilyHistory.relation,
        diagnosis: newFamilyHistory.diagnosis,
        since_when: newFamilyHistory.since_when,
        description: newFamilyHistory.description
      };
  
      const familyHistoryRef = ref(db, `family_relations/patients/${patientName}/family_history`);
      const newRef = push(familyHistoryRef);
  
      set(newRef, newFamilyHistoryData)
        .then(() => {
          // Fetch updated family history data after adding
          fetchFamilyHistory();  // Ensure you have this function to fetch updated data from Firebase
          setShowFormFamilyHistory(false);
          console.log('New family history added successfully.');
        })
        .catch((error) => {
          console.error('Error adding new data: ', error);
        });
    } else {
      console.error('All fields must be filled out.');
    }
  };
  

  const handleUpdateFamilyHistory = (e, field, key) => {
    const updatedFamilyHistory = { ...familyHistory };
    updatedFamilyHistory[key][field] = e.target.value;
    setFamilyHistory(updatedFamilyHistory);
  };
  if (!familyHistory || Object.keys(familyHistory).length === 0) return null;

  const handleInputChangeFamilyHistory = (e, field) => {
    setNewFamilyHistory(prevState => ({
      ...prevState,
      [field]: e.target.value
    }));
  };

  const fetchFamilyHistory = () => {
    const familyHistoryRef = ref(db, `family_relations/patients/${patientName}/family_history`);
    onValue(familyHistoryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert data object to an array of entries
        const familyHistoryArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setFamilyHistory(familyHistoryArray);
      } else {
        setFamilyHistory([]);
      }
    }, {
      onlyOnce: true
    });
  };  

  //Surgical History

  const handleSave = async () => {
    try {
      const dbRef = db.database().ref(`surgical_history/patients/${patientName}/surgical_history`);
      const updatedHistory = [...surgicalHistory];
      updatedHistory[shIndex] = currentRecord;
      await dbRef.set(updatedHistory);
      setEdit4(false);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleInputChangeSh = (e) => {
    const { name, value } = e.target;
    setCurrentRecord(prev => ({ ...prev, [name]: value }));
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
                      type="radio"
                      name="weightUnit"
                      value="Kg"
                      defaultChecked
                      onChange={(e) => setWUnit(e.target.value)}
                    />{" "}
                    Kg
                  </label>
                  <input
                    type="number"
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
      <div className="ccm goalSet">
        <div className="gs">
          <div className="ccmTop">
            <h1>Communication Info</h1>
          </div>
          <div
            className="slide"
            style={{ border: edit2 ? "" : "1px solid #F23D76" }}
          >
            <button
            onClick={() => {
              if (!edit2) {
                savePersonalInfo(); // Save data if clicking 'Save'
              }
              setEdit2(!edit2);
            }}
            style={{
              backgroundColor: edit2 ? "transparent" : "#F23D76",
              color: edit2 ? "#F23D76" : "#FFFFFF",
            }}
          >
            {edit2 ? "Edit" : "Save"}
          </button>
            <div className="slideCont">
              <p>
                WA Phone Number:
                <input
                  type="text"
                  value={contact}
                  readOnly={edit2}
                  onChange={(e) => setContact(e.target.value)}
                  style={{ border: edit2 ? "none" : "1px solid #919191" }}
                />
              </p>
              <p>
                Alternate Phone Number:
                <input
                  type="text"
                  value={alternatePhone}
                  readOnly={edit2}
                  onChange={(e) => setAlternatePhone(e.target.value)}
                  style={{ border: edit2 ? "none" : "1px solid #919191" }}
                />
              </p>
            </div>
            <div className="slideCont">
              <p>
                Email ID:
                <input
                  type="text"
                  value={email}
                  readOnly={edit2}
                  onChange={(e) => setemail(e.target.value)}
                  style={{ border: edit2 ? "none" : "1px solid #919191" }}
                />
              </p>
            </div>
            <div className="slideCont">
              <div className="alg algDesc">
                <p>Address :</p>
                <textarea
                  value={address}
                  readOnly={edit2}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{ border: edit2 ? "none" : "1px solid #707070" }}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d2lc">
        <div className="vitals ccm">
          <div className="ccmTop">
            <h1>Vitals</h1>
          <div className="udb">
              <p>Last Updated : </p>
              <p>30 July 2024</p>
            </div>
          </div>
          <div className="d2Links">
            <button>17 July 2024</button>
            <button>25 July 2024</button>
            <button
              style={{ backgroundColor: "rgb(64, 64, 64)", color: "white" }}
            >
              30 July 2024
            </button>
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
      <div className="d2lc">
      <div className="ccmMain">
        <div className="ccm">
          <div className="ccmTop">
            <h1>Chief Complaints</h1>
            <div className="udb">
              <p>Last Updated: </p>
              <p>{lastUpdatedDate}</p>
              <button onClick={() => setShowForm(true)}>
                <img src={addPink} alt="addPink" /> Add New
              </button>
            </div>
          </div>

          {showForm && (
            <div className="form">
              <input
                type="text"
                placeholder="Chief Complaint"
                value={newComplaint.chief_complaint || ""}
                onChange={(e) => handleInputChangeComplaints(e, "chief_complaint")}
              />
              <textarea
                placeholder="Description"
                value={newComplaint.description || ""}
                onChange={(e) => handleInputChangeComplaints(e, "description")}
              />
              <select
                value={newComplaint.ongoing || ""}
                onChange={(e) => handleInputChangeComplaints(e, "ongoing")}
              >
                <option value="">Ongoing?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <select
                value={newComplaint.on_medication || ""}
                onChange={(e) => handleInputChangeComplaints(e, "on_medication")}
              >
                <option value="">On Medication?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <select
                value={newComplaint.well_managed || ""}
                onChange={(e) => handleInputChangeComplaints(e, "well_managed")}
              >
                <option value="">Well Managed?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <Calendar
                onChange={(date) =>
                  handleInputChangeComplaints({ target: { value: date.toLocaleDateString() } }, "since_when")
                }
              />
              <button onClick={handleAddNew}>Save</button>
            </div>
          )}

          <div className="sliderMain">
            <div className="sm cms">
              <div className="slider">
                {complaints.map((complaint) => (
                  <div className="slide" key={complaint.id}>
                    {editComplaintId === complaint.id ? (
                      <div>
                        <textarea
                          value={editComplaint.chief_complaint}
                          onChange={(e) => handleInputChangeComplaints(e, "chief_complaint")}
                        />
                        <textarea
                          value={editComplaint.description}
                          onChange={(e) => handleInputChangeComplaints(e, "description")}
                        />
                        <select
                          value={editComplaint.ongoing}
                          onChange={(e) => handleInputChangeComplaints(e, "ongoing")}
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        <select
                          value={editComplaint.on_medication}
                          onChange={(e) => handleInputChangeComplaints(e, "on_medication")}
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        <select
                          value={editComplaint.well_managed}
                          onChange={(e) => handleInputChangeComplaints(e, "well_managed")}
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        <Calendar
                          value={new Date(editComplaint.since_when)}
                          onChange={(date) =>
                            handleInputChangeComplaints(
                              { target: { value: date.toLocaleDateString() } },
                              "since_when"
                            )
                          }
                        />
                        <button onClick={handleSaveEdit}>Save</button>
                        <button onClick={() => setEditComplaintId(null)}>Cancel</button>
                      </div>
                    ) : (
                      <div>
                        <button onClick={() => handleEditComplaints(complaint.id)}>Edit</button>
                        <div className="slideCont">
                          <p>
                            Chief Complaint: <b>{complaint.chief_complaint}</b>
                          </p>
                        </div>
                        <div className="slideCont">
                          <p>Ongoing: <b>{complaint.ongoing}</b></p>
                          <p>On Medication: <b>{complaint.on_medication}</b></p>
                          <p>Well Managed: <b>{complaint.well_managed}</b></p>
                        </div>
                        <div className="slideCont">
                          <p>Since When: <b>{complaint.since_when}</b></p>
                          <p>Duration: <b>{calculateDuration(complaint.since_when)}</b></p>
                        </div>
                        <div className="slideCont">
                          <p>Description: <i>{complaint.description}</i></p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="d2lc">
    <div className="ccmMain">
      <div className="ccm">
        <div className="ccmTop">
          <h1>Medications</h1>
          <div className="udb">
            <p>Last Updated: 30 July 2024</p>
            <button onClick={() => setShowFormMed(true)}>
              <img src={addPink} alt="addPink" /> Add New
              </button>
          </div>
        </div>

        {showFormMed && (
  <div className="form">
    <input
      type="text"
      placeholder="Drug Name"
      value={newMedication.drug_name || ""}
      onChange={(e) => handleInputChangeMedication(e, "drug_name")}
    />
    <input
      type="text"
      placeholder="Drug Strength (e.g., 100 mg)"
      value={newMedication.drug_strength || ""}
      onChange={(e) => handleInputChangeMedication(e, "drug_strength")}
    />
    
    <div>
      <label>Frequency:</label>
      <div>
        <input
          type="number"
          placeholder="Morning"
          value={newMedication.drug_frequency?.morning || ""}
          onChange={(e) => handleFrequencyChangeMedication(e, "morning")}
        />
        <input
          type="number"
          placeholder="Afternoon"
          value={newMedication.drug_frequency?.afternoon || ""}
          onChange={(e) => handleFrequencyChangeMedication(e, "afternoon")}
        />
        <input
          type="number"
          placeholder="Night"
          value={newMedication.drug_frequency?.night || ""}
          onChange={(e) => handleFrequencyChangeMedication(e, "night")}
        />
      </div>
    </div>
    
    <Calendar
      onChange={(date) =>
        handleInputChangeMedication({ target: { value: date.toLocaleDateString() } }, "from_date")
      }
    />
    <Calendar
      onChange={(date) =>
        handleInputChangeMedication({ target: { value: date.toLocaleDateString() } }, "to_date")
      }
    />
    <textarea
      placeholder="Description"
      value={newMedication.description || ""}
      onChange={(e) => handleInputChangeMedication(e, "description")}
    />
    
    <button onClick={handleAddNewMedication}>Save</button>
    <button onClick={() => setShowFormMed(false)}>Cancel</button>
  </div>
)}

        

        {/* Carousel to display Medications */}
        <div className="sliderMain">
          <div className="sliderBtns">
            <button onClick={() => setMedIndex((medIndex - 1 + medications.length) % medications.length)}>
              {"<"}
            </button>
            <button onClick={() => setMedIndex((medIndex + 1) % medications.length)}>
              {">"}
            </button>
          </div>
          <div className="sliderWindow">
            {medications.length > 0 && (
              <div className="slide">
                {isEditing && currentMed ? (
                  <div className="editForm">
                    <input
                      type="text"
                      value={currentMed.data?.drug_name || ''}
                      onChange={(e) => handleChangeMed('drug_name', e.target.value)}
                      placeholder="Drug Name"
                    />
                    <input
                      type="number"
                      value={currentMed.data?.drug_strength || ''}
                      onChange={(e) => handleChangeMed('drug_strength', e.target.value)}
                      placeholder="Strength (mg/ml)"
                    />
                    <div>
                      <label>Drug Frequency:</label>
                      <input
                        type="number"
                        value={currentMed.data?.drug_frequency?.morning || ''}
                        onChange={(e) => handleFrequencyChangeMedication('morning', e.target.value)}
                        placeholder="Morning"
                      />
                      <input
                        type="number"
                        value={currentMed.data?.drug_frequency?.afternoon || ''}
                        onChange={(e) => handleFrequencyChangeMedication('afternoon', e.target.value)}
                        placeholder="Afternoon"
                      />
                      <input
                        type="number"
                        value={currentMed.data?.drug_frequency?.night || ''}
                        onChange={(e) => handleFrequencyChangeMedication('night', e.target.value)}
                        placeholder="Night"
                      />
                    </div>

                    <Calendar
                      onChange={(date) => handleChangeMed('from_date', date)}
                      value={new Date(currentMed.data?.from_date || '')}
                    />
                    <Calendar
                      onChange={(date) => handleChangeMed('to_date', date)}
                      value={new Date(currentMed.data?.from_date || '')}
                    />
                    <textarea
                      value={currentMed.data?.description || ''}
                      onChange={(e) => handleChangeMed('description', e.target.value)}
                      placeholder="Description"
                    />
                    <button onClick={handleSaveMed}>Save</button>
                  </div>
                ) : (
                  <div>
                    <p>Drug Name: {medications[medIndex][1]?.drug_name || 'N/A'}</p>
                    <p>Strength: {medications[medIndex][1]?.drug_strength || 'N/A'}</p>
                    <p>Frequency: {`Morning: ${medications[medIndex][1]?.drug_frequency?.morning || 'N/A'}, Afternoon: ${medications[medIndex][1]?.drug_frequency?.afternoon || 'N/A'}, Night: ${medications[medIndex][1]?.drug_frequency?.night || 'N/A'}`}</p>
                    <p>From: {medications[medIndex][1]?.from_date || 'N/A'}</p>
                    <p>To: {medications[medIndex][1]?.to_date || 'N/A'}</p>
                    <p>Description: {medications[medIndex][1]?.description || 'N/A'}</p>
                    <button onClick={() => handleEditMed(medications[medIndex], medIndex)}>Edit</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="d2lc">
      <div className="ccmMain">
        <div className="ccm">
          <div className="ccmTop">
            <h1>Family History</h1>
          </div>
          <div className="sliderMain gs">
            <div className="sm">
              <div className="sliderBtns">
                <button className="left" onClick={handleFhLeftSlide}>
                  <img src={triangle} alt="triangle" />
                </button>
                <button className="right" onClick={handleFhRightSlide}>
                  <img src={triangle} alt="triangle" />
                </button>
              </div>
              <div className="sliderWindow">
                <div
                  className="slider"
                  style={{
                    transform: `translateX(-${(fhIndex * 100) / Object.keys(familyHistory).length}%)`,
                  }}
                >
                  {Object.keys(familyHistory).map((key) => (
                    <div className="slide" key={key}>
                      <button
                        onClick={() => setEdit3(!edit3)}
                        style={{
                          backgroundColor: edit3 ? "transparent" : "#F23D76",
                          color: edit3 ? "#F23D76" : "#FFFFFF",
                        }}
                      >
                        {edit3 ? "Edit" : "Save"}
                      </button>
                      <div className="slideCont">
                        <p>
                          Relation:
                          {edit3 ? (
                            <b>{familyHistory[key].relation}</b>
                          ) : (
                            <select
                              value={familyHistory[key].relation}
                              onChange={(e) => handleUpdateFamilyHistory(e, "relation", key)}
                            >
                              <option value="Mother">Mother</option>
                              <option value="Father">Father</option>
                              <option value="Son">Son</option>
                              <option value="Daughter">Daughter</option>
                              <option value="Brother">Brother</option>
                            </select>
                          )}
                        </p>
                      </div>
                      <div className="slideCont">
                        <p>
                          Diagnosis:
                          {edit3 ? (
                            <b>{familyHistory[key].diagnosis}</b>
                          ) : (
                            <select
                              value={familyHistory[key].diagnosis}
                              onChange={(e) => handleUpdateFamilyHistory(e, "diagnosis", key)}
                            >
                              <option value="C095.3 Tuberculosis">C095.3 Tuberculosis</option>
                              <option value="C095.3 Tuberculosis2">C095.3 Tuberculosis2</option>
                              <option value="C095.3 Tuberculosis3">C095.3 Tuberculosis3</option>
                              <option value="C095.3 Tuberculosis4">C095.3 Tuberculosis4</option>
                            </select>
                          )}
                        </p>
                      </div>
                      <div className="slideCont">
                        <p>
                          Since When:
                          {edit3 ? (
                            <b>{familyHistory[key].since_when}</b>
                          ) : (
                            <input
                              type="date"
                              value={familyHistory[key].since_when}
                              onChange={(e) => handleUpdateFamilyHistory(e, "since_when", key)}
                            />
                          )}
                        </p>
                      </div>
                      <div className="slideCont">
                        <div className="alg algDesc">
                          <p>Description:</p>
                          <textarea
                            readOnly={edit3}
                            value={familyHistory[key].description}
                            onChange={(e) => handleUpdateFamilyHistory(e, "description", key)}
                            style={{
                              border: edit3 ? "none" : "1px solid #707070",
                            }}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="smBtns">
              {Object.keys(familyHistory).map((_, index) => (
                <div
                  className={fhIndex === index ? "smb smbc" : "smb"}
                  onClick={() => setFhIndex(index)}
                  key={index}
                ></div>
              ))}
            </div>
          </div>
          <p className="pages">{fhIndex + 1} of {Object.keys(familyHistory).length}</p>
          <button onClick={() => setShowFormFamilyHistory(true)}>Add New</button>
        </div>
      </div>
      {showFormFamilyHistory && (
        <div className="form">
          <input
            type="text"
            placeholder="Relation (e.g., Father, Mother)"
            value={newFamilyHistory.relation || ""}
            onChange={(e) => handleInputChangeFamilyHistory(e, "relation")}
          />
          <input
            type="text"
            placeholder="Diagnosis (e.g., Diabetes, Hypertension)"
            value={newFamilyHistory.diagnosis || ""}
            onChange={(e) => handleInputChangeFamilyHistory(e, "diagnosis")}
          />
          <div>
            <label>Since When:</label>
            <input
              type="date"
              value={newFamilyHistory.since_when || ""}
              onChange={(e) => handleInputChangeFamilyHistory(e, "since_when")}
            />
          </div>
          <textarea
            placeholder="Description (e.g., Brief description of the condition)"
            value={newFamilyHistory.description || ""}
            onChange={(e) => handleInputChangeFamilyHistory(e, "description")}
          />
          <button onClick={handleAddNewFamilyHistory}>Save</button>
          <button onClick={() => setShowFormFamilyHistory(false)}>Cancel</button>
        </div>
      )}
    </div>

      <div className="d2lc">
        <div className="ccmMain">
          <div className="ccm">
            <div className="ccmTop">
              <h1>Surgical History</h1>
            </div>
            <div className="sliderMain gs">
              <div className="sm">
                <div className="sliderBtns">
                  <button className="left" onClick={handleShLeftSlide}>
                    <img src={triangle} alt="triangle" />
                  </button>
                  <button className="right" onClick={handleShRightSlide}>
                    <img src={triangle} alt="triangle" />
                  </button>
                </div>
                <div className="sliderWindow">
                  <div
                    className="slider"
                    style={{
                      transform: `translateX(-${(shIndex * 100) / (surgicalHistory.length || 1)}%)` }}
                  >
                    {surgicalHistory.map((record, index) => (
                    <div className="slide" key={index}>
                      <button
                        onClick={() => {
                          if (edit4) handleSave();
                          setEdit4(!edit4);
                        }}
                        style={{
                          backgroundColor: edit4 ? "transparent" : "#F23D76",
                          color: edit4 ? "#F23D76" : "#FFFFFF",
                        }}
                      >
                        {edit4 ? "Edit" : "Save"}
                      </button>
                      <div className="slideCont">
                        <p>
                          Surgery:
                          {edit4 ? (
                            <b>{currentRecord.surgery}</b>
                          ) : (
                            <select
                              name="surgery"
                              value={currentRecord.surgery}
                              onChange={handleInputChangeSh}
                            >
                              <option value="Cataract surgery"> Cataract surgery </option>
                              <option value="Cataract surgery2"> Cataract surgery2 </option>
                              <option value="Cataract surgery3">  Cataract surgery3 </option>
                            </select>
                          )}
                        </p>
                      </div>
                      <div className="slideCont">
                        <p>
                          When it was done:
                          {edit4 ? (
                            <b>{currentRecord.when}</b>
                          ) : (
                            <input
                              type="date"
                              name="when"
                              value={currentRecord.when}
                              onChange={handleInputChangeSh}
                            />
                          )}
                        </p>
                      </div>
                      <div className="slideCont">
                        <div className="alg algDesc">
                          <p>Description :</p>
                          <textarea
                            name="description"
                            value={currentRecord.description}
                            readOnly={edit4}
                            onChange={handleInputChangeSh}
                            style={{
                              border: edit4 ? 'none' : '1px solid #707070',
                            }}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  ))}
                    </div>
              </div>
            </div>
            <div className="smBtns">
              {surgicalHistory.map((_, index) => (
                <div
                  key={index}
                  className={shIndex === index ? 'smb smbc' : 'smb'}
                  onClick={() => setShIndex(index)}
                ></div>
              ))}
            </div>
          </div>
          <p className="pages">{shIndex + 1} of {surgicalHistory.length}</p>
        </div>
      </div>
    </div>
      <div className="ccm goalSet">
        <div className="slide">
          <button
            onClick={() => setEdit5(!edit5)}
            style={{
              backgroundColor: edit5 ? "transparent" : "#F23D76",
              color: edit5 ? "#F23D76" : "#FFFFFF",
            }}
          >
            {edit5 ? "Edit" : "Save"}
          </button>
          <div className="slideCont">
            <div className="scdc">
              <div className="scInfo">
                {edit5 ? (
                  <div className="hps">
                    {healthProblems.length > 0 ? (
                      healthProblems.map((hp, index) => <b key={index}>{hp}</b>)
                    ) : (
                      <p>None</p>
                    )}
                  </div>
                ) : (
                  <div className="sci">
                    <label>
                      <input
                        type="checkbox"
                        value="Vegetarian"
                        checked={healthProblems.includes("Vegetarian")}
                        onChange={(e) => handleHp(e.target.value)}
                      />{" "}
                      Vegetarian
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Vegan"
                        checked={healthProblems.includes("Vegan")}
                        onChange={(e) => handleHp(e.target.value)}
                      />{" "}
                      Vegan
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Jain vegetarian"
                        checked={healthProblems.includes("Jain vegetarian")}
                        onChange={(e) => handleHp(e.target.value)}
                      />{" "}
                      Jain vegetarian
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Eggetarian"
                        checked={healthProblems.includes("Eggetarian")}
                        onChange={(e) => handleHp(e.target.value)}
                      />{" "}
                      Eggetarian
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Non vegetarian"
                        checked={healthProblems.includes("Non vegetarian")}
                        onChange={(e) => handleHp(e.target.value)}
                      />{" "}
                      Non vegetarian
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Seafood"
                        checked={healthProblems.includes("Seafood")}
                        onChange={(e) => handleHp(e.target.value)}
                      />{" "}
                      Seafood
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Mutton"
                        checked={healthProblems.includes("Mutton")}
                        onChange={(e) => handleHp(e.target.value)}
                      />{" "}
                      Mutton
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Chicken"
                        checked={healthProblems.includes("Chicken")}
                        onChange={(e) => handleHp(e.target.value)}
                      />{" "}
                      Chicken
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Mushroom"
                        checked={healthProblems.includes("Mushroom")}
                        onChange={(e) => handleHp(e.target.value)}
                      />{" "}
                      Mushroom
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Soya & soya products"
                        checked={healthProblems.includes(
                          "Soya & soya products"
                        )}
                        onChange={(e) => handleHp(e.target.value)}
                      />{" "}
                      Soya & soya products
                    </label>
                  </div>
                )}
              </div>
              <div className="alg">
                <p>Likes</p>
                <textarea
                  readOnly={edit5}
                  style={{ border: edit5 ? "none" : "1px solid #707070" }}
                ></textarea>
              </div>
              <div className="alg">
                <p>Dislikes</p>
                <textarea
                  readOnly={edit5}
                  style={{ border: edit5 ? "none" : "1px solid #707070" }}
                ></textarea>
              </div>
              <div className="sc">
                <p>Oil Type:</p>
                {edit5 ? (
                  <div className="hps">
                    {healthProblems2.length > 0 ? (
                      healthProblems2.map((hp, index) => (
                        <b key={index}>{hp}</b>
                      ))
                    ) : (
                      <p>None</p>
                    )}
                  </div>
                ) : (
                  <div className="sci">
                    <label>
                      <input
                        type="checkbox"
                        value="Sunflower"
                        checked={healthProblems2.includes("Sunflower")}
                        onChange={(e) => handleHp2(e.target.value)}
                      />{" "}
                      Sunflower
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Olive"
                        checked={healthProblems2.includes("Olive")}
                        onChange={(e) => handleHp2(e.target.value)}
                      />{" "}
                      Olive
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Rice bran"
                        checked={healthProblems2.includes("Rice bran")}
                        onChange={(e) => handleHp2(e.target.value)}
                      />{" "}
                      Rice bran
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Coconut"
                        checked={healthProblems2.includes("Coconut")}
                        onChange={(e) => handleHp2(e.target.value)}
                      />{" "}
                      Coconut
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Groundnut"
                        checked={healthProblems2.includes("Groundnut")}
                        onChange={(e) => handleHp2(e.target.value)}
                      />{" "}
                      Groundnut
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Ghee"
                        checked={healthProblems2.includes("Ghee")}
                        onChange={(e) => handleHp2(e.target.value)}
                      />{" "}
                      Ghee
                    </label>
                  </div>
                )}
                <div className="oiNum">
                  <p>Oil intake (liter/month):</p>
                  <input type="number" readOnly={edit5} />
                </div>
              </div>
              <div className="sc">
                <p>Salt:</p>
                {edit5 ? (
                  <div className="hps">
                    {healthProblems3.length > 0 ? (
                      healthProblems3.map((hp, index) => (
                        <b key={index}>{hp}</b>
                      ))
                    ) : (
                      <p>None</p>
                    )}
                  </div>
                ) : (
                  <div className="sci">
                    <label>
                      <input
                        type="checkbox"
                        value="Iodised"
                        checked={healthProblems3.includes("Iodised")}
                        onChange={(e) => handleHp3(e.target.value)}
                      />{" "}
                      Iodised
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Non-Iodised"
                        checked={healthProblems3.includes("Non-Iodised")}
                        onChange={(e) => handleHp3(e.target.value)}
                      />{" "}
                      Non-Iodised
                    </label>
                  </div>
                )}
                <div className="oiNum">
                  <p>Salt intake (Kg/month):</p>
                  <input type="number" readOnly={edit5} />
                </div>
              </div>
              <div className="sc alg">
                <p>Flour type:</p>
                {edit5 ? (
                  <div className="hps">
                    {healthProblems4.length > 0 ? (
                      healthProblems4.map((hp, index) => (
                        <b key={index}>{hp}</b>
                      ))
                    ) : (
                      <p>None</p>
                    )}
                  </div>
                ) : (
                  <div className="sci">
                    <label>
                      <input
                        type="checkbox"
                        value="Wheat"
                        checked={healthProblems4.includes("Wheat")}
                        onChange={(e) => handleHp4(e.target.value)}
                      />{" "}
                      Wheat
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Multigrain"
                        checked={healthProblems4.includes("Multigrain")}
                        onChange={(e) => handleHp4(e.target.value)}
                      />{" "}
                      Multigrain
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Mixed"
                        checked={healthProblems4.includes("Mixed")}
                        onChange={(e) => handleHp4(e.target.value)}
                      />{" "}
                      Mixed
                    </label>
                  </div>
                )}
                <div className="scText">
                  <p>If other specify:</p>
                  <textarea readOnly={edit5}></textarea>
                </div>
              </div>
              <div className="sc alg">
                <p>Milk type:</p>
                {edit5 ? (
                  <div className="hps">
                    {healthProblems5.length > 0 ? (
                      healthProblems5.map((hp, index) => (
                        <b key={index}>{hp}</b>
                      ))
                    ) : (
                      <p>None</p>
                    )}
                  </div>
                ) : (
                  <div className="sci">
                    <label>
                      <input
                        type="checkbox"
                        value="Packed full cream"
                        checked={healthProblems5.includes("Packed full cream")}
                        onChange={(e) => handleHp5(e.target.value)}
                      />{" "}
                      Packed full cream
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Packed toned"
                        checked={healthProblems5.includes("Packed toned")}
                        onChange={(e) => handleHp5(e.target.value)}
                      />{" "}
                      Packed toned
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Packed double toned"
                        checked={healthProblems5.includes(
                          "Packed double toned"
                        )}
                        onChange={(e) => handleHp5(e.target.value)}
                      />{" "}
                      Packed double toned
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Cow milk"
                        checked={healthProblems5.includes("Cow milk")}
                        onChange={(e) => handleHp5(e.target.value)}
                      />{" "}
                      Cow milk
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Buffalo milk"
                        checked={healthProblems5.includes("Buffalo milk")}
                        onChange={(e) => handleHp5(e.target.value)}
                      />{" "}
                      Buffalo milk
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Skimmed milk"
                        checked={healthProblems5.includes("Skimmed milk")}
                        onChange={(e) => handleHp5(e.target.value)}
                      />{" "}
                      Skimmed milk
                    </label>
                  </div>
                )}
              </div>
              <div className="sc alg">
                <p>Milk products:</p>
                {edit5 ? (
                  <div className="hps">
                    {healthProblems6.length > 0 ? (
                      healthProblems6.map((hp, index) => (
                        <b key={index}>{hp}</b>
                      ))
                    ) : (
                      <p>None</p>
                    )}
                  </div>
                ) : (
                  <div className="sci">
                    <label>
                      <input
                        type="checkbox"
                        value="Curd"
                        checked={healthProblems6.includes("Curd")}
                        onChange={(e) => handleHp6(e.target.value)}
                      />{" "}
                      Curd
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Buttermilk"
                        checked={healthProblems6.includes("Buttermilk")}
                        onChange={(e) => handleHp6(e.target.value)}
                      />{" "}
                      Buttermilk
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Paneer"
                        checked={healthProblems6.includes("Paneer")}
                        onChange={(e) => handleHp6(e.target.value)}
                      />{" "}
                      Paneer
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Cow milk"
                        checked={healthProblems6.includes("Cow milk")}
                        onChange={(e) => handleHp6(e.target.value)}
                      />{" "}
                      Cow milk
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Cheese"
                        checked={healthProblems6.includes("Cheese")}
                        onChange={(e) => handleHp6(e.target.value)}
                      />{" "}
                      Cheese
                    </label>
                  </div>
                )}
                <div className="scText">
                  <p>If other specify:</p>
                  <textarea readOnly={edit5}></textarea>
                </div>
              </div>
              <div className="sc">
                <p>Dietary recall (Health Plan):</p>
                <div className="tableMain">
                  <table>
                    <thead>
                      <th>Routine Activity</th>
                      <th>Duration</th>
                      <th>Dishes</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <select>
                            <option value="Pre-Breakfast">Pre-Breakfast</option>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                          </select>
                        </td>
                        <td>
                          <div>
                          <input type="time" />
                          <b>To</b>
                          <input type="time" />
                          </div>
                          <div>
                          <input type="time" />
                          <b>To</b>
                          <input type="time" />
                          </div>
                          
                        </td>
                        <td>
                          <div className="dishes">
                            <select>
                              <option value="Pre-Breakfast">Pre-Breakfast</option>
                              <option value="Breakfast">Breakfast</option>
                              <option value="Lunch">Lunch</option>
                            </select>
                            <textarea ></textarea>
                          </div>
                          <div className="dishes">
                            <select>
                              <option value="Pre-Breakfast">Pre-Breakfast</option>
                              <option value="Breakfast">Breakfast</option>
                              <option value="Lunch">Lunch</option>
                            </select>
                            <input type="text" />
                            <div className="udb daBtn">
                              <button>
                                <img src={add} alt="add" />
                                Add New
                              </button>
                            </div>
                          </div>

                        </td>
                      </tr>
                      <tr>
                        <td>
                          <select>
                            <option value="Pre-Breakfast">Pre-Breakfast</option>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                          </select>
                        </td>
                        <td>
                          <div>
                          <input type="time" />
                          <b>To</b>
                          <input type="time" />
                          </div>
                          
                        </td>
                        <td>
                          <div className="dishes">
                            <select>
                              <option value="Pre-Breakfast">Pre-Breakfast</option>
                              <option value="Breakfast">Breakfast</option>
                              <option value="Lunch">Lunch</option>
                            </select>
                            <input type="text" />
                            <div className="udb daBtn">
                              <button>
                                <img src={add} alt="add" />
                                Add New
                              </button>
                            </div>
                          </div>

                        </td>
                      </tr>
                      <tr>
                        <td>
                          <select>
                            <option value="Pre-Breakfast">Pre-Breakfast</option>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                          </select>
                        </td>
                        <td>
                          <div>
                          <input type="time" />
                          <b>To</b>
                          <input type="time" />
                          </div>
                        </td>
                        <td>
                          <div className="dishes">
                            <select>
                              <option value="Pre-Breakfast">Pre-Breakfast</option>
                              <option value="Breakfast">Breakfast</option>
                              <option value="Lunch">Lunch</option>
                            </select>
                            <input type="text" />
                            <div className="udb daBtn">
                              <button>
                                <img src={add} alt="add" />
                                Add New
                              </button>
                            </div>
                          </div>

                        </td>
                      </tr>
                    </tbody>
                    
                  </table>
                    <button className="tableBtn">
                      <img src={add} alt="add" />
                      Add new
                      </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d2lc">
        <div className="ccmMain">
          <div className="ccm">
            <div className="ccmTop">
              <h1>Other Information</h1>
            </div>
            <div className="sliderMain">
              <div className="slide daSlide">
                <div className="slideCont">
                    <p>Water Intake:</p>
                    <div className="scOpt">
                      <label>
                        <input type="radio" name="waterIntake"/>
                        Glasses
                      </label>
                      <label>
                        <input type="radio" name="waterIntake"/>
                        Litre
                      </label>

                    </div>
                </div>
                <div className="slideCont">
                    <div className="scOpt">
                      <p>Water Intake Quantity:</p>
                      <input type="number" />
                    </div>
                </div>
                <div className="slideCont">
                    <div className="scOpt">
                      <p>Urination Count:</p>
                      <input type="number" />Times a day
                    </div>
                </div>
                <div className="slideCont">
                    <div className="scOpt">
                      <p>Stool Frequency:</p>
                      <input type="number" />Times a day
                    </div>
                </div>
                <div className="slideCont">
                    <div className="scOpt">
                      <p>Sleep:</p>
                      <input type="number" />Hours
                    </div>
                </div>
                <div className="slideCont">
                    <p>Spectacles:</p>
                    <div className="scOpt">
                      <label>
                        <input type="radio" name="Spectacles"/>
                        Yes
                      </label>
                      <label>
                        <input type="radio" name="Spectacles"/>
                        No
                      </label>

                    </div>
                </div>
                <div className="slideCont">
                    <p>Has BP Monitor:</p>
                    <div className="scOpt">
                      <label>
                        <input type="radio" name="BP"/>
                        Yes
                      </label>
                      <label>
                        <input type="radio" name="BP"/>
                        No
                      </label>

                    </div>
                </div>
                <div className="slideCont">
                    <p>Has Glucometer Monitor:</p>
                    <div className="scOpt">
                      <label>
                        <input type="radio" name="Glucometer"/>
                        Yes
                      </label>
                      <label>
                        <input type="radio" name="Glucometer"/>
                        No
                      </label>

                    </div>
                </div>
                <div className="slideCont">
                    <p>Has Weighing Monitor:</p>
                    <div className="scOpt">
                      <label>
                        <input type="radio" name="Weighing"/>
                        Yes
                      </label>
                      <label>
                        <input type="radio" name="Weighing"/>
                        No
                      </label>

                    </div>
                </div>
                <div className="slideCont">
                    <p>How do you feel when you wake up?</p>
                    <div className="scOpt">
                      <label>
                        <input type="radio" name="wake"/>
                        Excited
                      </label>
                      <label>
                        <input type="radio" name="wake"/>
                        Rested
                      </label>
                      <label>
                        <input type="radio" name="wake"/>
                        Tired
                      </label>

                    </div>
                </div>
                <div className="slideCont">
                    <p>How do you feel for most of the day?</p>
                    <div className="scOpt">
                      <label>
                        <input type="radio" name="day"/>
                        Full of Energy
                      </label>
                      <label>
                        <input type="radio" name="day"/>
                        Low on Energy
                      </label>
                      <label>
                        <input type="radio" name="day"/>
                        No Energy at all
                      </label>

                    </div>
                </div>
                <div className="slideCont">
                    <p>How stressed are you?</p>
                    <div className="scOpt">
                      <label>
                        <input type="radio" name="stressed"/>
                        Rarely
                      </label>
                      <label>
                        <input type="radio" name="stressed"/>
                        Several days in a week
                      </label>
                      <label>
                        <input type="radio" name="stressed"/>
                        No Energy at all
                      </label>

                    </div>
                </div>
                <div className="slideCont">
                    <p>How much time do you spend with family?</p>
                    <div className="scOpt">
                      <label>
                        <input type="radio" name="family"/>
                        Not able to spend time
                      </label>
                      <label>
                        <input type="radio" name="family"/>
                        Spends some time
                      </label>
                      <label>
                        <input type="radio" name="family"/>
                        Spends a lot of time
                      </label>

                    </div>
                </div>
                <div className="slideCont">
                    <p>Rate patient on health literacy.</p>
                    <div className="scOpt">
                      <label>
                        <input type="radio" name="literacy"/>
                        Good
                      </label>
                      <label>
                        <input type="radio" name="literacy"/>
                        Average
                      </label>
                      <label>
                        <input type="radio" name="literacy"/>
                        Poor
                      </label>

                    </div>
                </div>
              </div>
                
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailedAssessment;
