export interface Category {
    id: number;
    name: string;
}
/**
 * Publication Images
 */
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
    slug:string;
    images: PublicationImage[];
}

/**
 * Generic User interface used in multiple places
 */
export interface User {
    id: number;
    name: string;
}

/**
 * Category and Subcategory structure
 */
export interface CategoryInfo {
    id: number;
    slug: string;
    name: string;
}



/**
 * Nested Comments with their authors
 */
export interface Comment {
    id: number;
    publication_id: number;
    user_id: number;
    parent_id: number | null;
    content: string;
    created_at: string;
    updated_at: string;
    user: User;
}

/**
 * Dynamic specifications (Inmuebles, Vehicles, etc.)
 */
export interface Specs {
    area?: string;
    baños?: number;
    habitaciones?: number;
    estacionamiento?: number;
    [key: string]: any; 
}

/**
 * Main Publication Type
 */
export interface Publication {
    id: number;
    user_id: number;
    category_id: number;
    sub_category_id: number;
    tag_id: number;
    name: string;
    description: string;
    condition: string;
    status: 'disponible' | 'vendido' | 'reservado' | string;
    views: number;
    state: string;
    city: string;
    specs: Specs;
    published_at: string;
    created_at: string;
    updated_at: string;
    category: CategoryInfo;
    sub_category: CategoryInfo;
    images: PublicationImage[];
    user: User;
    comments: Comment[];
}