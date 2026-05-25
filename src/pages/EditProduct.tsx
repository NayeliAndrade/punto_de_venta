import { useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import type { Product } from "../types/Product";
import Button from "../components/Button";
import Title from "../components/Title";
import Input from "../components/Input";
import { useForm } from "react-hook-form";

function EditProduct() {
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<product>();
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        if (id) {
            api.get("/products")
                .then(res => {
                    const product = res.data.products.find(
                        (p: Product) => String(p.id) === String(id)
                    );

                    if (product) {
                        reset(product);
                    }
                })
                .catch(err => console.error(err));
        }
    }, [id, reset]);

    const onSubmit = (data: product) => {
        api.put(`/products/${data.id}`, {
            id: data.id,
            sku: data.sku,
            product: data.product,
            description: data.description,
            price: data.price,
            cost: data.cost,
            VAT: data.VAT,
            data_expiration: data.data_expiration,
            unit_measure: data.unit_measure,
            image_product: data.image_product

        }).then(() => {
            navigate("/product/list");
        }).catch(() => {
            navigate("/product/list");
        });
    }

    return (
        <>
            <form className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md" onSubmit={handleSubmit(onSubmit)}>
                <Title text="Editar Producto" />
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
                        placeholder="Ingresar VAT"
                        {...register("VAT", { required: true, maxLength: 3, pattern: /^[0-9]+$/ })}
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
                        {...register("price", { required: true, pattern: /^[0-9]+$/ })}
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
                        {...register("cost", { required: true, pattern: /^[0-9]+$/ })}
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
                                    fileSize: (files: FileList) =>
                                        files?.[0]?.size < 2 * 1024 * 1024 || "Máximo 2MB",
                                    fileType: (files: FileList) =>
                                        ["image/jpeg", "image/png"].includes(files?.[0]?.type) ||
                                        "Solo JPG o PNG"
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
                    <Button text="Editar" type="submit" />
                </div>
            </form >
        </>
    )
}
export default EditProduct;