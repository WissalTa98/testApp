import { Product } from '../models/product.model';

export type SortKey = keyof Product;
export type SortDirection = 'asc' | 'desc';

export function sortProducts(products: Product[], key: SortKey, direction: SortDirection): Product[] {
    const modifier = direction === 'asc' ? 1 : -1;

    return [...products].sort((a, b) => {
        const valA = a[key];
        const valB = b[key];

        if (typeof valA === 'string' && typeof valB === 'string') {
            return valA.localeCompare(valB) * modifier;
        }

        if (typeof valA === 'number' && typeof valB === 'number') {
            return (valA - valB) * modifier;
        }

        return 0;
    });
}