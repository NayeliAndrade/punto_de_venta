import { useEffect, useState } from "react";
import type { category } from "../types/category";
import api from "../api/api";
import Title from "../components/Title";
import Table from "../components/Table";
import type { Column } from "../components/Table";
import { Link } from "react-router-dom";
import Empty from "./Empty";

function CategoryList() {
  const columns: Column<category>[] = [
    {
      header: "ID",
      accessor: "id"
    },
    {
      header: "Categoria",
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
      <div className="flex justify-between items-center mb-4">
        <Title text="Lista de categorias" />
        <Link to="/addCategory" className="block p-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200">
          Agregar categoría
        </Link >
      </div>
      {categories.length === 0 ? (
        <Empty mensaje="No hay categorías disponibles" />
      ) : <Table
        data={categories}
        columns={columns}
        onDelete={handleDelete}
        getEditLink={(row) => `/editCategory/${row.id}`}
      />}
    </div>
  );
}
export default CategoryList;
