import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBzO-ukVVZ0--UzV--yUT5IILPT1EqFUB8",
    authDomain: "krushiganudenulk.firebaseapp.com",
    databaseURL: "https://krushiganudenulk.firebaseio.com",
};

firebase.initializeApp(config);
export const db = firebase.database();