import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";
import Button from "../components/Button";
import Title from "../components/Title";
import Input from "../components/Input";
import useProducts from "../hooks/useProducts";
import type { Product } from "../types/Product";
import type { Category } from "../types/Category";
import { useForm } from "react-hook-form";

function AddProduct() {
    const navigate = useNavigate();
    const { createProduct } = useProducts();
    const [categories, setCategories] = useState<Category[]>([]);
    const { register, handleSubmit, formState: { errors } } = useForm<Product>();

    useEffect(() => {
        api.get("/categories")
            .then((res) => {
                const data = res.data.categories;
                setCategories(Array.isArray(data) ? data : []);
            })
            .catch(() => setCategories([]));
    }, []);

    const onSubmit = async (data: Product) => {
        try {
            await createProduct({ ...data });
            navigate("/product/list");
        } catch (error) {
            console.error("Error creating product:", error);
        }
    }

    return (
        <>
            <form className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md" onSubmit={handleSubmit(onSubmit)}>
                <Title text="Nuevo producto" />
                <Link to="/product/list" className="text-blue-600 hover:text-blue-800">Volver a la lista de productos</Link>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        type="text"
                        placeholder="Ingresar sku"
                        {...register("sku", { required: true, maxLength: 20, pattern: /^[a-zA-Z0-9\s]+$/ })}
                    />
                    {errors.sku && (
                        <p className="text-red-500">
                            {errors.sku.type === "required" && "el sku es requerido"}
                            {errors.sku.type === "maxLength" && "Máximo 20 caracteres"}
                            {errors.sku.type === "pattern" && "Solo letras y números"}
                        </p>
                    )}
                    <Input
                        type="text"
                        placeholder="Ingresar producto"
                        {...register("product", { required: true, maxLength: 30, pattern: /^[a-zA-Z0-9\s]+$/ })}
                    />
                    {errors.product && (
                        <p className="text-red-500">
                            {errors.product.type === "required" && "el producto es requerido"}
                            {errors.product.type === "maxLength" && "Máximo 30 caracteres"}
                            {errors.product.type === "pattern" && "Solo letras y números"}
                        </p>
                    )}
                    <div className="flex flex-col">
                        <label className="block text-sm text-gray-500 mb-1">Categoría</label>
                        <select
                            {...register("category", { required: true })}
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Seleccionar categoría</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.category}>
                                    {category.category}
                                </option>
                            ))}
                        </select>
                        {errors.category && (
                            <p className="text-red-500 text-sm mt-1">La categoría es requerida</p>
                        )}
                    </div>
                    <Input
                        type="text"
                        placeholder="Ingresar descripción"
                        {...register("description", { required: true, maxLength: 100, pattern: /^[a-zA-Z0-9\s]+$/ })}
                    />
                    {errors.description && (
                        <p className="text-red-500">
                            {errors.description.type === "required" && "la descripción es requerida"}
                            {errors.description.type === "maxLength" && "Máximo 100 caracteres"}
                            {errors.description.type === "pattern" && "Solo letras y números"}
                        </p>
                    )}
                    <Input
                        type="text"
                        placeholder="Unidad de medida"
                        {...register("unit_measure", { required: true, pattern: /^[a-zA-Z0-9\s]+$/ })}
                    />
                    {errors.unit_measure && (
                        <p className="text-red-500">
                            {errors.unit_measure.type === "required" && "la unidad de medida es requerida"}
                            {errors.unit_measure.type === "pattern" && "Solo letras y números"}
                        </p>
                    )}
                    <Input
                        type="number"
                        placeholder="Cantidad disponible"
                        {...register("quantity", { valueAsNumber: true, required: true, min: 0 })}
                    />
                    {errors.quantity && (
                        <p className="text-red-500">
                            {errors.quantity.type === "required" && "La cantidad es requerida"}
                            {errors.quantity.type === "min" && "La cantidad no puede ser negativa"}
                            {errors.quantity.type === "pattern" && "Solo números"}
                        </p>
                    )}
                    <Input
                        type="number"
                        placeholder="Ingresar VAT"
                        {...register("VAT", { valueAsNumber: true, required: true, maxLength: 3 })}
                    />
                    {errors.VAT && (
                        <p className="text-red-500">
                            {errors.VAT.type === "required" && "el VAT es requerido"}
                            {errors.VAT.type === "maxLength" && "Máximo 3 caracteres"}
                            {errors.VAT.type === "pattern" && "Solo números"}
                        </p>
                    )}
                    <Input
                        type="number"
                        placeholder="Precio de venta"
                        {...register("price", { valueAsNumber: true, required: true })}
                    />
                    {errors.price && (
                        <p className="text-red-500">
                            {errors.price.type === "required" && "el precio es requerido"}
                            {errors.price.type === "pattern" && "Solo números"}
                        </p>
                    )}
                    <Input
                        type="number"
                        placeholder="Costo al público"
                        {...register("cost", { valueAsNumber: true, required: true })}
                    />
                    {errors.cost && (
                        <p className="text-red-500">
                            {errors.cost.type === "required" && "el costo es requerido"}
                            {errors.cost.type === "pattern" && "Solo números"}
                        </p>
                    )}
                    <Input
                        type="date"
                        placeholder="fecha de expiracion"
                        {...register("data_expiration", { required: true })}
                    />
                    {errors.data_expiration && (
                        <p className="text-red-500">
                            {errors.data_expiration.type === "required" && "la fecha de expiración es requerida"}
                        </p>
                    )}
                    <div className="md:col-span-2">
                        <label className="block text-sm text-gray-500 mb-1">Imagen del producto</label>
                        <Input
                            type="file"
                            {...register("image_product", {
                                required: "La imagen es requerida",
                                validate: {
                                    fileSize: (files: FileList | string | undefined) => {
                                        if (!files || typeof files === "string") return "La imagen es requerida";
                                        return files[0]?.size < 2 * 1024 * 1024 || "Máximo 2MB";
                                    },
                                    fileType: (files: FileList | string | undefined) => {
                                        if (!files || typeof files === "string") return "La imagen es requerida";
                                        return ["image/jpeg", "image/png"].includes(files[0]?.type) || "Solo JPG o PNG";
                                    }
                                }
                            })}
                        />
                        {errors.image_product && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.image_product.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <Button text="agregar" type="submit" />
                </div>
            </form>
        </>
    )
}

export default AddProduct;