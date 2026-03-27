import React, { useState } from "react";
import api from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Title from "../components/Title";
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
            navigate("/product/list");
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