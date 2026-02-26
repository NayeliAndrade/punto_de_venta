function Button(text: string) {
    return (
        <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200"
            type="submit">{text}</button>
    )
}

export default Button;