function AddUser() {
    return (
        <>
            <h1>Usuario</h1>
            <input type="text"
                placeholder="Ingresa el nombre de usuario"
            />
            <input type="text"
                placeholder="Ingresar correo"
            />
            <input type="text"
                placeholder="Ingresar contraseña"
            />
            <button type="submit">Crear usuario</button>
        </>
    )
}

export default AddUser;