function AddProduct(){
    return (
        <>
            <h1>Agregar productos</h1>
            <input type="text" 
            placeholder="Buscar producto" 
            />
            <input type="text"
            placeholder="Buscar el sku"
            />
            <p>Descripción </p>

            <p>Categoría </p>

            <input type="text" 
            placeholder="Insertar unidad de medida" 
            />

            <input type="text"
            placeholder="Insertar cantidad"
            />

            <p>Costo unitario</p>

            <p>Subtotal</p>

            <p>Total</p>
        </>
    )
}   

export default AddProduct;