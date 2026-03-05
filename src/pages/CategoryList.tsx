import { useEffect, useState } from "react";
import type { category } from "../types/category";
import api from "../api/api";
//import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
//import { Link } from "react-router-dom";
import Tittle from "../components/Tittle";
import Table from "../components/Table";

function CategoryList() {
  const columns = [
    {
      header: "ID",
      accessor: "id"
    },
    {
      header: "Categoría",
      accessor: "category"
    }
  ];
  // estado para almacenar las categorias
  const [categories, setCategories] = useState<category[]>([]);
  //simula la carga de categorias, haciendo la peticion al backend
  useEffect(() => {
    //obtiene las categorias desde el backend
    api.get("/categories")
      //almacena las categorias en el estado
      .then(res => {
        //asegura que los datos sean un array antes de setear el estado
        const data = res.data?.categories;
        console.log(data);
        setCategories(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.log(err);
        setCategories([]);
      });
  }, []);

  const handleDelete = (id: string | number) => {
    api.delete(`/categories/${id}`)
      .then(() => {
        // actualiza la lista sin recargar
        setCategories(prev => prev.filter(c => c.id !== id));
      })
      .catch(err => console.error(err));
  };

  return (
    // muestra la lista de categorias
    <div className="w-full min-h-screen p-6">
      <Tittle text="Lista de categorias" />
      <Table
        data={categories}
        columns={columns}
        onDelete={handleDelete}
        getEditLink={(row) => `/editCategory/${row.id}`}
      />
    </div>
  );
}
export default CategoryList;
