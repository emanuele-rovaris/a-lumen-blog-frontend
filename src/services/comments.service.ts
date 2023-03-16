import {IComment} from "@/models";
import axios from "axios";

export async function getPostComments(postId: string): Promise<IComment[]> {
    const response = await axios.get(`${import.meta.env.VITE_API_PATH}/posts/${postId}/comments`);
    return response.data;
}