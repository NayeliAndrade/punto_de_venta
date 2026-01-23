import { useState } from "react";
import api from "./api/api";
function AddCategory() {
    // maneja el estado del formulario
    const [formData, setFormData] = useState({ id: "", category: "" });
    //es la funcion que maneja el submit del formulario
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        //fromData es la informacion que se recibe desde el formulario
        console.log(formData);
        //envia la informacion al backend, agregando una nueva categoria
        api.post('/categories', {
            id: 3,
            category: formData.category
        }
        ).then(res => {
            const data = res.data;
            // muestra la respuesta del backend en la consola
            console.log(data);

        })
            .catch(err => {
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
            <h1>Categoria</h1>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    placeholder="Ingresa la categoria"
                    name="category"
                    onChange={handleChange}
                    value={formData.category}
                />
                <button type="submit">Agregar</button>
            </form>
        </>
    )
}
export default AddCategory;