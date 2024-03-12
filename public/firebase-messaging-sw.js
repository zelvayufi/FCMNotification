// Service Worker
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js'
);

const firebaseConfig = {
  apiKey: '<>',
  authDomain: '<>',
  projectId: '<>',
  storageBucket: '<>',
  messagingSenderId: '<>',
  appId: '<>',
  measurementId: '<>',
};

// // Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: notificationTitle,
    icon: '<>',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
