import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import type { category } from "../types/category";
import Button from "../components/Button";
import Title from "../components/Title";
import Input from "../components/Input";

function EditCategory() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ id: "", category: "" });
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        api.get("/categories")
            .then(res => {
                const category = res.data.categories.find(
                    (c: category) => String(c.id) === String(id)
                );
                if (category) {
                    setFormData({
                        id: String(category.id),
                        category: category.category
                    });
                }
            })
            .catch(err => console.error(err));

    }, [id]);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        api.put(`/categories/${formData.id}`, {
            id: formData.id,
            category: formData.category
        }).then(() => {
            navigate("/category/list");
        }).catch(() => {
            navigate("/category/list");
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
            <div className="w-100  p-6  bg-white rounded-lg shadow-sm">
                <Title text="Editar categoria" />
                <form className="flex flex-col sm:flex-row gap-3 p-4" onSubmit={handleSubmit}>
                    <Input
                        placeholder="Ingresa la categoria"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        type="text"
                    />
                    <Button text="Guardar" type="submit" />
                </form>
            </div>
        </>
    )
}
export default EditCategory;