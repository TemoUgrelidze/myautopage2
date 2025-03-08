import { useState, useEffect } from "react";
import "./App.css";
import SideBar from "./components/SideBar.jsx";
import Main from "./components/Main.jsx";
import { fetchManufacturers, fetchCategories, fetchModels } from "./components/api.jsx";

function App() {
    const [manufacturers, setManufacturers] = useState([]);
    const [vehicleType, setVehicleType] = useState("car");
    const [saleType, setSaleType] = useState("");
    const [selectedManufacturer, setSelectedManufacturer] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState("");

    // Fetch manufacturers and categories
    useEffect(() => {
        fetchManufacturers().then(setManufacturers);
        fetchCategories().then(setCategories);
    }, []);

    // Fetch models when manufacturer changes
    useEffect(() => {
        if (selectedManufacturer) {
            fetchModels(selectedManufacturer).then(setModels);
        } else {
            setModels([]); // Reset models when no manufacturer is selected
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

    return (
        <div>
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
            />
            <Main selectedManufacturer={selectedManufacturer} selectedModel={selectedModel} />
        </div>
    );
}

export default App;