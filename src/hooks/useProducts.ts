import api from "../api";
import type { product } from "../types/product";

const createProduct = async (product: product) => {
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


