import type { InputProps } from "../types/InputProps";

function Input({ placeholder, name, value, onChange }: InputProps) {
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

export default Input;