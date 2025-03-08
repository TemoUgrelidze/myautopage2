// App.jsx
import { useState, useEffect } from "react";
import "./App.css";
import SideBar from "./components/SideBar.jsx";
import Main from "./components/Main.jsx";
import { fetchManufacturers, fetchCategories, fetchModels, fetchCarListings } from "./components/api.jsx";

function App() {
    const [manufacturers, setManufacturers] = useState([]);
    const [vehicleType, setVehicleType] = useState("car");
    const [saleType, setSaleType] = useState("");
    const [selectedManufacturer, setSelectedManufacturer] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [currency, setCurrency] = useState("GEL");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearched, setIsSearched] = useState(false);

    // Fetch manufacturers and categories
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

    // Fetch models when manufacturer changes
    useEffect(() => {
        if (selectedManufacturer) {
            fetchModels(selectedManufacturer)
                .then(setModels)
                .catch(error => console.error("Error fetching models:", error));
        } else {
            setModels([]);
        }
    }, [selectedManufacturer]);

    // Filter manufacturers based on vehicle type
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
        try {
            const carListings = await fetchCarListings();

            const results = carListings.filter(car => {
                const manufacturerMatch = !selectedManufacturer ||
                    String(car.man_id) === String(selectedManufacturer);

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

    return (
        <div className="app-container">
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
                searchResults={searchResults}
                isSearched={isSearched}
            />
        </div>
    );
}

export default App;
