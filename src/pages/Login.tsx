import React, { useState } from 'react';


function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        //console.log(formData);
        e.preventDefault();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        //console.log(name, value);
    }

    return (
        <>
            <h1>Iniciar seción</h1>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md space-y-4 rounded-xl bg-white p-8 shadow-lg"
            >
                <h2 className="text-center text-2xl font-bold text-gray-800">Bienvenido</h2>

                <div>
                    <input
                        type="text"
                        placeholder="Correo electrónico"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Contraseña"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-700 active:bg-blue-800"
                >
                    Iniciar sesión
                </button>

                <p className="text-center text-sm text-gray-500">
                    ¿Olvidaste tu contraseña?
                </p>
            </form>

        </>
    )
}

export default Login;