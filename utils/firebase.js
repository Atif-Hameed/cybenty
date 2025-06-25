// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDIKDLaPeLT-gm2vWaq2ujpgBUMzGx945I",
    authDomain: "cyber-fbc88.firebaseapp.com",
    projectId: "cyber-fbc88",
    storageBucket: "cyber-fbc88.appspot.com",
    messagingSenderId: "99338074046",
    appId: "1:99338074046:web:72776f995e386dd311abef",
    measurementId: "G-V2DG2VLL54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export default app; 
