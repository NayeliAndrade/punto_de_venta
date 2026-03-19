import { useState } from "react";
import api from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button1";
import Title from "../components/Title";
import Input from "../components/Input";
function AddCategory() {
    const generateUuid = () => {
        return crypto.randomUUID();
    }

    const navigate = useNavigate();
    // maneja el estado del formulario
    const [formData, setFormData] = useState({ id: "", category: "" });
    //es la funcion que maneja el submit del formulario
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        //fromData es la informacion que se recibe desde el formulario
        //console.log(formData);
        //envia la informacion al backend, agregando una nueva categoria
        api.post('/categories', {
            id: generateUuid(),
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
            <div className="w-full max-w-md   p-6 rounded-lg shadow-md bg-white">
                <Title text="Agregar categoria" />
                <Link className="text-blue-600 hover:text-blue-800" to="/categoryList">Ir a la lista de categorias</Link>
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