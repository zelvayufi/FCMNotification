import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from './firebase/firebaseConfig';
import { toast, ToastContainer } from 'react-toastify';
import Message from './components/Message';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0);
  const [fcmToken, setFcmToken] = useState('');

  async function requestPermission() {
    //requesting permission using Notification API
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_APP_V_API_KEY,
      });
      setFcmToken(token);

      //We can send token to server
      console.log('Token generated : ', token);
    } else if (permission === 'denied') {
      //notifications are blocked
      alert('You denied for the notification');
    }
  }

  useEffect(() => {
    requestPermission();
  }, []);

  onMessage(messaging, (payload) => {
    toast(<Message notification={payload.notification} />);
  });

  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <p>Token: {fcmToken} :</p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
      <ToastContainer />
    </>
  );
}

export default App;
