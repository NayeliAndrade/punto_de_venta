import type React from "react";
import Input from "../components/Input";
import Title from "../components/Title";
import Button from "../components/Button";
import { useState } from "react";

function AddUser() {
    const [formData, setFormData] = useState({ id: "", name: "", email: "" });

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
            <Title text="Usuario" />

            <Input
                type="text"
                placeholder="Ingresa el nombre de usuario"
                name="name"
                value={formData.name}
                onChange={handleChange}
            />
            <Input
                type="text"
                placeholder="Ingresar correo"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            <input type="text"
                placeholder="Ingresar contraseña"
            />
            <Button text="Agregar" type="submit" />

        </>
    )
}

export default AddUser;