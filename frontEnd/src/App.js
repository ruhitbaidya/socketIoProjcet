import {useEffect, useState} from "react"
import io from "socket.io-client"
import './App.css';


const socket = io.connect("http://localhost:5000")

function App() {
  const [message, setmessage] = useState('');
  const [chats, setChants] = useState([]);
  const handelSubmit = (e)=>{
    e.preventDefault();
    socket.emit("message", {message})
    setmessage("")
    
  }
  useEffect(()=>{
    socket.on("chat", (msgs)=>{
      setChants([...chats, msgs])
    })
  }, [chats])
  return (
    <div className="App">
      <header className="App-header">
        <h1>Live Chat App</h1>
        <div>
          {chats.map((data, index)=> <p key={index}>{data.message}</p>)}
        </div>
        <form onSubmit={handelSubmit}>
          <input value={message} name="chats" placeholder="Write Message" onChange={(e)=>{
            setmessage(e.target.value)
          }}/>
          <button>Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
