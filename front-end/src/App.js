import { createContext, useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const socket = io.connect("http://localhost:8080");

export const AppContext = createContext();
export const apiUrl = "http://localhost:8080/api";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <AppContext.Provider value={{ socket, setIsLogged, username, setUsername }}>
      {!isLogged? <Login />:<Dashboard />}
    </AppContext.Provider>
  );
}

export default App;
