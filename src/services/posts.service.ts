import axios from "axios";
import {IPost} from "../models/posts.model";

export async function getPosts(): Promise<IPost[]> {
    const response = await axios.get(`${import.meta.env.VITE_API_PATH}/posts`);
    return response.data;
}