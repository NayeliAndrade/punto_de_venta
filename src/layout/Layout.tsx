import type { ReactNode } from "react";
import img from "../img/img.png"
import { Link } from "react-router-dom";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="bg-gray-100">
            <div className="min-h-screen flex flex-col">
                <header className="bg-white shadow-md flex items-center justify-between px-6 py-3">
                    <header className="flex items-center gap-3">
                        <img
                            src={img} alt="logo"
                            className="w-[5mm] h-[5mm] object-cover rounded-full"
                        />
                        <h1 className="text-xl font-semibold text-gray-700">
                            PDV
                        </h1>
                    </header>
                    <nav className=" gap-4 text-gray-600">
                        <Link to="/login" className="hover:text-blue-500 transition m-4"> Inicio</Link>
                        <Link to="/logout" className="hover:text-blue-500 transition">Cerrar sesión</Link>
                    </nav>
                </header>
                <div className="flex flex-1">
                    <aside className="w-64 bg-gray-900 text-white p-9 ">
                        <Link to="/categoryList" className="block p-2  rounded hover:bg-gray-700 transition">
                            Categorías
                        </Link >
                        <Link to="/productList" className="block p-2 rounded hover:bg-gray-700 transition">
                            Productos
                        </Link >
                        <Link to="/userList" className="block p-2 rounded hover:bg-gray-700 transition">
                            Usuarios
                        </Link>
                    </aside>
                    <main className=" flex flex-1">
                        {children}
                    </main>
                </div>
                <footer className="bg-slate-50 border-t border-gray-200 p-4 text-center text-sm text-gray-400">
                    &copy; 2026 - Todos los derechos reservados
                </footer>
            </div>
        </div>
    )
}

export default Layout
