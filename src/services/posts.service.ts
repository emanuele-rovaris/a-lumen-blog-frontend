import axios from "axios";
import {IPost} from "@/models/posts.model";

export interface ICreatePostPayload {
    token: string | null;
    title: string;
    text: string;
}

export interface IDeletePostPayload {
    token: string | null;
    id: number;
}

export async function getPosts(): Promise<IPost[]> {
    const response = await axios.get(`${import.meta.env.VITE_API_PATH}/posts`);
    return response.data;
}

export async function getPostDetails(id: string): Promise<IPost> {
    const response = await axios.get(`${import.meta.env.VITE_API_PATH}/posts/${id}`);
    return response.data;
}

export async function createPost(payload: ICreatePostPayload): Promise<IPost> {
    const form = new FormData();
    form.append('title', payload.title);
    form.append('text', payload.text);
    const response = await axios.post(
        `${import.meta.env.VITE_API_PATH}/posts`,
        form,
        {headers: {Authorization: `Bearer ${payload.token}`}});
    return response.data;
}

export async function deletePost(payload: IDeletePostPayload): Promise<[]> {
    const response = await axios.delete(
        `${import.meta.env.VITE_API_PATH}/posts/${payload.id}`,
        {headers: {Authorization: `Bearer ${payload.token}`}});
    return response.data;
}