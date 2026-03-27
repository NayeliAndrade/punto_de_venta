function EmptyMessage({ mensaje }: { mensaje?: string }) {
    return (
        <p className="text-gray-500">{mensaje || "Vacio"}</p>
    )
}

export default EmptyMessage;