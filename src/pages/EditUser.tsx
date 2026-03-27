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
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        api.put(`/users/${formData.id}`, {
            id: formData.id,
            name: formData.name,
            email: formData.email
        }).then(() => {
            navigate("/user/list");
        }).catch(() => {
            navigate("/user/list");
        });
        e.preventDefault();
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <>
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