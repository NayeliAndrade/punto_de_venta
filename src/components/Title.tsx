import type { TitleProps } from "../types/TitleProps";

function Title({ text }: TitleProps) {
    return (
        <h2 className="text-xl font-bold mt-2 mb-2 text-gray-800"> {text}</h2>
    )
}

export default Title;