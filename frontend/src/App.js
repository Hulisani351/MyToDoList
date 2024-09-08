import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashBoard from './pages/DashBoard';
import Register from './pages/Register';
import Login from './pages/Login';


function App() {
  const [token, setToken] = useState('');
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/DashBoard" element={<DashBoard />} />
          <Route path="/" element={<Register />} />
          <Route path="/Login" element={<Login setToken={setToken} />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
