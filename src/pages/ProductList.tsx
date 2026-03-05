import { useEffect, useState } from "react";
import type { product } from "../types/product";
import api from "../api/api";
import Tittle from "../components/Tittle";
import Table from "../components/Table";
//como hacer un tipado de un arreglo de objetos 



function ProductList() {
    const columns = [
        { header: "Producto", accessor: "product" },
        { header: "Precio", accessor: "price" },
        { header: "SKU", accessor: "sku" },
        {
            header: "Imagen",
            accessor: (row: any) => (
                <img
                    src={row.image_product}
                    alt="Imagen del producto"
                    className="w-16 h-16"
                />
            )
        },
        { header: "Descripción", accessor: "description" },
        { header: "Unidad de medida", accessor: "unit_measure" },
        { header: "IVA", accessor: "iva" },
        { header: "Costo", accessor: "cost" },
        { header: "Fecha de expiración", accessor: "data_expiration" }
    ];

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

    const handleDelete = (id: number) => {
        api.delete(`/products/${id}`)
            .then(() => {
                setProducts(prev => prev.filter(p => p.id !== id));
            })
            .catch(err => console.error(err));
    };

    return (
        <>
            <div className="w-full min-h-screen p-6">
                <Tittle text="Lista de productos" />
                <Table<product>
                    data={products}
                    columns={columns}
                    onDelete={handleDelete}
                    getEditLink={(row) => `/editProduct/${row.id}`}
                />
            </div>
        </>
    )
}

export default ProductList;