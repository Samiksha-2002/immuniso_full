import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
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
import SuperAdminLogin from './Components/SuperAdminLogin';
import PrivateRoute from './Components/PrivateRoute'; // Ensure this is correctly exported
import ProtectedRoute from './Components/ProtectedRoute'; // Ensure this is correctly exported

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<SuperAdminLogin />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />}>
              <Route path="/" element={<Dashboard />}>
                <Route path="dash" element={<Dash1 />} />
                <Route path="/dash2/:patientName" element={<Dash2 />}>
                  <Route path="goalsettings" element={<GoalSettings />} />
                  <Route path="detass" element={<DetailedAssessment />} />
                  <Route path="folup" element={<FollowUp />} />
                  <Route path="helpan" element={<HealthPlans />} />
                </Route>
              </Route>
              {/* Other main routes */}
              <Route path="consultations" element={<Consultations />} />
              <Route path="doctors" element={<Doctors />} />
              <Route path="patients" element={<Patients />} />
              </Route>
          </Route>
          {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
