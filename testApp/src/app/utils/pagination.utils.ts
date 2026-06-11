export interface PaginationResult<T> {
    items: T[];
    totalPages: number;
}

export function paginate<T>(items: T[], page: number, pageSize: number): PaginationResult<T> {
    const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
    const safePage = Math.min(Math.max(1, page), totalPages);
    const start = (safePage - 1) * pageSize;

    return {
        items: items.slice(start, start + pageSize),
        totalPages
    };
}