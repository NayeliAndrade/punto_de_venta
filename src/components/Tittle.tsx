import type { TitleProps } from "../types/TittleProps";

function Tittle({ text }: TitleProps) {
    return (
        <h2 className="text-xl font-bold mt-2 mb-2 text-gray-800"> {text}</h2>
    )
}

export default Tittle;