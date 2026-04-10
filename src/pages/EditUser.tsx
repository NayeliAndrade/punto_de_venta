import { useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import Title from "../components/Title";
import Input from "../components/Input";
import type { UserProps } from "../types/UserProps";
import { useForm } from "react-hook-form";

function EditUser() {
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<UserProps>();
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        api.get("/users")
            .then(res => {
                const user = res.data.users.find(
                    (u: UserProps) => String(u.id) === String(id)
                );
                if (user) {
                    reset(user);
                }
            })
            .catch(err => console.error(err));

    }, [id, reset]);

    const onSubmit = (data: UserProps) => {
        api.put(`/users/${data.id}`, {
            id: data.id,
            name: data.name,
            email: data.email
        }).then(() => {
            navigate("/user/list");
        }).catch(() => {
            navigate("/user/list");
        });
    }

    return (
        <>
            <div className="w-100  p-6  bg-white rounded-lg shadow-sm gap-4">
                <Title text="Editar usuario" />
                <form className="flex flex-row sm:flex-col gap-3 mt-3" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                        <Input
                            type="text"
                            placeholder="Ingresa el nombre de usuario"
                            {...register("name", { required: true, maxLength: 20, pattern: /^[a-zA-Z0-9\s]+$/ })}
                        />
                        {errors.name && (
                            <p className="text-red-500">
                                {errors.name.type === "required" && "el nombre es requerido"}
                                {errors.name.type === "maxLength" && "Máximo 20 caracteres"}
                                {errors.name.type === "pattern" && "Solo letras y números"}
                            </p>
                        )}
                        <Input
                            type="text"
                            placeholder="Ingresar correo"
                            {...register("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })}
                        />
                        {errors.email && (
                            <p className="text-red-500">
                                {errors.email.type === "required" && "el email es requerido"}
                                {errors.email.type === "maxLength" && "Máximo 20 caracteres"}
                                {errors.email.type === "pattern" && "Solo letras, puntos, guiones medios o bajos y números"}
                            </p>
                        )}
                        <Button text="Agregar" type="submit" />

                    </div>
                </form>
            </div>
        </>
    )
}
export default EditUser;