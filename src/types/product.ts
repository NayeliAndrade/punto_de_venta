export type Product = {
        id: string,
        sku: string,
        product: string,
        category: string,
        image_product: string | FileList,
        description: string,
        unit_measure: string,
        quantity: number,
        VAT: number,
        price: number,
        cost: number,
        data_expiration: string
}