import axios from "axios";
import {IUser} from "@/models";

export interface IRegisterPayload {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}

export async function register(payload: IRegisterPayload): Promise<IUser> {
    const form = new FormData();
    form.append('email', payload.email);
    form.append('password', payload.password);
    form.append('first_name', payload.first_name);
    form.append('last_name', payload.last_name);
    const response = await axios.post(
        `${import.meta.env.VITE_API_PATH}/auth/register`,
        form,
    );
    return response.data;
}