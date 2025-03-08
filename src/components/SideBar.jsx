// SideBar.jsx
import React from "react";
import Filters from "./Filters";

function SideBar({ setVehicleType, onSearch, ...filterProps }) {
    return (
        <div className="box-side">
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

            <Filters {...filterProps} />

            <div className="search-btn">
                <button onClick={onSearch}>ძებნა</button>
            </div>
        </div>
    );
}

export default SideBar;
