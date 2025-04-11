import React, { useState } from "react";
import Filters from "./Filters.jsx";

function SideBar({ setVehicleType, onSearch, ...filterProps }) {
    const [customsStatus, setCustomsStatus] = useState("all"); // "all", "cleared", "notCleared"

    const handleSearch = () => {
        // Pass the customs status to the search function
        onSearch(customsStatus);
    };

    return (
        <div>
            {/* New, long container for the logo and other content */}
            <div className="top-container">
                <div className="logo-container">
                    <img
                        src="/images/myauto-logo.svg"
                        alt="MyAuto.ge"
                        className="myauto-logo"
                    />
                </div>
                {/* You can add more content here */}
            </div>

            <div className="box-side">
                <div className="sidebar-content">
                    <div className="car-selector">
                        <button className="car" onClick={() => setVehicleType("car")}>
                            <img src="/src/photos/car.svg" alt="მანქანა" />
                            <span className="vehicle-label">ავტომობილი</span>
                        </button>
                        <button className="tractor" onClick={() => setVehicleType("tractor")}>
                            <img src="/src/photos/tractor.png" alt="ტრაქტორი" />
                            <span className="vehicle-label">ტრაქტორი</span>
                        </button>
                        <button className="bike" onClick={() => setVehicleType("moto")}>
                            <img src="/src/photos/moto.svg" alt="მოტოციკლი" />
                            <span className="vehicle-label">მოტოციკლი</span>
                        </button>
                    </div>

                    <div className="filters-wrapper">
                        <Filters {...filterProps} />
                    </div>
                </div>

                <div className="action-buttons">
                    {/* Customs Toggle */}
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

                    {/* Search Button */}
                    <div className="search-btn">
                        <button onClick={handleSearch}>ძებნა</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBar;
