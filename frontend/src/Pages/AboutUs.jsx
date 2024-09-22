import React from 'react';
import './AboutUs.css'; // Import your CSS file for styling

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <p>
        <strong>Green Mart</strong> is your go-to marketplace for sustainable, organic products. 
        We believe in providing eco-friendly, natural, and ethical products to help you live a 
        healthier life and contribute to a greener planet.
      </p>
      
      <section>
        <h2>Our Mission</h2>
        <p>
          At Green Mart, we aim to make sustainable living accessible, affordable, and convenient. 
          We believe that small changes can lead to a big impact on the environment, and we’re here 
          to help you make those changes seamlessly.
        </p>
        <p>Our values include:</p>
        <ul>
          <li><strong>Sustainability:</strong> Promoting products that are kind to the earth.</li>
          <li><strong>Health:</strong> Providing the best organic and healthy food options.</li>
          <li><strong>Community:</strong> Supporting local producers and eco-conscious brands.</li>
        </ul>
      </section>

      <section>
        <h2>Why Choose Us?</h2>
        <ul>
          <li><strong>Certified Organic Products:</strong> All of our products are carefully curated and meet the highest organic standards.</li>
          <li><strong>Eco-Friendly Packaging:</strong> We prioritize biodegradable and recyclable packaging materials to reduce environmental impact.</li>
          <li><strong>Support for Local Farmers:</strong> By shopping with us, you're helping local farmers and artisans grow sustainably.</li>
        </ul>
      </section>

      <section>
        <h2>Join Us on the Journey!</h2>
        <p>
          By choosing Green Mart, you're not only taking a step towards better health 
          but also contributing to a sustainable future for generations to come.
        </p>
        <p><strong>Let’s make the world greener, one product at a time!</strong></p>
      </section>
    </div>
  );
};

export default AboutUs;
