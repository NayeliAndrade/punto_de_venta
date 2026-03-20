export type InputProps = {
    type: "text" | "number" | "date" | "file " | "password";
    placeholder?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}