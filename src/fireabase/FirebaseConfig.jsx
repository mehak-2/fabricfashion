// // firebaseConfig.js

// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';

// // Your web app's Firebase configuration
// const firebaseConfig = {
//  apiKey: "AIzaSyC1-gHRiLTyPDa-Xn-GjHJLRas03whG2Iw",
//   authDomain: "fashionapp-ba61f.firebaseapp.com",
//   projectId: "fashionapp-ba61f",
//   storageBucket: "fashionapp-ba61f.appspot.com",
//   messagingSenderId: "1006534794013",
//   appId: "1:1006534794013:web:2ed1073894e59bdcc41ff4"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firestore and Auth
// const fireDB = getFirestore(app);
// const auth = getAuth(app);

// export { fireDB, auth };
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1-gHRiLTyPDa-Xn-GjHJLRas03whG2Iw",
  authDomain: "fashionapp-ba61f.firebaseapp.com",
  projectId: "fashionapp-ba61f",
  storageBucket: "fashionapp-ba61f.appspot.com",
  messagingSenderId: "1006534794013",
  appId: "1:1006534794013:web:2ed1073894e59bdcc41ff4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };

