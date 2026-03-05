
type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

function Input(props: InputProps) {
    return (
        <input
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            {...props}
        />
    )
}

export default Input;