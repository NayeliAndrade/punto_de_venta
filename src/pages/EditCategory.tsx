import { useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import type { Category } from "../types/Category";
import Button from "../components/Button";
import Title from "../components/Title";
import Input from "../components/Input";
import { useForm } from "react-hook-form";

function EditCategory() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Category>();
    useEffect(() => {
        api.get("/categories")
            .then(res => {
                const category = res.data.categories.find(
                    (c: Category) => String(c.id) === String(id)
                );
                if (category) {
                    reset(category);
                }
            })
            .catch(err => console.error(err));

    }, [id, reset]);

    const onSubmit = (data: Category) => {
        api.put(`/categories/${data.id}`, {
            id: data.id,
            category: data.category
        }).then(() => {
            navigate("/category/list");
        }).catch(() => {
            navigate("/category/list");
        });
    }

    return (
        <>
            <div className="w-100  p-6  bg-white rounded-lg shadow-sm">
                <Title text="Editar categoria" />
                <form className="flex flex-col sm:flex-row gap-3 p-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col w-full">
                        <Input
                            {...register("category", { required: true, maxLength: 30, pattern: /^[a-zA-Z0-9\s]+$/ })}
                            placeholder="Ingresa la categoria"
                            type="text"
                        />
                        {errors.category && (
                            <p className="text-red-500">
                                {errors.category.type === "required" && "La categoría es requerida"}
                                {errors.category.type === "maxLength" && "Máximo 30 caracteres"}
                                {errors.category.type === "pattern" && "Solo letras y números"}
                            </p>
                        )}
                    </div>
                    <Button text="Guardar" type="submit" />
                </form>
            </div>
        </>
    )
}
export default EditCategory;