import img from "../img/cajete.png"
import { Link } from "react-router-dom";

const Layout = ({ children }: { children: React.ReactNode }) => {
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
                    </nav>
                </header>

                <main className="flex-1 flex items-center justify-center">
                    <div className="bg-white shadow-lg rounded-xl p-10 text-center">
                        {children}
                    </div>
                </main>
            </div>
        </div>

    )
}

export default Layout