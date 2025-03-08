import React from "react";
import Filters from "./Filters"; // Filters კომპონენტი მართავს ფილტრებს

function SideBar({ setVehicleType, ...filterProps }) {
    return (
        <div className="box-side">
            {/* აირჩიეთ მანქანის ტიპი */}
            <div className="car-selector">
                <button className="car" onClick={() => setVehicleType("car")}>
                    <img src="/src/photos/car.svg" alt="მანქანა" />
                </button>
                <button className="tractor" onClick={() => setVehicleType("tractor")}>
                    <img src="/src/photos/tractor.png" alt="ტრაქტორი" />
                </button>
                <button className="bike" onClick={() => setVehicleType("moto")}>
                    <img src="/src/photos/moto.svg" alt="მოტოციკლი" />
                </button>
            </div>

            {/* ფილტრები კომპონენტი */}
            <Filters {...filterProps} />

            {/* ძებნის ღილაკი */}
            <div className="search-btn">
                <button>ძებნა</button>
            </div>
        </div>
    );
}

export default SideBar;