import { useEffect, useState } from "react";
import type { product } from "../types/product";
import api from "../api/api";

function ProductList() {
    const [products, setProducts] = useState<product[]>([]);

    useEffect(() => {
        api.get("/products").then(res => {
            const data = res.data?.products;
            setProducts(Array.isArray(data) ? data : []);
        }).catch(err => {
            console.log(err);
            setProducts([]);
        })
    }, []);

    return (
        <>

            <p className="m-2 ">Lista de productos</p>

            <table className=" border border-slate-400 ">
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
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(products) && products.map(prod => (
                        <tr key={prod.id}>
                            <td className=" border border-slate-400">{prod.product}</td>
                            <td className=" border border-slate-400">{prod.price}</td>
                            <td className=" border border-slate-400">{prod.sku}</td>
                            <td className=" border border-slate-400"> <img src={prod.image_product} alt="Imagen del producto" className="w-16 h-16 " /> </td>
                            <td className=" border border-slate-400">{prod.description}</td>
                            <td className=" border border-slate-400">{prod.unit_measure}</td>
                            <td className=" border border-slate-400">{prod.iva}</td>
                            <td className=" border border-slate-400">{prod.cost}</td>
                            <td className=" border border-slate-400">{prod.data_expiration}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default ProductList;