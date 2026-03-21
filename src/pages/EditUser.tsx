import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import Title from "../components/Title";
import Input from "../components/Input";
import type { UserProps } from "../types/UserProps";

function EditUser() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ id: "", name: "", email: "" });
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        api.get("/users")
            .then(res => {
                const user = res.data.users.find(
                    (u: UserProps) => String(u.id) === String(id)
                );
                if (user) {
                    setFormData({
                        id: String(user.id),
                        name: user.name,
                        email: user.email
                    });
                }
            })
            .catch(err => console.error(err));

    }, [id]);
    // maneja el estado del formulario

    //es la funcion que maneja el submit del formulario
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        //fromData es la informacion que se recibe desde el formulario
        //console.log(formData);
        //envia la informacion al backend, agregando una nueva categoria
        api.put(`/users/${formData.id}`, {
            id: formData.id,
            name: formData.name,
            email: formData.email
        }).then(res => {
            const data = res.data;
            // muestra la respuesta del backend en la consola
            console.log(data);
            navigate("/userList");
            //muestra un mensaje de exito en la consola
        }).catch(err => {
            //muestra si hay un error en la consola
            console.error(err);
        });
        e.preventDefault();
    }
    //maneja el cambio en el input del formulario
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
            {/* formulario para agregar una nueva categoria */}

            <div className="w-100  p-6  bg-white rounded-lg shadow-sm gap-4">
                <Title text="Editar usuario" />
                <form className="flex flex-row sm:flex-col gap-3 mt-3" onSubmit={handleSubmit}>
                    <Input
                        placeholder="Ingresa el nombre"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        type="text"
                    />
                    <Input
                        placeholder="Ingresa el email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                    />
                    <Button text="Guardar" type="submit" />
                </form>
            </div>

        </>
    )
}
export default EditUser;