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
    isExisting?: boolean;
}

export interface PublicationCardType {
    id: number;
    name: string;
    description: string;
    category_id: number;
    views: number;
    created_at: string;
    category: Category;
    slug: string;
    images: PublicationImage[];
}

/**
 * Generic User interface used in multiple places
 */
export interface User {
    id: number;
    name: string;
    last_name?: string;
    phone?: string;
    created_at?: string;
    state?: string;
    city?: string;
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
    replies: Comment[];
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

interface SubCategory {
    [subCategoryName: string]: string[];
}

export interface CategoryStructure {
    [categoryName: string]: SubCategory;
}

export interface FullTag {
    id: number;
    sub_category_id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
}

export interface FullSubCategory {
    id: number;
    category_id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
    tags: FullTag[];
}

export interface FullCategory {
    id: number;
    name: string;
    slug: string;
    icon: string | null;
    created_at: string;
    updated_at: string;
    sub_categories: FullSubCategory[]; // Relación HasMany
}
