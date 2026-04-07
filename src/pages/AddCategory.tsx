import { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Title from "../components/Title";
import Input from "../components/Input";
function AddCategory() {
    const generateUuid = () => {
        return crypto.randomUUID();
    }

    const navigate = useNavigate();
    const [formData, setFormData] = useState({ id: "", category: "" });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        api.post('/categories', {
            id: generateUuid(),
            category: formData.category
        }).then(() => {
            navigate("/category/list");
        }).catch(err => {
            console.error(err);
        });
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

    }

    return (
        <>
            <div className="w-full max-w-md   p-6 rounded-lg shadow-md bg-white">
                <Title text="Agregar categoria" />
                <Link className="text-blue-600 hover:text-blue-800" to="/category/list">Ir a la lista de categorias</Link>
                <form className="flex flex-col sm:flex-row gap-3 p-4" onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="Ingresa la categoria"
                        name="category" onChange={handleChange}
                        value={formData.category}
                    />
                    <Button text="Agregar" type="submit" />
                </form>
            </div>

        </>
    )
}
export default AddCategory;