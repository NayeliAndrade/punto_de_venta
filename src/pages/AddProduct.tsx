import React, { useState } from "react";
import api from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/button";
import Tittle from "../components/Tittle";
import Input from "../components/Input";

function AddProduct() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: "",
        sku: "",
        product: "",
        image_product: "",
        description: "",
        unit_measure: "",
        iva: "",
        price: "",
        cost: "",
        data_expiration: ""
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log(formData);

        api.post("/products", {
            id: 5,
            sku: formData.sku,
            product: formData.product,
            image_product: formData.image_product,
            description: formData.description,
            unit_measure: formData.unit_measure,
            iva: formData.iva,
            price: formData.price,
            cost: formData.cost,
            data_expiration: formData.data_expiration
        }).then(res => {
            const data = res.data;
            console.log(data);
            navigate("/productList");
        }).catch(err => {
            console.log(err);
        })
        e.preventDefault();
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
                <Tittle text="Nuevo producto" />
                <Link to="/productList" className="text-blue-600 hover:text-blue-800">Volver a la lista de productos</Link>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        placeholder="Ingresar sku"
                        name="sku"
                        onChange={handleChange}
                        value={formData.sku}
                    />

                    <Input
                        placeholder="Ingresar producto"
                        name="product"
                        onChange={handleChange}
                        value={formData.product}
                    />

                    <Input
                        placeholder="Ingresar descripción"
                        name="description"
                        onChange={handleChange}
                        value={formData.description}
                    />

                    <Input
                        placeholder="Unidad de medida"
                        name="unit_measure"
                        onChange={handleChange}
                        value={formData.unit_measure}
                    />

                    <Input
                        placeholder="Ingresar IVA"
                        name="iva"
                        onChange={handleChange}
                        value={formData.iva}
                    />

                    <Input
                        placeholder="Precio de venta"
                        name="price"
                        onChange={handleChange}
                        value={formData.price}
                    />

                    <Input
                        placeholder="Costo al público"
                        name="cost"
                        onChange={handleChange}
                        value={formData.cost}
                    />

                    <Input
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                        type="date"
                        name="data_expiration"
                        onChange={handleChange}
                        value={formData.data_expiration}
                    />
                    <div className="md:col-span-2">
                        <label className="block text-sm text-gray-500 mb-1">Imagen del producto</label>
                        <Input
                            type="file"
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            name="image_product"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <Button text="agregar" />
                </div>
            </form>
        </>
    )
}

export default AddProduct;