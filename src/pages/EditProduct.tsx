import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import type { product } from "../types/product";

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
                        (p: product) => p.id === Number(id)
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
                <h2 className="text-xl font-bold mb-4 text-gray-800">Editar Producto</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        placeholder="Ingresar sku"
                        name="sku"
                        onChange={handleChange}
                        value={formData.sku}
                    />

                    <input
                        type="text"
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ingresar producto"
                        name="product"
                        onChange={handleChange}
                        value={formData.product}
                    />

                    <input
                        type="text"
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ingresar descripción"
                        name="description"
                        onChange={handleChange}
                        value={formData.description}
                    />

                    <input
                        type="text"
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Unidad de medida"
                        name="unit_measure"
                        onChange={handleChange}
                        value={formData.unit_measure}
                    />

                    <input
                        type="text"
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ingresar IVA"
                        name="iva"
                        onChange={handleChange}
                        value={formData.iva}
                    />

                    <input
                        type="text"
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Precio de venta"
                        name="price"
                        onChange={handleChange}
                        value={formData.price}
                    />

                    <input
                        type="text"
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Costo al público"
                        name="cost"
                        onChange={handleChange}
                        value={formData.cost}
                    />

                    <input
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                        type="date"
                        name="data_expiration"
                        onChange={handleChange}
                        value={formData.data_expiration}
                    />
                    <div className="md:col-span-2">
                        <label className="block text-sm text-gray-500 mb-1">Imagen del producto</label>
                        <input
                            type="file"
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            name="image_product"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-8 rounded-md transition-colors duration-200 shadow-sm"
                        type="submit">
                        Agregar producto
                    </button>
                </div>
            </form>

        </>
    )
}
export default EditProduct;