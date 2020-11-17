export interface PaginatedResponse {
    docs: any[]
    totalDocs: number;
    limit: number;
    totalPages: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: any;
    nextPage: number;
}