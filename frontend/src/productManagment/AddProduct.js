import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AddProduct = () => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [category, setCategory] = useState('Dry Products');
    const [description, setDescription] = useState('');
    const [expDate, setExpDate] = useState('');
    const [manufactureDate, setManufactureDate] = useState('');

    // Validation state
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    // Validate form fields
    const validateForm = () => {
        let errors = {};
        const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

        if (!name.trim()) errors.name = "Product name is required";
        if (!description.trim()) errors.description = "Product description is required";
        if (!quantity || quantity <= 0) errors.quantity = "Quantity must be a positive number";
        if (!price || price <= 0) errors.price = "Price must be a positive number";
        if (!file) errors.file = "Please upload an image";
        if (!manufactureDate) errors.manufactureDate = "Manufacture date is required";
        if (!expDate) errors.expDate = "Expiration date is required";

        // Date validations
        if (manufactureDate > today) errors.manufactureDate = "Manufacture date cannot be after the current date";
        if (expDate < today) errors.expDate = "Expiration date cannot be before the current date";
        if (expDate < manufactureDate) errors.expDate = "Expiration date cannot be before the manufacture date";

        if (discount && (isNaN(discount) || discount < 0 || discount > 100)) errors.discount = "Discount must be a number between 0 and 100";

        setErrors(errors);
        return Object.keys(errors).length === 0; // Returns true if no errors
    };

    // Handle form submission
    const handleUpload = () => {
        if (!validateForm()) return; // If the form is invalid, stop submission

        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('quantity', quantity);
        formData.append('price', price);
        formData.append('discount', discount);
        formData.append('category', category);
        formData.append('expDate', expDate);
        formData.append('manufactureDate', manufactureDate);

        axios.post('http://localhost:3000/api/products/upload', formData)
            .then(res => {
                console.log('Upload response:', res.data);
                navigate('/admin-product');
                window.location.reload();
            })
            .catch(err => console.log(err));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        // Display the selected image immediately
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
    };

    const Header = () => {
        return (
            <div className="bg-green-800 text-white p-4 flex justify-center items-center shadow-md">
                <div className="flex space-x-6">
                    <Link to='/view-product' className="hover:text-green-300 transition-colors duration-300">Home</Link>
                    <Link to='/add-product' className="hover:text-green-300 transition-colors duration-300">Add Product</Link>
                    <Link to='/admin-product' className="hover:text-green-300 transition-colors duration-300">Manage Product</Link>
                    <Link to='/dashboard' className="hover:text-green-300 transition-colors duration-300">Dashboard</Link>
                </div>
            </div>
        );
    };

    return (

        <div>
                    <Header />{Header}
        <div className="bg-green-50 min-h-screen">
            <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg border border-green-200">
                <h2 className="text-3xl font-bold mb-6 text-center text-green-800">Add New Product</h2>

                <div className="space-y-8">
                    {/* General Information */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold mb-4 text-green-700">General Information</h3>
                        <input 
                            type="text" 
                            placeholder="Product Name" 
                            value={name} 
                            onChange={e => setName(e.target.value)} 
                            className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {errors.name && <p className="text-red-600">{errors.name}</p>}

                        <textarea
                            placeholder="Product Description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        ></textarea>
                        {errors.description && <p className="text-red-600">{errors.description}</p>}

                        <select
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="Dry Products">Dry Products</option>
                            <option value="Seafood">Seafood</option>
                            <option value="Handmade Eatable">Handmade Eatable</option>
                            <option value="Beverages">Beverages</option>
                            <option value="Dairy Products">Dairy Products</option>
                            <option value="Snacks">Snacks</option>
                        </select>
                    </div>

                    {/* Pricing and Stock */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold mb-4 text-green-700">Pricing and Stock</h3>
                        <input 
                            type="text" 
                            placeholder="Base Price" 
                            value={price} 
                            onChange={e => setPrice(e.target.value)} 
                            className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {errors.price && <p className="text-red-600">{errors.price}</p>}

                        <input 
                            type="number" 
                            placeholder="Stock" 
                            value={quantity} 
                            onChange={e => setQuantity(e.target.value)} 
                            className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {errors.quantity && <p className="text-red-600">{errors.quantity}</p>}
                    </div>

                    {/* Date Inputs */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold mb-4 text-green-700">Manufacture and Expiration Dates</h3>
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-lg font-semibold text-green-600">Manufacture Date</h4>
                                <input
                                    type="date"
                                    value={manufactureDate}
                                    onChange={e => setManufactureDate(e.target.value)}
                                    className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                {errors.manufactureDate && <p className="text-red-600">{errors.manufactureDate}</p>}
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold text-green-600">Expiration Date</h4>
                                <input
                                    type="date"
                                    value={expDate}
                                    onChange={e => setExpDate(e.target.value)}
                                    className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                {errors.expDate && <p className="text-red-600">{errors.expDate}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Image Upload and Discount */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold mb-4 text-green-700">Product Image
                        </h3>
                        <label
                            htmlFor="file-upload"
                            className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                        >
                            Choose File
                        </label>
                        <input 
                            id="file-upload"
                            type="file" 
                            onChange={handleFileChange} 
                            className="hidden"
                        />
                        <div className="mt-4">
                            <div className="w-full h-64 bg-gray-100 border border-green-300 rounded-lg flex items-center justify-center">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Uploaded Preview"
                                        className="max-h-full max-w-full object-contain rounded-lg"
                                    />
                                ) : (
                                    <span className="text-gray-500">Add Image</span>
                                )}
                            </div>
                            {errors.file && <p className="text-red-600">{errors.file}</p>}
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-2 text-green-600">Discount Percentage</h4>
                            <input
                                type="text"
                                placeholder="Enter discount percentage"
                                value={discount}
                                onChange={e => setDiscount(e.target.value)}
                                className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            {errors.discount && <p className="text-red-600">{errors.discount}</p>}
                        </div>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <button
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                        onClick={handleUpload}
                    >
                        Upload Product
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default AddProduct;
