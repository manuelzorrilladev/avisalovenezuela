export type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
    two_factor_confirmed_at: null;
     phone?: string;
     id_card?: string;
     city?: string;
     state?: string;
     birth_date?: string;
     role: number
    

};

export type Auth = {
    user: User;
};

export type TwoFactorConfigContent = {
    title: string;
    description: string;
    buttonText: string;
};
