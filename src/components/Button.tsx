import type { ButtonProps } from "../types/ButtonProps";
import { Link } from "react-router-dom";
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'

interface BaseEntity {
    id: string | number;
}

function Button<T extends BaseEntity>({ text, type, getEditLink, row, onDelete }: ButtonProps<T>) {
    //se renderizan botones dependiendo del tipo que se le pase por props (submit, edit o delete), 
    //cada uno tiene un estilo diferente y una funcion diferente
    if (type === "submit") {
        return (
            <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200"
                type="submit">{text}</button>

        )
    } else if (type === "edit" && getEditLink && row) {
        return (
            <Link to={getEditLink(row)}>
                <PencilIcon className="w-6 h-6 text-blue-500 cursor-pointer hover:text-blue-700" />
            </Link>
        )
    } else if (type === "delete" && onDelete && row) {
        return (
            <button onClick={() => onDelete(row.id)}>
                <TrashIcon className="w-6 h-6 text-red-500 cursor-pointer hover:text-red-700" />
            </button>
        )
    }
}

export default Button;