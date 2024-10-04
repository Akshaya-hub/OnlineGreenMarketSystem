import './App.css';
import Packaging from './Pages/packaging';
import PackagingMaterials from './Pages/packagingMaterials';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Home from './Pages/Home';
import Signup from './Pages/Signup'; 
import VerifyOTP from './Pages/VerifyOTP'; 
import Login from './Pages/Login'; 
import Profile from './Pages/Profile'; 
import MainLayout from './MainLayout'; // Import the new layout

import AddProduct from './productManagment/AddProduct';
import ViewProduct from './productManagment/ViewProduct';
import AdminView from './productManagment/AdminView';
import Dashboard from './productManagment/Dashboard';




function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Routes that include the Navbar */}
          <Route element={<MainLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<PackagingMaterials />} />
            <Route path='/aboutUs' element={<PackagingMaterials />} />
            <Route path='/service' element={<PackagingMaterials />} />
            <Route path='/cart' element={<Packaging />} />
            <Route path='/profile' element={<Profile />} />


            <Route path='/product' element={<ViewProduct />} />
            <Route path='/add-product' element={<AddProduct />} />
            <Route path='/admin-product' element={<AdminView />} />
            <Route path='/dashboard' element={<Dashboard />} />

          </Route>

          {/* Routes without the Navbar */}
          <Route path='/signup' element={<Signup />} />
          <Route path='/verifyotp' element={<VerifyOTP />} />
          <Route path='/login' element={<Login />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
