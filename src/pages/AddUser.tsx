import Input from "../components/Input";
import Title from "../components/Title";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import useUsers from "../hooks/useUsers";
import type { UserProps } from "../types/UserProps";
import { useForm } from "react-hook-form";

function AddUser() {
    const { createUsers } = useUsers();
    const { register, handleSubmit, formState: { errors } } = useForm<UserProps>();

    const navigate = useNavigate();
    const onSubmit = async (data: UserProps) => {
        try {
            await createUsers({ ...data });
            navigate("/user/list");
        } catch (error) {
            console.error("Error creating user:", error);
        }
    }

    return (
        <>

            <form className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md" onSubmit={handleSubmit(onSubmit)}>
                <Title text="Usuario" />
                <Link className="text-blue-600 hover:text-blue-800" to="/user/list">Ir a la lista de usuarios</Link>
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


        </>
    )
}

export default AddUser;