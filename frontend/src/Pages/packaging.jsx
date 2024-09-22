
// export default Packaging;
import React, { useState, useEffect } from 'react';
import PackagingMaterials from './packagingMaterials';
import pattern1 from '../Components/assets/pattern1.png'
import pattern2 from '../Components/assets/pattern2.png'
import pattern3 from '../Components/assets/pattern3.jpg'
import pattern4 from '../Components/assets/pattern4.png'
import arrow from '../Components/assets/1.png';

const Packaging = () => {
    const [products, setProducts] = useState([]);

    const fetchInfo = async ()=>{
      await fetch('http://localhost:4000/api/cartdatas')
      .then((res)=>res.json())
      .then((data)=>{setProducts(data)})
    }
  
    useEffect(()=>{
      fetchInfo();
    },[])
    
    const AddOrders = () => {
        const [formData, setFormData] = useState({
          o_id:'',
          pro_id:'',
          quantity: '',
          material: '',
          internalMeasurement: '',
          customWrap: '',
          customNote: '',
          deliverDate: '',
          status: ''
        });
    }


    const handlePackagingOptionChange = (productId, option) => {
        const updatedProducts = products.map(product =>
            product.id === productId ? { ...product, packagingOption: option } : product
        );
        setProducts(updatedProducts);
    };

    const handleCustomColorChange = (productId, color) => {
        const updatedProducts = products.map(product =>
            product.id === productId ? { ...product, customColor: color } : product
        );
        setProducts(updatedProducts);
    };

    const handlePatternChange = (productId, pattern) => {
        const updatedProducts = products.map(product =>
            product.id === productId ? { ...product, pattern: pattern } : product
        );
        setProducts(updatedProducts);
    };

    const handleNoteChange = (productId, note) => {
        const updatedProducts = products.map(product =>
            product.id === productId ? { ...product, note } : product
        );
        setProducts(updatedProducts);
    };
 
    return (
        <div >
            <div className='back'>
            <img src={arrow} alt="arrow" className="arrow" />
            <h2>Packaging</h2></div>
            
            {/* <img src={arrow} alt='pattern' className='arrow'/> */}
            <div className="packaging">
                {products.map(product => (
                    <div key={product.id} className="productpack">
                        <img src={product.image} alt={product.name} className="productpack-image" />
                        <div className="productpack-details">
                            <h3>{product.name}</h3>
                            <p>Weight = {product.weight}</p>
                            <p>Quantity = {product.quantity}</p>
                        </div>
    
                        <div className="selection">
                            <label>Packaging Option</label>
                            <select
                                value={product.packagingOption}
                                onChange={(e) => handlePackagingOptionChange(product.id, e.target.value)}
                            >
                                <option value="Kraft Paper Box">Kraft Paper Box</option>
                                <option value="Square Bottom Paper Bag">Square Bottom Paper Bag</option>
                                <option value="Top Visible Corrugated Box">Top Visible Corrugated Box</option>
                                <option value="Cylindrical Paper Tube Box">Cylindrical Paper Tube Box</option>
                                <option value="Card Board Box">Card Board Box</option>
                            </select>
    
                            <div className="note-section">
                                <label>Note To Add In The Package</label>
                                <input 
                                    type="text" 
                                    placeholder="Note" 
                                    value={product.note} 
                                    onChange={(e) => handleNoteChange(product.id, e.target.value)} 
                                />
                            </div>
                        </div>
    
                        <div className="button-group">
                            <label>Custom Color</label>
                            <input 
                                type="color" 
                                value={product.customColor} 
                                onChange={(e) => handleCustomColorChange(product.id, e.target.value)}
                            />
    
                            <div className="pattern-options">
                                <label>Select Pattern</label>
                                <br/>
                                <label>
                                    <input 
                                        type="radio" 
                                        name={`pattern-${product.id}`} 
                                        value="pattern1"
                                        checked={product.selectedPattern === 'pattern1'}
                                        onChange={() => handlePatternChange(product.id, 'pattern1')}
                                    />
                                    <img src={pattern1} alt="Pattern 1" className="pattern-image" />
                                </label>
                                <label>
                                    <input 
                                        type="radio" 
                                        name={`pattern-${product.id}`} 
                                        value="pattern2"
                                        checked={product.selectedPattern === 'pattern2'}
                                        onChange={() => handlePatternChange(product.id, 'pattern2')}
                                    />
                                    <img src={pattern2} alt="Pattern 2" className="pattern-image" />
                                </label>
                                <label>
                                    <input 
                                        type="radio" 
                                        name={`pattern-${product.id}`} 
                                        value="pattern3"
                                        checked={product.selectedPattern === 'pattern3'}
                                        onChange={() => handlePatternChange(product.id, 'pattern3')}
                                    />
                                    <img src={pattern3} alt="Pattern 3" className="pattern-image" />
                                </label>
                                <label>
                                    <input 
                                        type="radio" 
                                        name={`pattern-${product.id}`} 
                                        value="pattern4"
                                        checked={product.selectedPattern === 'pattern4'}
                                        onChange={() => handlePatternChange(product.id, 'pattern4')}
                                    />
                                    <img src={pattern4} alt="Pattern 4" className="pattern-image" />
                                </label>
                            </div>
                            <button className='submit'>Submit</button>
                        </div>
                        
                    </div>
                ))}
            </div>
    
            <div>
                <PackagingMaterials />
            </div>
        </div>
    );
    
};

export default Packaging;
