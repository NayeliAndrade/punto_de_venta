import { useEffect, useState } from "react";
import type { product } from "../types/product";
import api from "../api/api";
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Link } from "react-router-dom";

function ProductList() {
    const [products, setProducts] = useState<product[]>([]);

    useEffect(() => {
        api.get("/products")
            .then(res => {
                const data = res.data?.products;
                console.log(data);
                setProducts(Array.isArray(data) ? data : []);
            }).catch(err => {
                console.log(err);
                setProducts([]);
            })
    }, []);

    return (
        <>
            <div className="w-full min-h-screen p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Lista de productos</h2>
                <table className="w-full min-h-screen border border-slate-400 ">
                    <thead>
                        <tr className=" border border-slate-400 ">
                            <th className="p-3  border border-slate-400">Producto</th>
                            <th className="p-3  border border-slate-400">Precio</th>
                            <th className="p-3  border border-slate-400">SKU</th>
                            <th className="p-3  border border-slate-400">Imagen</th>
                            <th className="p-3  border border-slate-400">Descripción</th>
                            <th className="p-3  border border-slate-400">Unidad de medida</th>
                            <th className="p-3  border border-slate-400">IVA</th>
                            <th className="p-3  border border-slate-400">Costo</th>
                            <th className="p-3  border border-slate-400">Fecha de expiración</th>
                            <th className="p-3  border border-slate-400">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(products) && products.map(prod => (
                            <tr className=" border border-slate-400 " key={prod.id}>
                                <td className=" border border-slate-400">{prod.product}</td>
                                <td className=" border border-slate-400">{prod.price}</td>
                                <td className=" border border-slate-400">{prod.sku}</td>
                                <td className=" border border-slate-400"> <img src={prod.image_product} alt="Imagen del producto" className="w-16 h-16 " /> </td>
                                <td className=" border border-slate-400">{prod.description}</td>
                                <td className=" border border-slate-400">{prod.unit_measure}</td>
                                <td className=" border border-slate-400">{prod.iva}</td>
                                <td className=" border border-slate-400">{prod.cost}</td>
                                <td className=" border border-slate-400">{prod.data_expiration}</td>
                                <td className="  p-3">
                                    <div className="flex justify-center items-center gap-4">
                                        <Link to={`/editProduct/${prod.id}`} className="text-blue-500 hover:text-blue-700">
                                            <PencilIcon className="w-6 h-6 text-blue-500 cursor-pointer hover:text-blue-700" />
                                        </Link>
                                        <Link to={`/deleteProduct/${prod.id}`}>
                                            <TrashIcon className="w-6 h-6 text-red-500 cursor-pointer hover:text-red-700" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ProductList;