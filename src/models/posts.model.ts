export interface IPost {
    id: number;
    title: string;
    text: string;
    created_at: string;
    updated_at: string;
    comments_count: number;
    user: {
        id: number;
        email: string;
        first_name: string;
        last_name: string;
        created_at: string;
        full_name: string;
    }
}