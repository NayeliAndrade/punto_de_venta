import { useEffect, useState } from "react";
import api from "../api/api";
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
    // maneja el estado del formulario

    //es la funcion que maneja el submit del formulario
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        //fromData es la informacion que se recibe desde el formulario
        //console.log(formData);
        //envia la informacion al backend, agregando una nueva categoria
        api.put(`/categories/${formData.id}`, {
            id: formData.id,
            category: formData.category
        }).then(res => {
            const data = res.data;
            // muestra la respuesta del backend en la consola
            console.log(data);
            navigate("/categoryList");
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