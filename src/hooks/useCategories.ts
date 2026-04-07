import api from "../api/api";
import type { category } from "../types/category";

const createCategory = async (category: category) => {
    try {
        const response = await api.post("/categories", category);
        return response.data;
    } catch (error) {
        console.error("Error creating category:", error);
        throw error;
    }
};

const useCategories = () => {
    return {
        createCategory
    };
};
export default useCategories;