// Main.jsx
import React, { useEffect, useState } from "react";
import { fetchCarListings, fetchManufacturers } from "./api.jsx";

const Main = ({    searchResults, isSearched }) => {
    const [cars, setCars] = useState([]);
    const [manufacturers, setManufacturers] = useState([]);
    const [loading, setLoading] = useState(true);

    const categoryMapping = {
        "1": "სედანი",
        "2": "კუპე",
        "3": "ჯიპი",
        "4": "უნივერსალი",
    };

    useEffect(() => {
        let ignore = false;

        const loadData = async () => {
            setLoading(true);
            try {
                const [carData, manufacturerData] = await Promise.all([
                    fetchCarListings(),
                    fetchManufacturers()
                ]);

                if (!ignore) {
                    setCars(carData || []);
                    setManufacturers(manufacturerData || []);
                }
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };

        loadData();
        return () => {
            ignore = true;
        };
    }, []);

    const getCarName = React.useCallback((manId) => {
        const manufacturer = manufacturers.find((man) => man.man_id === manId);
        return manufacturer ? manufacturer.man_name : "Unknown Manufacturer";
    }, [manufacturers]);

    const CarCard = React.memo(({ car }) => (
        <div className="car-card">
            <div className="car-image-container">
                <img
                    src={`https://static.my.ge/myauto/photos/${car.photo}/thumbs/${car.car_id}_1.jpg?v=${car.photo_ver}`}
                    alt={`${getCarName(car.man_id)} ${car.car_model}`}
                    className="car-image"
                    loading="lazy"
                    onError={(e) => {
                        e.target.src = '/path/to/fallback/image.jpg'; // დაამატეთ fallback სურათი
                        e.target.onerror = null;
                    }}
                />
            </div>
            <div className="car-info">
                <h2 className="car-title">
                    {getCarName(car.man_id)} {car.car_model}{" "}
                    <span className="car-year">{car.prod_year} წ</span>
                </h2>
                <p className="car-category">
                    კატეგორია: {categoryMapping[car.category_id] || "არ არის მითითებული"}
                </p>
                <p className="car-details">
                    <span className="engine">🚗 {car.engine_volume} {car.fuel_type}</span>
                    <span className="gear">⚙ {car.gear_type}</span>
                    <span className="mileage">📍 {car.car_run_km} კმ</span>
                </p>
                <div className="car-price-section">
                    <span className="car-price">{car.price.toLocaleString()} ₾</span>
                    {car.price_usd && (
                        <span className="car-price-usd">
                            (~{car.price_usd.toLocaleString()} $)
                        </span>
                    )}
                </div>
                {car.for_rent === "1" && (
                    <span className="rental-badge">ქირავდება</span>
                )}
            </div>
        </div>
    ));

    const displayCars = isSearched ? searchResults : cars;

    if (loading) {
        return (
            <div className="loading-container">
                <p className="loading-text">იტვირთება...</p>
            </div>
        );
    }

    return (
        <div className="main-container">
            {displayCars && displayCars.length > 0 ? (
                <>
                    <div className="results-count">
                        ნაპოვნია: {displayCars.length} განცხადება
                    </div>
                    <div className="cars-grid">
                        {displayCars.map((car) => (
                            <CarCard
                                key={car.car_id || car.id}
                                car={car}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <div className="no-results-container">
                    <p className="no-results">
                        {isSearched
                            ? "🔍 არჩეული პარამეტრებით მანქანა ვერ მოიძებნა"
                            : "🚗 მანქანები არ მოიძებნა"}
                    </p>
                </div>
            )}
        </div>
    );
};

export default React.memo(Main);
