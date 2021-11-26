import {useState, useEffect} from 'react';
import '../styles/globals.css'
const io = require("socket.io-client");
let socket;

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);
  useEffect(()=>{
    socket = io("http://localhost:5000");
    setMounted(true);
  }, []);
  return <Component {...pageProps} socket={socket}/>
}

export default MyApp
