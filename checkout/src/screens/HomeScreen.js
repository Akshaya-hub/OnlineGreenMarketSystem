// src/screens/HomeScreen.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/slice/productsSlice';
import { getAllProducts, getLoading } from '../features/slice/productsSlice';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const products = useSelector(getAllProducts);
    const loading = useSelector(getLoading);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div className="homescreen">
            {loading ? (
                <h2>Loading...</h2>
            ) : (
                <div className="homescreen-products">
                    {products.map(product => (
                        <div key={product._id} className="product-item">
                            <img src={product.image} alt={product.name} className='product-image' />
                            <h3>{product.name}</h3>
                            <p>{product.description.substring(0, 100)}...</p>
                            <p>${product.price}</p>
                            <Link to={`/product/${product._id}`} className='info-button'>
                                View Product
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomeScreen;
