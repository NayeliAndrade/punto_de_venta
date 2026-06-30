export type SaleItem = {
    productId: string;
    product: string;
    quantity: number;
    unit_price: number;
    total: number;
};

export type Sale = {
    id: string;
    customer: string;
    items: SaleItem[];
    total: number;
    date: string;
};
