import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profile from '../Images/profile.png';
import search from '../Images/search.png';
import { ref, set, onValue, remove, child } from 'firebase/database';
import { database, auth } from '../firebase'; // Assuming you have auth imported

function Dash1() {
  const searchInputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newUsers, setNewUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState(null); // State for error message
  const navigate = useNavigate();
  const uid = auth.currentUser.uid; // Get the current user's UID

  useEffect(() => {
    // Fetch recent searches for the current user
    const recentSearchesRef = ref(database, 'users/' + uid + '/recentSearches');
    onValue(recentSearchesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const recentSearchesArray = Object.keys(data).map((key) => data[key]);
        setRecentSearches(recentSearchesArray);
      } else {
        setRecentSearches([]);
      }
    });
  }, [uid]); // Add uid to dependency array

  useEffect(() => {
    // Fetch new users from Firebase
    const newUsersRef = ref(database, 'newUsers');
    onValue(newUsersRef, (snapshot) => {
      const data = snapshot.val();
      setNewUsers(data ? Object.values(data) : []);
    });
  }, []);

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

  const handleSearch = () => {
    if (searchTerm && searchTerm.trim()) {
      setSearchError(null);
      const patientsRef = ref(database, 'patients');
      onValue(patientsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const results = Object.keys(data).map(key => ({ ...data[key], ID: key })).filter(patient =>
            (patient.full_name && patient.full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (patient.ID && patient.ID.toString().includes(searchTerm))
          );  

          setSearchResults(results);

          // Save the first matching patient to recent searches for the current user
          const newSearchRef = ref(database, `users/${uid}/recentSearches/${Date.now()}`);
          set(newSearchRef, { name: searchTerm, ID: results.length > 0 ? results[0].ID : 'N/A' })
          .catch((error) => {
            console.error('Error saving search term:', error);
          }); 
 

          if (results.length === 0) {
            setSearchError('No patient found with that name or ID.');
          }

        // Clear the search term after searching
          setSearchTerm('');
        }
      });
    }
  };

  const handleSearchResultClick = (patientId) => {
    navigate(`/dash2/${patientId}`);
  };

  const handleClearSearches = () => {
    const recentSearchesRef = ref(database, `users/${uid}/recentSearches`);
    remove(recentSearchesRef)
      .then(() => {
        setRecentSearches([]);
      })
      .catch((error) => {
        console.error('Error clearing search history:', error);
      });
  };

  return (
    <div className='dash1'>
      {isFocused && <div className="blur"></div>}

      <div className="searchnRes">
        <div className="search" onClick={handleSearchClick}>
          <img src={search} alt="search" className='searchImg' />
          <input
            type="text"
            placeholder='Search Patients, Patient Id & Doctors'
            ref={searchInputRef}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onBlur={handleBlur}
            onFocus={() => setIsFocused(true)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
        </div>
        {isFocused && searchTerm && (
          <div className="allResults" tabIndex={-1} onMouseDown={(e) => e.preventDefault()}>
            <p>In Profiles</p>
            {searchResults.length > 0 ? (
              searchResults.map((patient, index) => (
                <p key={index} onClick={() => handleSearchResultClick(patient.ID)}>
                  {patient.name} - {patient.ID}
                </p>
              ))
            ) : (
              <p>No results found</p>
            )}
          </div>
        )}
      </div>

      <div className="rcob">
        <div className="recSearch">
          <h2>Recently Searched</h2>
          {recentSearches.length > 0 ? (
            recentSearches.map((search, index) => (
              <Link key={index} to={`/dash2/${search.ID}`}>{search.name} or {search.ID}</Link>
            ))
          ) : (
            <p>No recent searches</p>
          )}
          <button onClick={handleClearSearches}>Clear Search History</button>
        </div>

        <div className="newOn">
          <div className="noHead">
            <h2>New Onboarding</h2>
            <button>Manage All</button>
          </div>
          <div className="allNew">
            {newUsers.length > 0 ? (
              newUsers.map((user, index) => (
                <div className="anPat" key={index}>
                  <img src={profile} alt="profile" />
                  <div className="apInfo">
                    <p>{user.name}</p>
                    <p>{user.phone}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No new users</p>
            )}
          </div>
        </div>
      </div>
    </div>  
  );
}

export default Dash1;
