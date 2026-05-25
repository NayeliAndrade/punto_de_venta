import api from "../api";
import type { Product } from "../types/Product";

const createProduct = async (product: Product) => {
    try {
        const response = await api.post("/products", product);
        return response.data;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};

const useProducts = () => {
    return {
        createProduct
    };
};

export default useProducts;


