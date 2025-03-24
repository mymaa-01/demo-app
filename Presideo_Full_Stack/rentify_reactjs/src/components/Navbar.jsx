import React from 'react';
import { Button } from "primereact/button";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <div className="bg-gray-800">
      <div className="h-6rem px-5 flex align-items-center justify-content-between ">
        <h2 className="text-white font-bold">Rentify - Where renting meets simplicity!</h2>
        <div>
        <Button
          className="font-semibold px-4 border-3"
          label="Login"
          onClick={() => navigate("/Login")}
        />
      </div> 
      </div>
    </div>
  )
}

export default Navbar