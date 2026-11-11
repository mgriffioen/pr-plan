// Paste the config from Firebase: Project settings > General > Your apps > Web app.
// These values are not secret. Firebase expects them to be public; the
// security rules and the passphrase are what protect the trip data.
export const firebaseConfig = {
  apiKey: "AIzaSyD68PaqVB6yvKm_Lu0bKwtcbde_CWCxOVU",
  authDomain: "puertorico-trip.firebaseapp.com",
  projectId: "puertorico-trip",
  storageBucket: "puertorico-trip.firebasestorage.app",
  messagingSenderId: "684464254600",
  appId: "1:684464254600:web:830475a7aeeecf9b15793d"
};

// The single shared login you create in Firebase Authentication.
// Its password is the passphrase you and Emily type into the app.
// Must match the email in firestore.rules.
export const TRIP_LOGIN_EMAIL = "puertorico-trip@example.com";
