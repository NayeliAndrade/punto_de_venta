import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import type { product } from "../types/product";
import Button from "../components/Button";
import Title from "../components/Title";
import Input from "../components/Input";

function EditProduct() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ id: "", sku: "", product: "", description: "", price: 0, cost: 0, VAT: 0, data_expiration: "", unit_measure: "", image_product: "" });
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        if (id) {
            api.get("/products")
                .then(res => {
                    const product = res.data.products.find(
                        (p: product) => String(p.id) === String(id)
                    );

                    if (product) {
                        setFormData({
                            id: String(product.id),
                            sku: product.sku,
                            product: product.product,
                            description: product.description,
                            price: product.price,
                            cost: product.cost,
                            VAT: product.VAT,
                            data_expiration: product.data_expiration,
                            unit_measure: product.unit_measure,
                            image_product: product.image_product

                        });
                    }
                })
                .catch(err => console.error(err));
        }
    }, [id]);
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        api.put(`/products/${formData.id}`, {
            id: formData.id,
            sku: formData.sku,
            product: formData.product,
            description: formData.description,
            price: formData.price,
            cost: formData.cost,
            VAT: formData.VAT,
            data_expiration: formData.data_expiration,
            unit_measure: formData.unit_measure,
            image_product: formData.image_product

        }).then(() => {
            navigate("/product/list");
        }).catch(() => {
            navigate("/product/list");
        });
        e.preventDefault();
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <>
            <form className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
                <Title text="Editar Producto" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        placeholder="Ingresar sku"
                        name="sku"
                        onChange={handleChange}
                        value={formData.sku}
                        type="number"
                    />

                    <Input
                        placeholder="Ingresar producto"
                        name="product"
                        onChange={handleChange}
                        value={formData.product}
                        type="text"
                    />

                    <Input
                        placeholder="Ingresar descripción"
                        name="description"
                        onChange={handleChange}
                        value={formData.description}
                        type="text"
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
                        placeholder="Ingresar VAT"
                        name="VAT"
                        onChange={handleChange}
                        value={String(formData.VAT)}
                    />

                    <Input
                        type="number"
                        placeholder="Precio de venta"
                        name="price"
                        onChange={handleChange}
                        value={String(formData.price)}
                    />

                    <Input
                        type="number"
                        placeholder="Costo al público"
                        name="cost"
                        onChange={handleChange}
                        value={String(formData.cost)}
                    />

                    <Input
                        type="date"
                        placeholder="expiracion"
                        name="data_expiration"
                        onChange={handleChange}
                        value={formData.data_expiration}
                    />
                    <Input
                        type="text"
                        placeholder="URL de la imagen"
                        name="image_product"
                        onChange={handleChange}
                        value={formData.image_product}
                    />
                </div>

                <div className="mt-6 flex justify-end">
                    <Button text="Editar" type="submit" />
                </div>
            </form>
        </>
    )
}
export default EditProduct;