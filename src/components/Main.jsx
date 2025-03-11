import React, { useEffect, useState } from "react";
import { fetchCarListings, fetchManufacturers } from "./api.jsx";
import SortDropdown from './SortDropdown';
import PeriodFilter from './PeriodFilter';
import { FaHeart, FaEye, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';


const Main = ({ searchResults, isSearched }) => {
    const [cars, setCars] = useState([]);
    const [manufacturers, setManufacturers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortedCars, setSortedCars] = useState([]);
    const [, setSelectedPeriod] = useState(null);
    const [manufacturerData, setManufacturerData] = useState({});
    const [currency, setCurrency] = useState(() => {
        return localStorage.getItem('preferredCurrency') || 'GEL';
    });
    const exchangeRate = 2.65;

    const categoryMapping = {
        "1": "სედანი", "2": "კუპე", "3": "ჯიპი",
        "4": "უნივერსალი", "5": "ჰეჩბექი", "6": "მინივენი",
        "7": "მიკროავტობუსი", "8": "პიკაპი",
        "9": "კაბრიოლეტი", "10": "ფურგონი"
    };

    const transmissionTypes = {
        "1": "მექანიკა",
        "2": "ავტომატიკა",
        "3": "ტიპტრონიკი",
        "4": "ვარიატორი"
    };

    const fuelTypes = {
        "2": "ბენზინი",
        "3": "დიზელი",
        "4": "ელექტრო",
        "5": "ჰიბრიდი",
        "6": "ბუნებრივი გაზი",
        "7": "თხევადი გაზი",
        "8": "წყალბადი",
        "9": "პლაგინ ჰიბრიდი"
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
                    setSortedCars(carData || []);
                    setManufacturers(manufacturerData || []);
                }
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                if (!ignore) setLoading(false);
            }
        };
        loadData();
        return () => { ignore = true; };
    }, []);

    useEffect(() => {
        const processManufacturers = () => {
            const manData = {};
            manufacturers.forEach(manufacturer => {
                if (!manufacturer?.man_id) return;
                const models = Array.isArray(manufacturer.models) ? manufacturer.models : [];
                manData[manufacturer.man_id] = {
                    name: manufacturer.man_name || 'Unknown Manufacturer',
                    models: models.reduce((acc, model) => {
                        if (model?.model_id && model?.model_name) {
                            acc[model.model_id] = model.model_name;
                        }
                        return acc;
                    }, {})
                };
            });
            setManufacturerData(manData);
        };
        if (manufacturers?.length > 0) processManufacturers();
    }, [manufacturers]);

    useEffect(() => {
        setSortedCars(isSearched ? searchResults : cars);
        setSelectedPeriod(null);
    }, [searchResults, cars, isSearched]);

    const handleCurrencyChange = (newCurrency) => {
        setCurrency(newCurrency);
        localStorage.setItem('preferredCurrency', newCurrency);
    };

    const handleSort = ({ field, order }) => {
        const sorted = [...sortedCars].sort((a, b) => {
            let compareA, compareB;
            switch(field) {
                case 'date':
                    compareA = new Date(a.car_date || 0).getTime();
                    compareB = new Date(b.car_date || 0).getTime();
                    break;
                case 'price':
                    compareA = currency === 'GEL'
                        ? (parseFloat(a.price_usd || 0) * exchangeRate)
                        : parseFloat(a.price_usd || 0);
                    compareB = currency === 'GEL'
                        ? (parseFloat(b.price_usd || 0) * exchangeRate)
                        : parseFloat(b.price_usd || 0);
                    break;
                case 'mileage':
                    compareA = parseInt(a.car_run_km) || 0;
                    compareB = parseInt(b.car_run_km) || 0;
                    break;
                default:
                    return 0;
            }
            return order === 'desc' ? compareB - compareA : compareA - compareB;
        });
        setSortedCars(sorted);
    };

    const handlePeriodChange = (hours) => {
        setSelectedPeriod(hours);
        const now = new Date();
        const periodAgo = new Date(now - hours * 60 * 60 * 1000);
        const baseList = isSearched ? searchResults : cars;
        const filteredCars = baseList.filter(car => {
            const carDate = new Date(car.car_date || 0);
            return carDate >= periodAgo;
        });
        setSortedCars(filteredCars);
    };

    const getCarName = React.useCallback((manId, modelId) => {
        if (!manId || !manufacturerData[manId]) return "მწარმოებელი არ არის მითითებული";
        const manufacturer = manufacturerData[manId];
        if (!manufacturer) return "მწარმოებელი არ არის მითითებული";
        const modelName = modelId && manufacturer.models && manufacturer.models[modelId];
        return modelName ? `${manufacturer.name} ${modelName}` : manufacturer.name;
    }, [manufacturerData]);

    const CarCard = React.memo(({ car }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    if (!car) return null;
    const carName = getCarName(car.man_id, car.model_id);
    const imageUrl = car.photo
        ? `https://static.my.ge/myauto/photos/${car.photo}/thumbs/${car.car_id}_1.jpg?v=${car.photo_ver}`
        : '/default-car.jpg';

    let gelPrice, usdPrice;
    if (car.price_usd) {
        usdPrice = parseFloat(car.price_usd);
        gelPrice = Math.round(usdPrice * exchangeRate);
    } else if (car.price) {
        gelPrice = parseFloat(car.price);
        usdPrice = Math.round(gelPrice / exchangeRate);
    }

    const getLocationText = () => {
        const locations = {
            0: 'თბილისი',
            1: 'ქუთაისი',
            2: 'რუსთავის ავტობაზრობა',
            3: 'ამერიკა',
            4: 'ევროპა',
            5: 'დუბაი'
        };

        if (car.car_status === 2) return 'გზაში';
        if (car.customs_passed) {
            return locations[car.location_id] || 'საქართველო';
        }
        return locations[car.location_id] || 'საზღვარგარეთ';
    };

    const calculateCustomsDuty = () => {
        if (car.customs_passed) return 0;

        const currentYear = new Date().getFullYear();
        const carAge = currentYear - car.prod_year;
        const engineVolume = car.engine_volume / 1000;
        let basePrice = parseFloat(car.price_usd) || 0;

        if (car.fuel_type_id === 5) {
            return Math.round(basePrice * (carAge <= 6 ? 0.05 : 0.095));
        }

        if (car.fuel_type_id === 4) return 0;

        let excise = engineVolume * ((carAge + 1) * 50);
        let importTax = basePrice * 0.12;
        let vat = (basePrice + excise + importTax) * 0.18;

        return Math.round(excise + importTax + vat);
    };

    const customsDutyAmount = calculateCustomsDuty();
    const locationText = getLocationText();

    const primaryPrice = currency === 'GEL' ? gelPrice : usdPrice;
    const secondaryPrice = currency === 'GEL' ? usdPrice : gelPrice;
    const primarySymbol = currency === 'GEL' ? '₾' : '$';
    const secondarySymbol = currency === 'GEL' ? '$' : '₾';

    const engineVolume = car.engine_volume
        ? `${(car.engine_volume / 1000).toFixed(1)}L`
        : '';

    return (
        <div className="car-card">
            <div className="car-image-container">
                <img
                    src={imageUrl}
                    alt={carName}
                    className="car-image"
                    loading="lazy"
                    onError={(e) => {
                        e.target.src = '/default-car.jpg';
                        e.target.onerror = null;
                    }}
                />
                {/* დაგულების ღილაკი */}
                <button
                    className={`favorite-button ${isFavorite ? 'active' : ''}`}
                    onClick={() => setIsFavorite(!isFavorite)}
                >
                    <FaHeart />
                </button>
                {/* მდებარეობის ბეჯი */}
                <div className="location-badge">
                    <FaMapMarkerAlt />
                    <span>{locationText}</span>
                </div>
            </div>
            <div className="car-info">
                <h2 className="car-title">
                    {carName} <span className="car-year">{car.prod_year ? `${car.prod_year} წ` : ''}</span>
                </h2>
                <p className="car-category">{categoryMapping[car.category_id] || "სხვა"}</p>

                <div className="car-specs">
                    <div className="specs-row">
                        <span className="spec-item">
                            <i className="spec-icon">🚘</i>
                            {car.right_wheel ? "მარჯვენა" : "მარცხენა"} საჭე
                        </span>
                        <span className="spec-item">
                            <i className="spec-icon">⚙️</i>
                            {transmissionTypes[car.gear_type_id] || "გადაცემათა კოლოფი"}
                        </span>
                    </div>
                    <div className="specs-row">
                        <span className="spec-item">
                            <i className="spec-icon">🔧</i>
                            {engineVolume} {fuelTypes[car.fuel_type_id] || ""}
                        </span>
                        <span className="spec-item">
                            <i className="spec-icon">📍</i>
                            {car.car_run_km?.toLocaleString()} კმ
                        </span>
                    </div>
                </div>

                <div className="customs-info">
                    {car.customs_passed ? (
                        <div className="customs-passed">
                            <FaCheckCircle />
                            <span>განბაჟებული</span>
                        </div>
                    ) : (
                        <div className="customs-duty">
                            <RiMoneyDollarCircleLine />
                            <span>განბაჟება: {customsDutyAmount} $</span>
                        </div>
                    )}
                </div>

                <div className="car-price-section">
                    <div className="price-and-currency">
                        <div className="prices">
                            <span className="car-price">
                                {Number(primaryPrice).toLocaleString()} {primarySymbol}
                            </span>
                            <span className="car-price-secondary">
                                (~{Number(secondaryPrice).toLocaleString()} {secondarySymbol})
                            </span>
                        </div>
                        <div className="currency-toggle-box">
                            <button
                                className={`currency-toggle-btn ${currency === 'GEL' ? 'active' : ''}`}
                                onClick={() => handleCurrencyChange('GEL')}
                            >
                                <span className="currency-symbol">₾</span>
                            </button>
                            <button
                                className={`currency-toggle-btn ${currency === 'USD' ? 'active' : ''}`}
                                onClick={() => handleCurrencyChange('USD')}
                            >
                                <span className="currency-symbol">$</span>
                            </button>
                        </div>
                    </div>
                </div>

                {car.for_rent === "1" && <span className="rental-badge">ქირავდება</span>}
            </div>
        </div>
    );
});



    if (loading) {
        return (
            <div className="loading-container">
                <p className="loading-text">იტვირთება...</p>
            </div>
        );
    }

    return (
        <div className="main-container">
            {sortedCars && sortedCars.length > 0 ? (
                <>
                    <div className="header-container">
                        <div className="results-count">
                            ნაპოვნია: {sortedCars.length} განცხადება
                        </div>
                        <div className="filters-container">
                            <PeriodFilter onPeriodChange={handlePeriodChange} />
                            <SortDropdown onSort={handleSort} />
                        </div>
                    </div>

                    <div className="cars-grid">
                        {sortedCars.map((car) => (
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