
import './App.css';
import Packaging from './Pages/packaging';
import Navbar from './Components/Navbar/Navbar';
import PackagingMaterials from './Pages/packagingMaterials';
import {BrowserRouter,Routes,Route} from 'react-router-dom'; 
import Home from './Pages/Home';
import AboutUs from './Pages/AboutUs';
import './styles/style.css';

import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import DeliveryForm from './screens/DeliveryForm';
import CheckoutScreen from './screens/CheckoutScreen';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        {/* <Route path='/products' element={<Packaging/>}/> */}
        <Route path='/product/:id' element={<ProductScreen />} />
        <Route path='/products' element={<HomeScreen/>}/>
        <Route path='/aboutUs' element={<AboutUs/>}/>
        <Route path='/service' element={<PackagingMaterials/>}/>
        <Route path='/delivery' element={<DeliveryForm />} />
        <Route path='/checkout' element={<CheckoutScreen />} />
        <Route path='/package' element={<Packaging />} />
      </Routes>
      <Routes>
      <Route path='/Cart' element={<CartScreen/>}/>
      <Route path='/login' element={<loginSignUp/>}/>
      </Routes>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
