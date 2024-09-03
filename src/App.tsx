import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import UserPage from './components/UserPage';
import Overview from './components/Overview';
import CompanyPage from './components/CompanyPage';
import Create from './components/Create';
import Team from './components/Team'
import Financial from './components/Financial';
import Planning from './components/Planning'
import Sales from './components/Sales'
import Efficiency from './components/Efficiency'
import Risk from './components/Risk'
import Market from './components/Market'
import LandPage from './components/LandPage'
import NavBar from './components/NavBar'



const App = () => {

  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="main-container">
      {!isLoginPage && <NavBar />}
      <AppContent />
    </div>
  );
};

const AppContent = () => {
 return (
  <>
    <Routes>
      <Route path="/" element={<LandPage />} />
      <Route path="/dashboard" element={<Overview />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create" element={<Create />} />
      <Route path="/user/:userid/:username" element={<UserPage/>} />
      <Route path="company/:companyid/:companyname" element={<CompanyPage/>}/>
      <Route path="team/:companyid/:companyname" element={<Team/>}/>
      <Route path="finance/:companyid/:companyname" element={<Financial/>}/>
      <Route path="planning/:companyid/:companyname" element={<Planning />}/>
      <Route path="sales/:companyid/:companyname" element={<Sales/>}/>
      <Route path="efficiency/:companyid/:companyname" element={<Efficiency/>}/>
      <Route path="risk/:companyid/:companyname" element={<Risk/>}/>
      <Route path="market/:companyid/:companyname" element={<Market/>}/>
    </Routes>
  </>
 );
};

export default App;