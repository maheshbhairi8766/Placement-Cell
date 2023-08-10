import logo from './logo.svg';
import './App.css';
import Navbr from './components/Navbr';
import Footr from './components/Footr';
import Home from './screens/Home';
import Crousel from './components/Crousel';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin'
import AdminSignup from './components/AdminSignup'
import {
  BrowserRouter as Router,
  
  Route,
  Link,
  Routes
} from "react-router-dom";
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import DisplayApplied from './components/DisplayApplied';
function App()
{
  return (
    <Router>
    <div>
      <Navbr/>
      <Routes>
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/signup' element={<SignUp/>} />
        <Route exact path='/displaydata' element={<DisplayApplied/>} />
        <Route exact path='/profile' element={<Profile/>} />
        <Route exact path='/adminsignup' element={<AdminSignup/>} />
        <Route exact path='/adminlogin' element={<AdminLogin/>} />
      </Routes>
      
    </div>
    </Router>
  ); 
}

export default App;
