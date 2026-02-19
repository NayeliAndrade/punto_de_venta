import { useEffect, useState } from "react";
import api from "../api/api";
import type { Category } from "../types/category";

function CategoryList() {
  // estado para almacenar las categorias
  const [categories, setCategories] = useState<Category[]>([]);
  //simula la carga de categorias, haciendo la peticion al backend
  useEffect(() => {
    //obtiene las categorias desde el backend
    api.get("/categories")
      //almacena las categorias en el estado
      .then(res => {
        //asegura que los datos sean un array antes de setear el estado
        const data = res.data?.categories;
        setCategories(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error(err);
        setCategories([]);
      });
  }, []);

  return (
    // muestra la lista de categorias
    <div>
      <h1>Category List</h1>
      <ul>
        {Array.isArray(categories) &&
          categories.map(category => (
            <li key={category.id}>{category.category}</li>
          ))}
      </ul>
    </div>
  );
}
export default CategoryList;
