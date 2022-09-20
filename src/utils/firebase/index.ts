import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBwlf2DoqWVXbty8Q4bRO0suyXu5DD-IaQ',
  authDomain: 'proyecto2021-2022.firebaseapp.com',
  projectId: 'proyecto2021-2022',
  storageBucket: 'proyecto2021-2022.appspot.com',
  messagingSenderId: '932544631769',
  appId: '1:932544631769:web:ec1a0f5407e3d131173fc8',
  measurementId: 'G-P18Q2QX6DP',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
