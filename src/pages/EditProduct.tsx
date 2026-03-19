import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import type { product } from "../types/product";
import Button from "../components/Button";
import Title from "../components/Title";
import Input from "../components/Input";

function EditProduct() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ id: "", sku: "", product: "", description: "", price: 0, cost: 0, iva: 0, data_expiration: "", unit_measure: "", image_product: "" });
    const { id } = useParams<{ id: string }>();
    //const newGuid = crypto.randomUUID();

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
                            iva: product.iva,
                            data_expiration: product.data_expiration,
                            unit_measure: product.unit_measure,
                            image_product: product.image_product

                        });
                    }
                })
                .catch(err => console.error(err));
        }
    }, [id]);
    // maneja el estado del formulario

    //es la funcion que maneja el submit del formulario
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        //fromData es la informacion que se recibe desde el formulario
        //console.log(formData);
        //envia la informacion al backend, agregando una nueva categoria
        api.put(`/products/${formData.id}`, {
            id: formData.id,
            sku: formData.sku,
            product: formData.product,
            description: formData.description,
            price: formData.price,
            cost: formData.cost,
            iva: formData.iva,
            data_expiration: formData.data_expiration,
            unit_measure: formData.unit_measure,
            image_product: formData.image_product

        }).then(res => {
            const data = res.data;
            // muestra la respuesta del backend en la consola
            console.log(data);
            navigate("/productList");
            //muestra un mensaje de exito en la consola
        }).catch(err => {
            //muestra si hay un error en la consola
            console.error(err);
        });
        e.preventDefault();
    }
    //maneja el cambio en el input del formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //obtiene el nombre y el valor del input que se esta modificando
        const { name, value } = e.target;
        //actualiza el estado del formulario con el nuevo valor
        setFormData(prevState => ({
            //copia el estado anterior
            ...prevState,
            [name]: value
        }));
        //console.log(name, value);

    }

    return (
        <>
            {/* formulario para agregar una nueva categoria */}

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
                        placeholder="Ingresar IVA"
                        name="iva"
                        onChange={handleChange}
                        value={String(formData.iva)}
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