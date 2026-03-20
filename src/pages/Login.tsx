import React, { useState } from 'react';
import Title from '../components/Title';
import Input from '../components/Input';
import Button from '../components/Button';

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div className="flex items-center justify-center">
            <div className="flex items-center gap-10 bg-white p-10 rounded-2xl shadow-xl">
                {/* Imagen */}
                <div className="hidden md:block">
                    <img
                        src="/src/img/img.png"
                        alt="login"
                        className="w-64 object-contain"
                    />
                </div>
                {/* Formulario */}
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-sm space-y-6"
                >
                    <Title text="Bienvenido" />
                    <div className="space-y-4">
                        <Input
                            type="text"
                            placeholder="Correo electrónico"
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
                        />
                        <Input
                            type="password"
                            placeholder="Contraseña"
                            name="password"
                            onChange={handleChange}
                            value={formData.password}
                        />
                    </div>
                    <Button text='Iniciar sesión' type='submit' />
                    <p className="text-center text-sm text-gray-500 hover:text-blue-600 cursor-pointer transition">
                        ¿Olvidaste tu contraseña?
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login;