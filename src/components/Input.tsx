import type { InputProps } from "../types/InputProps";

function Input({ type, placeholder, name, value, onChange }: InputProps) {
    if (type === "file") {
        return (
            <input
                type="file"
                name={name}
                onChange={onChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-colors duration-200"
            />
        )
    } else if (type === "date") {
        return (
            <input
                type="date"
                name={name}
                onChange={onChange}
                value={value}
                className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors duration-200"
            />
        )
    } else {
        return (
            <input
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
        )

    }
}

export default Input;