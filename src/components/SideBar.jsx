import React from "react";
import Filters from "./Filters"; // Filters component will handle the actual filters

function SideBar({ setVehicleType, ...filterProps }) {
    return (
        <div className="box-side">
            {/* Select Vehicle Type */}
            <div className="car-selector">
                <button className="car" onClick={() => setVehicleType("car")}>
                    <img src="\src\photos\car.svg" alt="Car" />
                </button>
                <button className="tractor" onClick={() => setVehicleType("tractor")}>
                    <img src="\src\photos\tractor.png" alt="Tractor" />
                </button>
                <button className="bike" onClick={() => setVehicleType("moto")}>
                    <img src="\src\photos\moto.svg" alt="Motorcycle" />
                </button>
            </div>

            {/* Filters Component */}
            <Filters {...filterProps} />

            {/* Search Button */}
            <div className="search-btn">
                <button>ძებნა</button>
            </div>
        </div>
    );
}

export default SideBar;