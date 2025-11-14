import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import CoffeeMenu from '../components/CoffeeMenu';
import OrderForm from '../components/OrderForm';
import LocationPicker from '../components/LocationPicker';

export default function Home() {
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [currentStep, setCurrentStep] = useState('menu');

  const coffeeMenu = [
    {
      id: 1,
      name: "Espresso",
      description: "Strong and bold Italian coffee",
      price: 120,
      image: "/images/espresso.jpg"
    },
    {
      id: 2,
      name: "Cappuccino",
      description: "Espresso with steamed milk foam",
      price: 150,
      image: "/images/cappuccino.jpg"
    },
    {
      id: 3,
      name: "Latte",
      description: "Smooth coffee with lots of milk",
      price: 160,
      image: "/images/latte.jpg"
    },
    {
      id: 4,
      name: "Americano",
      description: "Espresso with hot water",
      price: 130,
      image: "/images/americano.jpg"
    }
  ];

  const handleCoffeeSelect = (coffee) => {
    setSelectedCoffee(coffee);
    setCurrentStep('location');
  };

  const handleLocationConfirm = (location) => {
    setUserLocation(location);
    setCurrentStep('order');
  };

  const handleOrderComplete = () => {
    setSelectedCoffee(null);
    setUserLocation(null);
    setCurrentStep('menu');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100">
      <Head>
        <title>Coffee Delivery - Order Your Favorite Brew</title>
        <meta name="description" content="Order coffee delivery via GCash or Cash on Delivery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {currentStep === 'menu' && (
          <CoffeeMenu 
            coffees={coffeeMenu} 
            onSelectCoffee={handleCoffeeSelect}
          />
        )}

        {currentStep === 'location' && (
          <LocationPicker 
            onLocationConfirm={handleLocationConfirm}
            onBack={() => setCurrentStep('menu')}
          />
        )}

        {currentStep === 'order' && (
          <OrderForm 
            coffee={selectedCoffee}
            location={userLocation}
            onOrderComplete={handleOrderComplete}
            onBack={() => setCurrentStep('location')}
          />
        )}
      </main>
    </div>
  );
}