import { Product } from '../models/product.model';

export function filterProducts(
    products: Product[],
    searchText: string,
    category: string,
    status: string
): Product[] {
    return products.filter(product =>
        matchesSearch(product, searchText)
        && (!category || product.category === category)
        && (!status || product.status === status)
    );
}

function matchesSearch(product: Product, text: string): boolean {
    if (!text.trim()) return true;

    const term = text.toLowerCase();

    return (
        String(product.id).includes(term)
        || product.name.toLowerCase().includes(term)
        || product.category.toLowerCase().includes(term)
        || String(product.price).includes(term)
        || String(product.stock).includes(term)
        || product.status.toLowerCase().includes(term)
    );
}