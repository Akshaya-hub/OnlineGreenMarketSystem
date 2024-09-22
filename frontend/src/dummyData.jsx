import dryfishImage from './Components/assets/dryfish.jpg';

const products = [
    {
        _id: '1',
        name: 'Product 1',
        description: 'Description 1',
        price: 100,
        countInStock: 10,
        imageUrl: dryfishImage,
        discount: 10 // Discount in percentage
    },
    {
        _id: '2',
        name: 'Product 2',
        description: 'Description 2',
        price: 150,
        countInStock: 5,
        imageUrl: dryfishImage,
        discount: 15 // Discount in percentage
    },
    {
        _id: '3',
        name: 'Product 3',
        description: 'Description 3',
        price: 200,
        countInStock: 8,
        imageUrl: dryfishImage,
        discount: 20 // Discount in percentage
    },
    {
        _id: '4',
        name: 'Product 4',
        description: 'Description 4',
        price: 250,
        countInStock: 3,
        imageUrl: dryfishImage,
        discount: 5 // Discount in percentage
    },
    {
        _id: '5',
        name: 'Product 5',
        description: 'Description 5',
        price: 300,
        countInStock: 12,
        imageUrl: dryfishImage,
        discount: 25 // Discount in percentage
    }
];

export default products;
