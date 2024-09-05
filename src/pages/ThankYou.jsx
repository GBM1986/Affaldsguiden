
import React from 'react';
import { Link } from 'react-router-dom';

export const ThankYou = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-lightGreen">
      <h1 className="text-3xl font-bold mb-4">Tak for din bestilling!</h1>
      <p className="text-lg mb-6">Vi har modtaget din bestilling, og du vil snart modtage en bekræftelse via email.</p>
      <Link to="/" className="bg-deepGreen text-white py-2 px-6 rounded hover:bg-forrestGreen">
        Tilbage til forsiden
      </Link>
    </div>
  );
};
