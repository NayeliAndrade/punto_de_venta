import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Title from "../components/Title";
import Input from "../components/Input";
import useProducts from "../hooks/useProducts";

function AddProduct() {
    const navigate = useNavigate();
    const { createProduct } = useProducts();

    const [formData, setFormData] = useState({
        id: "",
        sku: "",
        product: "",
        image_product: "",
        description: "",
        unit_measure: 0,
        iva: 0,
        price: 0,
        cost: 0,
        data_expiration: ""
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await createProduct({ ...formData });
            navigate("/product/list");
        } catch (error) {
            console.error("Error creating product:", error);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, files } = e.target;
        console.log(name, value, type, files);

        setFormData(prevState => ({
            ...prevState,
            [name]: type === "file" ? (files ? files[0].name : "") : value
        }));
    }

    return (
        <>
            <form className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
                <Title text="Nuevo producto" />
                <Link to="/product/list" className="text-blue-600 hover:text-blue-800">Volver a la lista de productos</Link>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        type="text"
                        placeholder="Ingresar sku"
                        name="sku"
                        onChange={handleChange}
                        value={formData.sku}
                    />

                    <Input
                        type="text"
                        placeholder="Ingresar producto"
                        name="product"
                        onChange={handleChange}
                        value={formData.product}
                    />

                    <Input
                        type="text"
                        placeholder="Ingresar descripción"
                        name="description"
                        onChange={handleChange}
                        value={formData.description}
                    />

                    <Input
                        type="number"
                        placeholder="Unidad de medida"
                        name="unit_measure"
                        onChange={handleChange}
                        value={formData.unit_measure}
                    />

                    <Input
                        type="number"
                        placeholder="Ingresar IVA"
                        name="iva"
                        onChange={handleChange}
                        value={formData.iva}
                    />

                    <Input
                        type="number"
                        placeholder="Precio de venta"
                        name="price"
                        onChange={handleChange}
                        value={formData.price}
                    />

                    <Input
                        type="number"
                        placeholder="Costo al público"
                        name="cost"
                        onChange={handleChange}
                        value={formData.cost}
                    />

                    <Input
                        type="date"
                        placeholder="fecha de expiracion"
                        name="data_expiration"
                        onChange={handleChange}
                        value={String(formData.data_expiration)}
                    />
                    <div className="md:col-span-2">
                        <label className="block text-sm text-gray-500 mb-1">Imagen del producto</label>
                        <Input
                            value={formData.image_product}
                            type="file"
                            name="image_product"
                            onChange={handleChange}
                        />
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