import Table, { type Column } from "../components/Table"
import { Link } from "react-router-dom"
import Title from "../components/Title"
import { useEffect, useState } from "react";
import type { UserProps } from "../types/UserProps";
import api from "../api";

function UserList() {
    const columns: Column<UserProps>[] = [
        { header: "Nombre", accessor: "name" },
        { header: "Correo", accessor: "email" },
    ];

    const [user, setUser] = useState<UserProps[]>([])

    useEffect(() => {
        api.get("/users")
            .then(res => {
                const data = res.data?.users;
                setUser(Array.isArray(data) ? data : [])
            }).catch(() => {
                setUser([]);
            })
    }, [])

    const handleDelete = (id: string | number) => {
        api.delete(`/users/${id}`)
            .then(() => {
                setUser(prev => prev.filter(p => String(p.id) !== String(id)));
            })
            .catch(err => console.error(err));
    };
    return (
        <>
            <div className="w-full min-h-screen p-6">
                <div className="flex justify-between items-center mb-4">
                    <Title text="Lista de Usuarios" />
                    <Link to="/user/add" className="block p-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200">
                        Agregar usuario
                    </Link >
                </div>

                <Table
                    data={user}
                    columns={columns}
                    onDelete={handleDelete}
                    getEditLink={(row) => `/user/edit/${row.id}`}
                />
            </div>
        </>
    )
}

export default UserList