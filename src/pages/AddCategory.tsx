import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Title from "../components/Title";
import Input from "../components/Input";
import useCategories from "../hooks/useCategories";
import { useForm } from "react-hook-form";
import type { Category } from "../types/Category";

function AddCategory() {
    const navigate = useNavigate();
    const { createCategory } = useCategories();
    const { register, handleSubmit, formState: { errors } } = useForm<Category>();

    const onSubmit = async (data: Category) => {
        try {
            const newCategory = { ...data, id: crypto.randomUUID() };
            await createCategory(newCategory);
            navigate("/category/list");
        } catch (error) {
            console.error("Error creating category:", error);
        }
    }

    return (
        <>
            <div className="w-full max-w-md   p-6 rounded-lg shadow-md bg-white">
                <Title text="Agregar categoria" />
                <Link className="text-blue-600 hover:text-blue-800" to="/category/list">Ir a la lista de categorias</Link>
                <form className="flex flex-col sm:flex-row gap-3 p-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col w-full">
                        <Input
                            {...register("category", { required: true, maxLength: 30, pattern: /^[a-zA-Z0-9\s]+$/ })}
                            type="text"
                            placeholder="Ingresa la categoria"
                        />
                        {errors.category && (
                            <p className="text-red-500">
                                {errors.category.type === "required" && "La categoría es requerida"}
                                {errors.category.type === "maxLength" && "Máximo 30 caracteres"}
                                {errors.category.type === "pattern" && "Solo letras y números"}
                            </p>
                        )}
                    </div>
                    <Button text="Agregar" type="submit" />
                </form>
            </div>

        </>
    )
}
export default AddCategory;