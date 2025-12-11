export type Note = {
    id: string;
    title: string;
}

export type Instrument = {
    id: string;
    name: string;
}

// Supabase User type with custom metadata
export type UserMetadata = {
    full_name?: string;
    role?: string;
}

export type User = {
    id: string;
    email?: string;
    email_confirmed_at?: string;
    created_at: string;
    last_sign_in_at?: string;
    user_metadata?: UserMetadata;
    app_metadata?: {
        provider?: string;
        [key: string]: any;
    };
    role?: string;
}   