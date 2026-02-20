export interface Category {
    id: number;
    name: string;
}

export interface PublicationImage {
    id: number;
    publication_id: number;
    path: string;
}

export interface PublicationCardType {
    id: number;
    name: string;
    description: string;
    category_id: number;
    views: number;
    created_at: string; 
    category: Category;
    images: PublicationImage[];
}