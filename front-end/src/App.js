import './App.css';
import { io } from 'socket.io-client';

const socket = io.connect("http://localhost:8080");

function App() {
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
