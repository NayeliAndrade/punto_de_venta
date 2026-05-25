import api from "../api";
import type { Category } from "../types/Category";

const createCategory = async (category: Category) => {
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