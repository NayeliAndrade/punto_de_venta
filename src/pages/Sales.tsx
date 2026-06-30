import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import Title from "../components/Title";
import Table, { type Column } from "../components/Table";
import Button from "../components/Button";
import Empty from "./EmptyMessage";
import type { Sale, SaleItem } from "../types/Sale";
import type { Product } from "../types/Product";

function Sales() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [sales, setSales] = useState<Sale[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string>("");

    const loadSales = () => {
        api.get("/sales")
            .then((res) => {
                const data = res.data?.sales;
                setSales(Array.isArray(data) ? data : []);
            })
            .catch(() => setSales([]));
    };

    const loadProducts = () => {
        api.get("/products")
            .then((res) => {
                const data = res.data?.products;
                setProducts(Array.isArray(data) ? data : []);
            })
            .catch(() => setProducts([]));
    };

    // ÚNICO useEffect para cargar datos externos al montar el componente
    useEffect(() => {
        loadProducts();
        loadSales();
    }, []);

    const saleToEdit = useMemo(() => {
        if (!id) return undefined;
        return sales.find((sale) => sale.id === id);
    }, [id, sales]);

    const handleDelete = (saleId: string | number) => {
        api.delete(`/sales/${saleId}`)
            .then(() => {
                setSales((prev) => prev.filter((sale) => String(sale.id) !== String(saleId)));
                if (id === String(saleId)) navigate("/sales");
            })
            .catch(() => setError("No se pudo eliminar la venta."));
    };

    const columns: Column<Sale>[] = [
        { header: "Cliente", accessor: "customer" },
        {
            header: "Productos",
            accessor: (row: Sale) => (
                <ul className="list-disc list-inside space-y-1">
                    {row.items.map((item) => (
                        <li key={item.productId}>
                            {item.quantity} x {item.product} @ {item.unit_price.toFixed(2)} = {item.total.toFixed(2)}
                        </li>
                    ))}
                </ul>
            )
        },
        { header: "Total", accessor: (row: Sale) => row.total.toFixed(2) },
        { header: "Fecha", accessor: "date" }
    ];

    return (
        <div className="w-full min-h-screen p-6">
            <div className="flex flex-col gap-6">
                {/* PROP KEY CRUCIAL: Al cambiar el ID o pasar de editar a crear, 
                  el formulario completo se resetea de forma nativa sin usar useEffects.
                */}
                <SaleFormContainer
                    key={id ?? "new-sale"}
                    id={id}
                    saleToEdit={saleToEdit}
                    products={products}
                    onSaveSuccess={() => {
                        loadSales();
                        loadProducts();
                        navigate("/sales");
                    }}
                    globalError={error}
                    setGlobalError={setError}
                />

                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                        <Title text="Historial de ventas" />
                    </div>
                    {sales.length === 0 ? (
                        <Empty mensaje="No hay ventas registradas." />
                    ) : (
                        <Table
                            data={sales}
                            columns={columns}
                            onDelete={handleDelete}
                            getEditLink={(row) => `/sales/edit/${row.id}`}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

interface FormProps {
    id?: string;
    saleToEdit?: Sale;
    products: Product[];
    onSaveSuccess: () => void;
    globalError: string;
    setGlobalError: (err: string) => void;
}

// Subcomponente aislado para el formulario de venta
function SaleFormContainer({ id, saleToEdit, products, onSaveSuccess, globalError, setGlobalError }: FormProps) {
    // Inicialización directa del estado. Cero useEffects.
    const [form, setForm] = useState({
        customer: saleToEdit?.customer ?? "",
        date: saleToEdit?.date ?? ""
    });

    const [itemForm, setItemForm] = useState({
        productId: "",
        quantity: 1
    });

    const [saleItems, setSaleItems] = useState<SaleItem[]>(saleToEdit?.items ?? []);

    const selectedProduct = products.find((p) => p.id === itemForm.productId);
    const lineTotal = selectedProduct ? selectedProduct.price * itemForm.quantity : 0;
    const currentTotal = saleItems.reduce((sum, item) => sum + item.total, 0);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setGlobalError("");
    };

    const handleItemChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setItemForm((prev) => ({
            ...prev,
            [name]: name === "quantity" ? Number(value) : value
        }));
        setGlobalError("");
    };

    const handleAddItem = () => {
        if (!itemForm.productId || itemForm.quantity < 1 || !selectedProduct) {
            setGlobalError("Selecciona un producto y cantidad válida.");
            return;
        }
        const existing = saleItems.find((item) => item.productId === itemForm.productId);
        const currentQuantity = existing ? existing.quantity : 0;
        const remainingStock = selectedProduct.quantity - currentQuantity;

        if (remainingStock <= 0) {
            setGlobalError("No hay unidades disponibles en existencia");
            return;
        }

        if (itemForm.quantity > remainingStock) {
            const msg = remainingStock === 1
                ? "Solo queda 1 unidad disponible en existencia"
                : `Solo quedan ${remainingStock} unidades disponibles en existencia`;
            setGlobalError(msg);
            return;
        }

        setSaleItems((prev) => {
            if (existing) {
                return prev.map((item) =>
                    item.productId === itemForm.productId
                        ? {
                            ...item,
                            quantity: item.quantity + itemForm.quantity,
                            total: (item.quantity + itemForm.quantity) * item.unit_price
                        }
                        : item
                );
            }

            return [
                ...prev,
                {
                    productId: selectedProduct.id,
                    product: selectedProduct.product,
                    quantity: itemForm.quantity,
                    unit_price: selectedProduct.price,
                    total: lineTotal
                }
            ];
        });

        // limpiar error tras agregar correctamente
        setGlobalError("");
        setItemForm({ productId: "", quantity: 1 });

        setItemForm({ productId: "", quantity: 1 });
    };

    const handleRemoveItem = (productId: string) => {
        setSaleItems((prev) => prev.filter((item) => item.productId !== productId));
    };

    const handleUpdateItem = (index: number, changes: Partial<Pick<SaleItem, "productId" | "quantity">>) => {
        setSaleItems((prev) => {
            const current = prev[index];
            if (!current) return prev;

            const next = [...prev];
            const newProductId = changes.productId ?? current.productId;
            const newQuantity = changes.quantity ?? current.quantity;
            const product = products.find((p) => p.id === newProductId);
            if (!product) return prev;

            const totalQuantityForProduct = prev.reduce((sum, item, itemIndex) => {
                const itemProductId = itemIndex === index ? newProductId : item.productId;
                const itemQuantity = itemIndex === index ? newQuantity : item.quantity;
                return itemProductId === newProductId ? sum + itemQuantity : sum;
            }, 0);

            if (totalQuantityForProduct > product.quantity) {
                const otherQuantity = prev.reduce((sum, item, itemIndex) => {
                    if (itemIndex === index) return sum;
                    return item.productId === newProductId ? sum + item.quantity : sum;
                }, 0);
                const remaining = product.quantity - otherQuantity;
                const message = remaining <= 0
                    ? "No hay unidades disponibles en existencia"
                    : remaining === 1
                        ? "Solo queda 1 unidad disponible en existencia"
                        : `Solo quedan ${remaining} unidades disponibles en existencia`;
                setGlobalError(message);
                return prev;
            }

            const updated: SaleItem = {
                ...current,
                productId: newProductId,
                product: product.product,
                unit_price: product.price,
                quantity: newQuantity,
                total: product.price * newQuantity
            };

            next[index] = updated;
            return next;
        });
        setGlobalError("");
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!form.customer || !form.date || saleItems.length === 0) {
            setGlobalError("Completa el cliente, la fecha y agrega al menos un producto.");
            return;
        }

        const salePayload: Sale = {
            id: id ?? crypto.randomUUID(),
            customer: form.customer,
            date: form.date,
            items: saleItems,
            total: currentTotal
        };

        const request = id
            ? api.put(`/sales/${id}`, salePayload)
            : api.post("/sales", salePayload);

        request
            .then(() => {
                // limpiar formulario local después de guardar la venta
                setForm({ customer: "", date: "" });
                setSaleItems([]);
                setItemForm({ productId: "", quantity: 1 });
                setGlobalError("");
                onSaveSuccess();
            })
            .catch((error: any) => {
                const message = error?.response?.data?.message || "No se pudo guardar la venta. Intenta de nuevo.";
                setGlobalError(message);
            });
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <Title text={id ? "Editar venta" : "Registrar venta"} />
            <form className="grid grid-cols-1 gap-4 mt-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 mb-1">Cliente</label>
                        <input
                            name="customer"
                            value={form.customer}
                            onChange={handleChange}
                            placeholder="Nombre del cliente"
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 mb-1">Fecha</label>
                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 mb-1">Producto</label>
                        <select
                            name="productId"
                            value={itemForm.productId}
                            onChange={handleItemChange}
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Selecciona un producto</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.product}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 mb-1">Cantidad</label>
                        <input
                            type="number"
                            name="quantity"
                            value={itemForm.quantity}
                            min={1}
                            onChange={handleItemChange}
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col justify-end">
                        <button
                            type="button"
                            onClick={handleAddItem}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                        >
                            Agregar producto
                        </button>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <h3 className="font-semibold text-gray-700">Productos en la venta</h3>
                    {saleItems.length === 0 ? (
                        <p className="text-gray-500 mt-2">Agrega productos para esta venta.</p>
                    ) : (
                        <div className="mt-3 space-y-3">
                            {saleItems.map((item, index) => {
                                const itemProduct = products.find((product) => product.id === item.productId);
                                return (
                                    <div key={`${item.productId}-${index}`} className="space-y-3 border border-gray-200 rounded-md p-3">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                                            <div className="flex flex-col">
                                                <label className="text-sm text-gray-600 mb-1">Producto</label>
                                                <select
                                                    value={item.productId}
                                                    onChange={(event) => handleUpdateItem(index, { productId: event.target.value })}
                                                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="">Selecciona un producto</option>
                                                    {products.map((product) => (
                                                        <option key={product.id} value={product.id}>
                                                            {product.product}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="flex flex-col">
                                                <label className="text-sm text-gray-600 mb-1">Cantidad</label>
                                                <input
                                                    type="number"
                                                    min={1}
                                                    value={item.quantity}
                                                    onChange={(event) => handleUpdateItem(index, { quantity: Number(event.target.value) })}
                                                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div className="flex flex-col justify-end">
                                                <p className="text-sm text-gray-500">Precio unitario</p>
                                                <p className="font-medium">{item.unit_price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-500">Total</p>
                                                <p className="font-medium">{item.total.toFixed(2)}</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveItem(item.productId)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                Quitar
                                            </button>
                                        </div>
                                        {itemProduct && (
                                            <p className="text-xs text-gray-500">Disponibles: {itemProduct.quantity}</p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div className="text-lg font-semibold">Total de la venta: {currentTotal.toFixed(2)}</div>
                    <Button text={id ? "Guardar cambios" : "Registrar venta"} type="submit" />
                </div>
                {globalError && <p className="text-red-500">{globalError}</p>}
            </form>
        </div>
    );
}

export default Sales;