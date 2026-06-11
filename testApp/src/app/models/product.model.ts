export type ProductCategory =
    | 'Electronics'
    | 'Clothing'
    | 'Home & Kitchen'
    | 'Sports'
    | 'Books'
    | 'Toys'
    | 'Beauty'
    | 'Automotive';

export type ProductStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';

export interface Product {
    id: number;
    name: string;
    category: ProductCategory;
    price: number;
    stock: number;
    status: ProductStatus;
}