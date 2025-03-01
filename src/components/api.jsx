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
        return response.data.data && Array.isArray(response.data.data) ? response.data.data : [];
    } catch (error) {
        console.error("Error loading categories:", error);
        return [];
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