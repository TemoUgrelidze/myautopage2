import React, { useState } from "react";
import Filters from "./Filters.jsx";

// Receive saleType and setSaleType from App.jsx
function SideBar({
                     setVehicleType,
                     onSearch,
                     saleType,
                     setSaleType,
                     vehicleType,
                     ...filterProps
                 }) {
    const [customsStatus, setCustomsStatus] = useState("all"); // "all", "cleared", "notCleared"

    const handleSearch = () => {
        // Pass the customs status to the search function
        onSearch(customsStatus);
    };

    return (
        <div>
            {/* Logo Container (if you have one outside box-side) */}
            {/* <div className="top-container"> ... </div> */}

            <div className="box-side">

                {/* Deal Type Toggle Switch */}
                <div className="deal-type-toggle">
                    <button
                        className={`deal-type-btn ${saleType === "1" || saleType === "" ? "active" : ""}`} // Default to "For Sale"
                        onClick={() => setSaleType("1")} // "1" for For Sale
                    >
                        იყიდება
                    </button>
                    <button
                        className={`deal-type-btn ${saleType === "2" ? "active" : ""}`}
                        onClick={() => setSaleType("2")} // "2" for For Rent
                    >
                        ქირავდება
                    </button>
                </div>

                <div className="sidebar-content">
                    <div className="car-selector">
                        {/* Car type buttons - Use vehicleType prop for active state */}
                        <button className={`car ${vehicleType === "car" ? "active" : ""}`} onClick={() => setVehicleType("car")}>
                            <img src="/src/photos/car.svg" alt="მანქანა" />
                            <span className="vehicle-label">ავტომობილი</span>
                        </button>
                        <button className={`tractor ${vehicleType === "tractor" ? "active" : ""}`} onClick={() => setVehicleType("tractor")}>
                            <img src="/src/photos/tractor.png" alt="ტრაქტორი" />
                            <span className="vehicle-label">ტრაქტორი</span>
                        </button>
                        <button className={`bike ${vehicleType === "moto" ? "active" : ""}`} onClick={() => setVehicleType("moto")}>
                            <img src="/src/photos/moto.svg" alt="მოტოციკლი" />
                            <span className="vehicle-label">მოტოციკლი</span>
                        </button>
                    </div>

                    <div className="filters-wrapper">
                        {/* Pass filterProps (which now excludes saleType/setSaleType) */}
                        <Filters {...filterProps} vehicleType={vehicleType} />
                    </div>
                </div>

                {/* Action Buttons (Customs Toggle & Search) */}
                <div className="action-buttons">
                    <div className="customs-toggle">
                        <div className="customs-toggle-container">
                            <button
                                className={`customs-toggle-btn ${customsStatus === "cleared" ? "active" : ""}`}
                                onClick={() => setCustomsStatus("cleared")}
                            >
                                განბაჟებული
                            </button>
                            <button
                                className={`customs-toggle-btn ${customsStatus === "notCleared" ? "active" : ""}`}
                                onClick={() => setCustomsStatus("notCleared")}
                            >
                                განუბაჟებელი
                            </button>
                        </div>
                    </div>
                    <div className="search-btn">
                        <button onClick={handleSearch}>ძებნა</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBar;
