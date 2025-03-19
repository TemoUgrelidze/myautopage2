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

export const fetchCategories = async () => {
    try {
        const response = await axios.get("https://api2.myauto.ge/ka/cats/get");
        if (!response.data || !Array.isArray(response.data.data)) {
            console.error("Error: Categories API response is invalid", response.data);
            return []; // Return empty array if the API response is invalid
        }
        return response.data.data;
    } catch (error) {
        console.error("Error loading categories:", error);
        return []; // Return empty array on error
    }
};


// Update the fetchModels function in src/components/api.jsx
// api.jsx ფაილში fetchModels ფუნქცია
export const fetchModels = async (manId) => {
    if (!manId || manId === "") {
        console.error("მწარმოებლის ID არ არის მითითებული");
        return [];
    }
    try {
        console.log(`მოდელების ჩატვირთვა მწარმოებლისთვის: ${manId}`);
        const response = await axios.get(`https://api2.myauto.ge/ka/getManModels?man_id=${manId}`);

        // შევამოწმოთ მონაცემების სტრუქტურა
        if (response.data && response.data.data) {
            console.log(`მიღებულია ${response.data.data.length} მოდელი`);
            // მოდელების ფორმატირება
            return response.data.data.map(model => ({
                model_id: model.model_id,
                model_name: model.model_name,
                manufacturer_id: manId,
                category_id: model.category_id || ""
            }));
        }
        console.log("მოდელები ვერ მოიძებნა");
        return [];
    } catch (error) {
        console.error('მოდელების ჩატვირთვის შეცდომა:', error);
        return []; // შეცდომის შემთხვევაში დავაბრუნოთ ცარიელი მასივი
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

// New function for searching cars
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

// Get category name
export const getCategoryName = (categoryId) => {
    const categoryMapping = {
        "1": "სედანი",
        "2": "კუპე",
        "3": "ჯიპი",
        "4": "უნივერსალი"
    };
    return categoryMapping[categoryId] || "უცნობი კატეგორია"; // Default to "Unknown category"
};

// Get manufacturer name
export const getManufacturerName = async (manufacturerId) => {
    try {
        const manufacturers = await fetchManufacturers();
        const manufacturer = manufacturers.find(m => m.man_id === parseInt(manufacturerId));
        return manufacturer ? manufacturer.man_name : "უცნობი მწარმოებელი"; // Default to "Unknown manufacturer"
    } catch (error) {
        console.error("Error getting manufacturer name:", error);
        return "უცნობი მწარმოებელი"; // Default to "Unknown manufacturer" on error
    }
};

// Get model name
export const getModelName = async (manufacturerId, modelId) => {
    try {
        const models = await fetchModels(manufacturerId);
        const model = models.find(m => m.model_id === parseInt(modelId));
        return model ? model.model_name : "უცნობი მოდელი"; // Default to "Unknown model"
    } catch (error) {
        console.error("Error getting model name:", error);
        return "უცნობი მოდელი"; // Default to "Unknown model" on error
    }
};


