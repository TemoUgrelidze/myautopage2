// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SideBar from './components/SideBar';
import Main from './components/Main';
import Guest from './components/Guest';
import Login from './components/Login';
import LanguageSwitcher from './components/LanguageSwitcher';
import { LanguageProvider } from './contexts/LanguageContext';
import { fetchManufacturers, fetchCategories, fetchModelsForManufacturers, fetchCarListings } from './components/api';

function App() {
    const [manufacturers, setManufacturers] = useState([]);
    const [vehicleType, setVehicleType] = useState("car");
    const [saleType, setSaleType] = useState("");
    const [selectedManufacturer, setSelectedManufacturer] = useState([]);
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [currency, setCurrency] = useState("GEL");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearched, setIsSearched] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [activeTab, setActiveTab] = useState("search");

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

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const [manufacturersData, categoriesData] = await Promise.all([
                    fetchManufacturers(),
                    fetchCategories()
                ]);
                setManufacturers(manufacturersData);
                setCategories(categoriesData);
            } catch (error) {
                console.error("Error loading initial data:", error);
            }
        };
        loadInitialData();
    }, []);

    useEffect(() => {
        const loadModelsForSelectedManufacturers = async () => {
            if (selectedManufacturer && selectedManufacturer.length > 0) {
                try {
                    const manufacturerModels = await fetchModelsForManufacturers(selectedManufacturer);
                    console.log("ჩატვირთულია მოდელები არჩეული მწარმოებლებისთვის:", manufacturerModels.length);

                    setModels(manufacturerModels);
                } catch (error) {
                    console.error("მოდელების ჩატვირთვის შეცდომა:", error);
                    setModels([]);
                }
            } else {
                setModels([]);
            }
        };

        loadModelsForSelectedManufacturers();
    }, [selectedManufacturer]);

    const filteredManufacturers = manufacturers.filter((brand) => {
        if (vehicleType === "car") return brand.is_car === "1";
        if (vehicleType === "tractor") return brand.is_spec === "1";
        if (vehicleType === "moto") return brand.is_moto === "1";
        return true;
    });

    const filteredCategories = categories.filter((cat) => {
        let value = cat.category_type;
        if (vehicleType === "car") return value === 0;
        if (vehicleType === "tractor") return value === 1;
        if (vehicleType === "moto") return value === 2;
        return false;
    });

    const handleSearch = async () => {
        setIsSearched(true);
        setActiveTab("search");
        window.location.hash = 'search';
        try {
            const carListings = await fetchCarListings();

            const results = carListings.filter(car => {
                const manufacturerMatch = selectedManufacturer.length === 0 ||
                    selectedManufacturer.includes(String(car.man_id));

                const modelMatch = !selectedModel ||
                    String(car.model_id) === String(selectedModel);

                const categoryMatch = !category ||
                    String(car.category_id) === String(category);

                const priceMatch = (!minPrice || car.price >= Number(minPrice)) &&
                    (!maxPrice || car.price <= Number(maxPrice));

                const saleTypeMatch = !saleType ||
                    String(car.for_rent) === (saleType === "2" ? "1" : "0");

                return manufacturerMatch && modelMatch &&
                    categoryMatch && priceMatch && saleTypeMatch;
            });

            setSearchResults(results);
        } catch (error) {
            console.error("Error during search:", error);
            setSearchResults([]);
        }
    };

    const toggleFavorite = (car) => {
        console.log(" მანქანისთვის:", car.car_id);

        setFavorites(prevFavorites => {
            const isAlreadyFavorite = prevFavorites.some(fav => String(fav.car_id) === String(car.car_id));
            console.log("უკვე ფავორიტებშია?", isAlreadyFavorite);

            let newFavorites;
            if (isAlreadyFavorite) {
                newFavorites = prevFavorites.filter(fav => String(fav.car_id) !== String(car.car_id));
                console.log("წაშლილია ფავორიტებიდან");
            } else {
                newFavorites = [...prevFavorites, car];
                console.log("დამატებულია ფავორიტებში");
            }

            localStorage.setItem('favorites', JSON.stringify(newFavorites));
            return newFavorites;
        });
    };

    const isFavorite = (carId) => {
        if (!carId) return false;
        return favorites.some(fav => String(fav.car_id) === String(carId));
    };

    return (
        <LanguageProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={
                        <div className="app-container">
                            <Guest />
                            <LanguageSwitcher />
                            <SideBar
                                setVehicleType={setVehicleType}
                                saleType={saleType}
                                setSaleType={setSaleType}
                                selectedManufacturer={selectedManufacturer}
                                setSelectedManufacturer={setSelectedManufacturer}
                                category={category}
                                setCategory={setCategory}
                                manufacturers={filteredManufacturers}
                                categories={filteredCategories}
                                models={models}
                                setModels={setModels}
                                selectedModel={selectedModel}
                                setSelectedModel={setSelectedModel}
                                minPrice={minPrice}
                                setMinPrice={setMinPrice}
                                maxPrice={maxPrice}
                                setMaxPrice={setMaxPrice}
                                currency={currency}
                                setCurrency={setCurrency}
                                onSearch={handleSearch}
                            />
                            <Main
                                selectedManufacturer={selectedManufacturer}
                                selectedModel={selectedModel}
                                category={category}
                                searchResults={activeTab === "search" ? searchResults : favorites}
                                isSearched={isSearched}
                                toggleFavorite={toggleFavorite}
                                isFavorite={isFavorite}
                                activeTab={activeTab}
                            />
                        </div>
                    } />
                </Routes>
            </BrowserRouter>
        </LanguageProvider>
    );
}

export default App;
