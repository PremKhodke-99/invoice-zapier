import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Invoices from './components/DueInvoices/DueInvoices';
// import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/invoices' element={<Invoices />} />
    </Routes>
  );
}

export default App;
