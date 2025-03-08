import React, { useEffect, useState } from "react";
import "../App.css";
import { fetchCarListings, fetchManufacturers } from "./api.jsx";

const Main = ({ selectedManufacturer, selectedModel }) => {
    const [cars, setCars] = useState([]);
    const [manufacturers, setManufacturers] = useState([]);
    const [loading, setLoading] = useState(true);

    // გამოვიყენოთ useEffect cleanup ფუნქცია race condition-ების თავიდან ასაცილებლად
    useEffect(() => {
        let ignore = false;

        const loadData = async () => {
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
                console.error("მონაცემების ჩატვირთვის შეცდომა:", error);
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

    // მწარმოებლის სახელის მოძიება ID-ით (მემოიზაცია)
    const getCarName = React.useCallback((manId) => {
        const manufacturer = manufacturers.find((man) => man.man_id === manId);
        return manufacturer ? manufacturer.man_name : "";
    }, [manufacturers]);

    // ფილტრაცია (მემოიზაცია)
    const filteredCars = React.useMemo(() =>
            cars.filter(car =>
                (!selectedManufacturer || car.man_id === Number(selectedManufacturer)) &&
                (!selectedModel || car.model_id === Number(selectedModel))
            ),
        [cars, selectedManufacturer, selectedModel]
    );

    // CarCard კომპონენტის გამოტანა ცალკე
    const CarCard = React.memo(({ car }) => (
        <div className="car-card">
            <div className="car-image-container">
                <img
                    src={`https://static.my.ge/myauto/photos/${car.photo}/thumbs/${car.car_id}_1.jpg?v=${car.photo_ver}`}
                    alt={`${getCarName(car.man_id)} ${car.car_model}`}
                    className="car-image"
                    loading="lazy" // ლეიზი ლოადინგი სურათებისთვის
                />
            </div>
            <div className="car-info">
                <h2 className="car-title">
                    {getCarName(car.man_id)} {car.car_model}{" "}
                    <span className="car-year">{car.prod_year} წ</span>
                </h2>
                <p className="car-details">
                    🚗 {car.engine_volume} ბენზინი • ⚙ {car.gear_type} • 📍 {car.car_run_km} კმ
                </p>
                <div className="car-price-section">
                    <span className="car-price">{car.price} ₾</span>
                    {car.price_usd && <span className="car-price-usd"> (~{car.price_usd} $)</span>}
                </div>
            </div>
        </div>
    ));

    return (
        <div className="container">
            {loading ? (
                <p className="loading-text">იტვირთება...</p>
            ) : filteredCars.length > 0 ? (
                <div className="grid">
                    {filteredCars.map((car) => (
                        <CarCard
                            key={car.car_id || car.id}
                            car={car}
                        />
                    ))}
                </div>
            ) : (
                <p className="no-results">🚗 ავტომობილები არ მოიძებნა</p>
            )}
        </div>
    );
};

export default React.memo(Main);
