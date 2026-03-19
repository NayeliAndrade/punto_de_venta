export type InputProps = {
    type: "text" | "number" | "date" | "file";
    placeholder?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}