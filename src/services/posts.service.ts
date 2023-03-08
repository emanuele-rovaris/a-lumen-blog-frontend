import axios from "axios";
import {IPost} from "../models/posts.model";

export async function getPosts(): Promise<IPost[]> {
    const response = await axios.get('http://localhost:8081/posts');
    return response.data;
}