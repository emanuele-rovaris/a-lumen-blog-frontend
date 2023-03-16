import {IComment} from "@/models";
import axios from "axios";

export interface ICreateCommentPayload {
    text: string;
    post_id: string;
    token: string | null;
}

export async function getPostComments(postId: string): Promise<IComment[]> {
    const response = await axios.get(`${import.meta.env.VITE_API_PATH}/posts/${postId}/comments`);
    return response.data;
}

export async function createComment(payload: ICreateCommentPayload): Promise<IComment> {
    const form = new FormData();
    form.append('post_id', payload.post_id);
    form.append('text', payload.text);
    const response = await axios.post(
        `${import.meta.env.VITE_API_PATH}/posts/${payload.post_id}/comments`,
        form,
        {headers: {Authorization: `Bearer ${payload.token}`}});
    return response.data;
}