export interface Post {
    content: string;
    image_url: string;
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

export interface ICreatePost {
    title: string;
    content: string;
    image_url: string
}