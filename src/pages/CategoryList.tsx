import { useEffect, useState } from "react";
import type { Category } from "../types/Category";
import api from "../api";
import Title from "../components/Title";
import Table from "../components/Table";
import type { Column } from "../components/Table";
import { Link } from "react-router-dom";
import Empty from "./EmptyMessage";

function CategoryList() {
  const columns: Column<Category>[] = [
    {
      header: "ID",
      accessor: "id"
    },
    {
      header: "Categoria",
      accessor: "category"
    }
  ];
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    api.get("/categories")
      .then(res => {
        const data = res.data?.categories;
        setCategories(Array.isArray(data) ? data : []);
      })
      .catch(() => {
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
    <div className="w-full min-h-screen p-6">
      <div className="flex justify-between items-center mb-4">
        <Title text="Lista de categorias" />
        <Link to="/category/add" className="block p-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200">
          Agregar categoría
        </Link >
      </div>
      {categories.length === 0 ? (
        <Empty mensaje="No hay categorías disponibles" />
      ) : (
        <Table
          data={categories}
          columns={columns}
          onDelete={handleDelete}
          getEditLink={(row) => `/category/edit/${row.id}`}
        />
      )}
    </div>
  )
}

export default CategoryList;
