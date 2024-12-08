import './App.css'
import Home from './components/Home'
import Header from './components/Header'
import taskContext from '../utils/taskContext'
import { useState } from 'react';
import filterContext from '../utils/filterContext'
import { Outlet } from 'react-router-dom';

function App() {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  return (
    <taskContext.Provider value={{tasks,setTasks}}>
      <filterContext.Provider value={{status,setStatus,priority,setPriority}}>
        <Header/>
        <Outlet/>
      </filterContext.Provider>
    </taskContext.Provider>
  )
}

export default App
