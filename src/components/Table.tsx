import { Link } from "react-router-dom";
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import Button from "./button";

interface BaseEntity {
    id: string | number;
}

interface Column<T> {
    header: string;
    accessor: keyof T | ((row: T) => React.ReactNode);
}

interface DataTableProps<T> {
    data: T[];
    //columns: Column<T>[];
    column: any;
}

function Table<T extends BaseEntity>({ data, columns, getEditLink }: DataTableProps<T>) {
    return (
        <table className="w-full border border-slate-400">
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index} className="p-3 border">
                            {column.header}
                        </th>
                    ))}
                    <th className="p-3 border">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        {columns.map((column, colIndex) => (
                            <td key={colIndex} className="border p-3">
                                {typeof column.accessor === 'function'
                                    ? column.accessor(row)
                                    : row[column.accessor] as React.ReactNode}
                            </td>
                        ))}
                        <td className=" border border-slate-900 p-3">
                            <div className="flex justify-center items-center gap-4">
                                <Button text="Editar" type="edit" getEditLink={getEditLink} row={row} />
                                <Button text="Eliminar" type="delete" onClick={() => onDelete(row.id)} />
                            </div>
                        </td>

                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table;