import type { ButtonProps } from "../types/ButtonProps";
import { Link } from "react-router-dom";
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'

function Button({ text, type, getEditLink, row, onDelete }: ButtonProps) {
    //se renderizan botones dependiendo del tipo que se le pase por props (submit, edit o delete), 
    //cada uno tiene un estilo diferente y una funcion diferente
    if (type === "submit") {
        return (
            <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200"
                type="submit">{text}</button>

        )
    } else if (type === "edit") {
        return (
            <Link to={getEditLink(row)}>
                <PencilIcon className="w-6 h-6 text-blue-500 cursor-pointer hover:text-blue-700" />
            </Link>
        )
    } else if (type === "delete") {
        return (
            <button onClick={() => onDelete(row.id)}>
                <TrashIcon className="w-6 h-6 text-red-500 cursor-pointer hover:text-red-700" />
            </button>
        )
    }
}

export default Button;