export type ButtonProps = {
    text: string;
    type: "submit" | "edit" | "delete";
    row?: any;
    onDelete?: (id: string | number) => void;
    getEditLink?: (row: T) => string;
}