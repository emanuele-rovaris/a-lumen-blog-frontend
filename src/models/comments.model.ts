export interface IComment {
    id: number;
    text: string;
    created_at: string;
    updated_at: string;
    user: {
        id: number;
        email: string;
        first_name: string;
        last_name: string;
        created_at: string;
        full_name: string;
    };
}