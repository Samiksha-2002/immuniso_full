// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAocoT2yStOsskSY5009-uoumy-PgoH0Fw",
	authDomain: "immunisofire1.firebaseapp.com",
	databaseURL: "https://immunisofire1-default-rtdb.firebaseio.com",
	projectId: "immunisofire1",
	storageBucket: "immunisofire1.appspot.com",
	messagingSenderId: "357394355767",
	appId: "1:357394355767:web:d13a17e3dcbccb38b691b2",
	measurementId: "G-RQKPB47RP5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
const storage = getStorage(app);
export { storage, app, database };




















