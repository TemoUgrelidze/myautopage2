// src/components/Main.jsx
import React, { useEffect, useState, useContext } from "react";
import { fetchCarListings, fetchManufacturers } from "../Api/api.jsx";
import SortDropdown from '../ui/SortDropdown.jsx';
import PeriodFilter from '../ui/PeriodFilter.jsx';
import { FaHeart, FaEye, FaMapMarkerAlt, FaCheckCircle, FaTimes } from 'react-icons/fa';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { LanguageContext } from '../../contexts/LanguageContext.jsx';

const Main = ({
                  searchResults,
                  isSearched,
                  toggleFavorite,
                  isFavorite,
                  activeTab
              }) => {
    const { t } = useContext(LanguageContext);
    const [cars, setCars] = useState([]);
    const [manufacturers, setManufacturers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortedCars, setSortedCars] = useState([]);
    const [, setSelectedPeriod] = useState(null);
    const [manufacturerData, setManufacturerData] = useState({});
    const [currency, setCurrency] = useState(() => {
        return localStorage.getItem('preferredCurrency') || 'GEL';
    });
    const [showFavoritesPanel, setShowFavoritesPanel] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const exchangeRate = 2.65;

    // ფავორიტების ჩატვირთვა localStorage-დან
    useEffect(() => {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            try {
                setFavorites(JSON.parse(savedFavorites));
            } catch (error) {
                console.error("Error loading favorites from localStorage:", error);
                setFavorites([]);
            }
        }
    }, []);

    // ფავორიტების განახლება როცა toggleFavorite გამოიძახება
    useEffect(() => {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            try {
                setFavorites(JSON.parse(savedFavorites));
            } catch (error) {
                console.error("Error loading favorites from localStorage:", error);
            }
        }
    }, [isFavorite]); // isFavorite-ს გამოყენება დამოკიდებულებად, რადგან ის იცვლება როცა toggleFavorite გამოიძახება

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
        if (!manId || !manufacturerData[manId]) return t('car.unknownManufacturer');
        const manufacturer = manufacturerData[manId];
        if (!manufacturer) return t('car.unknownManufacturer');
        const modelName = modelId && manufacturer.models && manufacturer.models[modelId];
        return modelName ? `${manufacturer.name} ${modelName}` : manufacturer.name;
    }, [manufacturerData, t]);

    // ფავორიტების პანელის გახსნა/დახურვა
    const toggleFavoritesPanel = () => {
        setShowFavoritesPanel(!showFavoritesPanel);
    };

    const CarCard = React.memo(({ car }) => {
        // ვიყენებთ გლობალურ isFavorite ფუნქციას
        const carIsFavorite = isFavorite && isFavorite(car.car_id);

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
            const locationId = car.location_id;

            if (car.car_status === 2) return t('car.location.inTransit');
            if (car.customs_passed) {
                if (locationId === 0) return t('car.location.tbilisi');
                if (locationId === 1) return t('car.location.kutaisi');
                if (locationId === 2) return t('car.location.rustavi');
                if (locationId === 3) return t('car.location.america');
                if (locationId === 4) return t('car.location.europe');
                if (locationId === 5) return t('car.location.dubai');
                return t('car.location.georgia');
            }
            return t('car.location.abroad');
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

        // Get category name based on language
        const getCategoryName = (categoryId) => {
            if (!categoryId) return t('car.categories.other');

            const categoryKey = {
                "1": "sedan",
                "2": "coupe",
                "3": "jeep",
                "4": "universal",
                "5": "hatchback",
                "6": "minivan",
                "7": "microbus",
                "8": "pickup",
                "9": "cabriolet",
                "10": "van"
            }[categoryId];

            return categoryKey ? t(`car.categories.${categoryKey}`) : t('car.categories.other');
        };

        // Get transmission type based on language
        const getTransmissionType = (typeId) => {
            if (!typeId) return "";

            const transmissionKey = {
                "1": "manual",
                "2": "automatic",
                "3": "tiptronic",
                "4": "variator"
            }[typeId];

            return transmissionKey ? t(`car.transmission.${transmissionKey}`) : "";
        };

        // Get fuel type based on language
        const getFuelType = (typeId) => {
            if (!typeId) return "";

            const fuelKey = {
                "2": "petrol",
                "3": "diesel",
                "4": "electric",
                "5": "hybrid",
                "6": "naturalGas",
                "7": "lpg",
                "8": "hydrogen",
                "9": "pluginHybrid"
            }[typeId];

            return fuelKey ? t(`car.fuel.${fuelKey}`) : "";
        };

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
                        className={`favorite-button ${carIsFavorite ? 'active' : ''}`}
                        onClick={() => toggleFavorite && toggleFavorite(car)}
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
                        {carName} <span className="car-year">{car.prod_year ? `${car.prod_year} ${t('car.year')}` : ''}</span>
                    </h2>
                    <p className="car-category">{getCategoryName(car.category_id)}</p>

                    <div className="car-specs">
                        <div className="specs-row">
                            <span className="spec-item">
                                <i className="spec-icon">🚘</i>
                                {car.right_wheel ? t('car.rightWheel') : t('car.leftWheel')}
                            </span>
                            <span className="spec-item">
                                <i className="spec-icon">⚙️</i>
                                {getTransmissionType(car.gear_type_id)}
                            </span>
                        </div>
                        <div className="specs-row">
                            <span className="spec-item">
                                <i className="spec-icon">🔧</i>
                                {engineVolume} {getFuelType(car.fuel_type_id)}
                            </span>
                            <span className="spec-item">
                                <i className="spec-icon">📍</i>
                                {car.car_run_km?.toLocaleString()} {t('car.km')}
                            </span>
                        </div>
                    </div>

                    <div className="customs-info">
                        {car.customs_passed ? (
                            <div className="customs-passed">
                                <FaCheckCircle />
                                <span>{t('car.customs.cleared')}</span>
                            </div>
                        ) : (
                            <div className="customs-duty">
                                <RiMoneyDollarCircleLine />
                                <span>{t('car.customs.duty')}: {customsDutyAmount} $</span>
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

                    {car.for_rent === "1" && <span className="rental-badge">{t('filters.forRent')}</span>}
                </div>
            </div>
        );
    });

    if (loading) {
        return (
            <div className="loading-container">
                <p className="loading-text">{t('common.loading')}</p>
            </div>
        );
    }

    return (
        <div className="main-container">
            {/* ფავორიტების ღილაკი მარჯვენა ზედა კუთხეში */}
            <div className="favorites-button-container">
                <button
                    className={`favorites-toggle-button ${showFavoritesPanel ? 'active' : ''}`}
                    onClick={toggleFavoritesPanel}
                >
                    <FaHeart />
                    <span className="favorites-count">{favorites.length}</span>
                </button>
            </div>

            {/* ფავორიტების პანელი */}
            {showFavoritesPanel && (
                <div className="favorites-panel">
                    <div className="favorites-panel-header">
                        <h3>{t('favorites.title')} ({favorites.length})</h3>
                        <button className="close-panel-btn" onClick={toggleFavoritesPanel}>
                            <FaTimes />
                        </button>
                    </div>
                    <div className="favorites-list">
                        {favorites.length > 0 ? (
                            favorites.map(car => (
                                <div key={car.car_id} className="favorite-car-card">
                                    <img
                                        src={car.photo ? `https://static.my.ge/myauto/photos/${car.photo}/thumbs/${car.car_id}_1.jpg?v=${car.photo_ver}` : '/default-car.jpg'}
                                        alt={getCarName(car.man_id, car.model_id)}
                                        className="favorite-car-image"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.src = '/default-car.jpg';
                                            e.target.onerror = null;
                                        }}
                                    />
                                    <div className="favorite-car-info">
                                        <h3 className="favorite-car-title">{getCarName(car.man_id, car.model_id)}</h3>
                                        <p className="favorite-car-price">
                                            {Number(currency === 'GEL'
                                                ? (parseFloat(car.price_usd || 0) * exchangeRate)
                                                : parseFloat(car.price_usd || 0)).toLocaleString()}
                                            {currency === 'GEL' ? '₾' : '$'}
                                        </p>
                                    </div>
                                    <button
                                        className="favorite-remove-btn"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            console.log("წაშლის ღილაკი დაჭერილია მანქანისთვის:", car.car_id);
                                            toggleFavorite(car);
                                        }}
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="empty-favorites">
                                <p>{t('favorites.empty')}</p>
                                <p>{t('favorites.addHint')}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}


            {activeTab === 'favorites' && (
                <div className="header-container">
                    <div className="results-count">
                        {t('favorites.title')}: {sortedCars.length} {t('car.listings')}
                    </div>
                </div>
            )}

            {sortedCars && sortedCars.length > 0 ? (
                <>
                    {activeTab === 'search' && (
                        <div className="header-container">
                            <div className="results-count">
                                {t('search.resultsFound')}: {sortedCars.length} {t('search.announcements')}
                            </div>
                            <div className="filters-container">
                                <PeriodFilter onPeriodChange={handlePeriodChange} />
                                <SortDropdown onSort={handleSort} />
                            </div>
                        </div>
                    )}

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
                        {activeTab === 'favorites'
                            ? `❤️ ${t('favorites.empty')}`
                            : isSearched
                                ? `🔍 ${t('common.noResultsForFilters')}`
                                : `🚗 ${t('common.noResults')}`}
                    </p>
                </div>
            )}
        </div>
    );
};

export default React.memo(Main);
