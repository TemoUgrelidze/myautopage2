import axios from "axios";

// Fetch manufacturers
export const fetchManufacturers = async () => {
    try {
        const response = await axios.get("https://static.my.ge/myauto/js/mans.json");
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error("Error loading manufacturers:", error);
        return [];
    }
};

// Fetch categories
export const fetchCategories = async () => {
    try {
        const response = await axios.get("https://api2.myauto.ge/ka/cats/get");
        if (!response.data || !Array.isArray(response.data.data)) {
            console.error("Error: Categories API response is invalid", response.data);
            return []; // თუ API-ს პასუხი არასწორია, ვაბრუნებთ ცარიელ მასივს
        }
        return response.data.data;
    } catch (error) {
        console.error("Error loading categories:", error);
        return []; // თუ შეცდომაა, მაინც ცარიელი მასივი დავაბრუნოთ
    }
};


// Fetch car models based on manufacturer ID
export const fetchModels = async (manufacturerId) => {
    if (!manufacturerId) return [];
    try {
        const response = await axios.get(`https://api2.myauto.ge/ka/getManModels?man_id=${manufacturerId}`);
        return response.data.data || []; // Return models or empty array
    } catch (error) {
        console.error("Error loading models:", error);
        return [];
    }
};

// Fetch car listings
const API_URL = "https://api2.myauto.ge/ka/products/";
export const fetchCarListings = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.data.items || [];
    } catch (error) {
        console.error("Error fetching car listings:", error);
        return [];
    }
};

// ახალი ფუნქცია მანქანების ძებნისთვის
export const searchCars = async (params) => {
    try {
        const queryParams = new URLSearchParams({
            ...params,
            TypeID: params.vehicleType === "car" ? 0 : params.vehicleType === "tractor" ? 1 : 2,
            ForRent: params.saleType === "2" ? 1 : 0,
            Mans: params.selectedManufacturer || "",
            Cats: params.category || "",
            Models: params.selectedModel || "",
            PriceFrom: params.minPrice || "",
            PriceTo: params.maxPrice || "",
            Currency: params.currency || "1"
        });

        const response = await axios.get(`${API_URL}?${queryParams.toString()}`);
        return response.data.data.items || [];
    } catch (error) {
        console.error("Error searching cars:", error);
        return [];
    }
};

// კატეგორიის სახელის მიღება
export const getCategoryName = (categoryId) => {
    const categoryMapping = {
        "1": "სედანი",
        "2": "კუპე",
        "3": "ჯიპი",
        "4": "უნივერსალი"
    };
    return categoryMapping[categoryId] || "უცნობი კატეგორია";
};

// მწარმოებლის სახელის მიღება
export const getManufacturerName = async (manufacturerId) => {
    try {
        const manufacturers = await fetchManufacturers();
        const manufacturer = manufacturers.find(m => m.man_id === parseInt(manufacturerId));
        return manufacturer ? manufacturer.man_name : "უცნობი მწარმოებელი";
    } catch (error) {
        console.error("Error getting manufacturer name:", error);
        return "უცნობი მწარმოებელი";
    }
};

// მოდელის სახელის მიღება
export const getModelName = async (manufacturerId, modelId) => {
    try {
        const models = await fetchModels(manufacturerId);
        const model = models.find(m => m.model_id === parseInt(modelId));
        return model ? model.model_name : "უცნობი მოდელი";
    } catch (error) {
        console.error("Error getting model name:", error);
        return "უცნობი მოდელი";
    }
};

export default {
    fetchManufacturers,
    fetchCategories,
    fetchModels,
    fetchCarListings,
    searchCars,
    getCategoryName,
    getManufacturerName,
    getModelName
};