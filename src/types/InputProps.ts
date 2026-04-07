export type InputProps = {
    type: "text" | "number" | "date" | "file" | "email" | "password";
    placeholder?: string;
    name: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}