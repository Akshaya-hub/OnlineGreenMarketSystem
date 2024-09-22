import AddMaterials from './pages/AddMaterials';
import Navbar from './Components/Navbar/Navbar';
import Materials from './pages/Materials';
import {BrowserRouter,Routes,Route} from 'react-router-dom'; 
import Order from './pages/Order';

const App = () => {
  return (
    <div>
     <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Order/>}/>
        <Route path='/addMaterials' element={<AddMaterials/>}/>
        <Route path='/materials' element={<Materials/>}/>
      </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
