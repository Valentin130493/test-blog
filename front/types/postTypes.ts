export interface Post {
    content: string;
    image: string;
    post_id: number;
    published_date: string;
    title: string;
    comments?: Comments[]
}

export interface Comments {
    comment_id: number;
    content: string;
    user: string;
    post_id: number;
    published_date: string;
    user_id: number;
}