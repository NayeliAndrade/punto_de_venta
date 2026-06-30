import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import api from "../api";
import Title from "../components/Title";
import Table, { type Column } from "../components/Table";
import { Link } from "react-router-dom";
import Empty from "./EmptyMessage";
//como hacer un tipado de un arreglo de objetos 
function ProductList() {
    const columns: Column<Product>[] = [
        { header: "Producto", accessor: "product" },
        { header: "Categoría", accessor: "category" },
        { header: "Stock", accessor: "quantity" },
        { header: "Precio", accessor: "price" },
        { header: "SKU", accessor: "sku" },
        {
            header: "Imagen",
            accessor: (row: Product) => (
                <img
                    src={typeof row.image_product === "string" ? row.image_product : ""}
                    alt="Imagen del producto"
                    className="w-16 h-16"
                />
            )
        },
        { header: "Descripción", accessor: "description" },
        { header: "Unidad de medida", accessor: "unit_measure" },
        { header: "VAT", accessor: "VAT" },
        { header: "Costo", accessor: "cost" },
        { header: "Fecha de expiración", accessor: "data_expiration" }
    ];

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        api.get("/products")
            .then(res => {
                const data = res.data?.products;
                setProducts(Array.isArray(data) ? data : []);
            }).catch(() => {
                setProducts([]);
            })
    }, []);

    const handleDelete = (id: string | number) => {
        api.delete(`/products/${id}`)
            .then(() => {
                setProducts(prev => prev.filter(p => String(p.id) !== String(id)));
            })
            .catch(() => {
                setProducts([]);
            });

    };

    return (
        <>
            <div className="w-full min-h-screen p-6">
                <div className="flex justify-between items-center mb-4">
                    <Title text="Lista de productos" />
                    <Link to="/product/add" className="block p-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200">
                        Agregar producto
                    </Link >
                </div>
                {products.length === 0 ? (
                    <Empty mensaje="No hay productos disponibles." />
                ) : (
                    <Table
                        data={products}
                        columns={columns}
                        onDelete={handleDelete}
                        getEditLink={(row) => `/product/edit/${row.id}`}
                    />
                )}
            </div>
        </>
    )
}

export default ProductList;