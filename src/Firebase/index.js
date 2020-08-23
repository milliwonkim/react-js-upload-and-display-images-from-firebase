import firebase from 'firebase/app';
import 'firebase/storage';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: 'AIzaSyAriCwAXpvqtdE2kaeDwRfrSRyQnnQOl5c',
    authDomain: 'react-firebase-image-upl-64f10.firebaseapp.com',
    databaseURL: 'https://react-firebase-image-upl-64f10.firebaseio.com',
    projectId: 'react-firebase-image-upl-64f10',
    storageBucket: 'react-firebase-image-upl-64f10.appspot.com',
    messagingSenderId: '237901371700',
    appId: '1:237901371700:web:9f7d0391670d239abd2d61',
    measurementId: 'G-6Q97Z67T5H',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { firebase, storage as default };
