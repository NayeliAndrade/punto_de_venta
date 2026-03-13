export interface ButtonProps<T> {
  text: string;
  type: "edit" | "delete" | "submit";
  onClick?: () => void;
  onDelete?: (id: string | number) => void;
  getEditLink?: (row: T) => string;
  row?: T;
}