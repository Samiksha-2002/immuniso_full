import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Components/Home';
import Dashboard from './Components/Dashboard';
import Consultations from './Components/Consultations';
import Doctors from './Components/Doctors';
import Patients from './Components/Patients';
import Dash1 from './Components/Dash1';
import Dash2 from './Components/Dash2';
import FollowUp from './Components/FollowUp';
import GoalSettings from './Components/GoalSettings';
import DetailedAssessment from './Components/DetailedAssessment';
import HealthPlans from './Components/HealthPlans';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}>
          <Route path='/' element={<Dashboard/>}>
            <Route path='/' element={<Dash1/>}/>
            <Route path='/dash2' element={<Dash2/>}>
              <Route path='/dash2' element={<GoalSettings/>}/>
              <Route path='/dash2/detass' element={<DetailedAssessment/>}/>
              <Route path='/dash2/folup' element={<FollowUp/>}/>
              <Route path='/dash2/helpan' element={<HealthPlans/>}/>
            </Route>
          </Route>
          <Route path='/consultations' element={<Consultations/>}/>
          <Route path='/doctors' element={<Doctors/>}/>
          <Route path='/patients' element={<Patients/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
