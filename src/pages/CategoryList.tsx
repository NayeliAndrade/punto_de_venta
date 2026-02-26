import { useEffect, useState } from "react";
import type { category } from "../types/category";
import api from "../api/api";
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { Link } from "react-router-dom";

function CategoryList() {
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

  const handleDelete = (id: number) => {
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
      <h2 className="text-xl font-bold mb-4 text-gray-800">Lista de categorias</h2>

      <table className="w-full min-h-screen border border-slate-400 ">
        <thead>
          <tr className=" border border-slate-400 ">
            <th className="p-3  border border-slate-400">Categoria</th>
            <th className="p-3  border border-slate-400">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(categories) && categories.map(category => (
            <tr className=" border border-slate-400 " key={category.id}>
              <td className=" border border-slate-400 p-3">{category.category}</td>
              <td className="  p-3">
                <div className="flex justify-center items-center gap-4">
                  <Link to={`/editCategory/${category.id}`} className="text-blue-500 hover:text-blue-700">
                    <PencilIcon className="w-6 h-6 text-blue-500 cursor-pointer hover:text-blue-700" />
                  </Link>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="text-red-500"
                  >
                    <TrashIcon className="w-6 h-6 text-red-500 cursor-pointer hover:text-red-700" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default CategoryList;
