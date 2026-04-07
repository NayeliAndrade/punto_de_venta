import type React from "react";
import Input from "../components/Input";
import Title from "../components/Title";
import Button from "../components/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUsers from "../hooks/useUsers";

function AddUser() {
    const { createUsers } = useUsers();
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });

    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            await createUsers({ ...formData });
            navigate("/user/list");
        } catch (error) {
            console.error("Error creating user:", error);
        }
        e.preventDefault();
    }

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

            <form className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
                <Title text="Usuario" />
                <Link className="text-blue-600 hover:text-blue-800" to="/user/list">Ir a la lista de usuarios</Link>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
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
                    <Input type="text"
                        placeholder="Ingresar contraseña"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <Button text="Agregar" type="submit" />

                </div>

            </form>


        </>
    )
}

export default AddUser;