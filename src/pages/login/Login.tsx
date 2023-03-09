import React from "react";
import {Button, TextField} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import './Login.css';
import {login} from "@/services";
import {useOutletContext} from "react-router-dom";
import {LoadingContext} from "@/App";

interface ILoginInput {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<ILoginInput>();
    const {setLoading} = useOutletContext<LoadingContext>();

    const onSubmit: SubmitHandler<ILoginInput> = data => {
        setLoading(true);
        login({
            email: data.email,
            password: data.password
        }).then(() => {
            // TODO session storage, redirect to home and error handling
        }).catch(err => console.error('Login error', err)).finally(() => setLoading(false));
    }

    return (
        <form className="Login" onSubmit={handleSubmit(onSubmit)}>
            <h2>Login</h2>
            <TextField {...register("email", {
                required: "Email is required",
                pattern: {value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Email not valid'}
            })}
                       label="Email"
                       className="Login__field"
                       error={!!errors.email}
                       helperText={errors.email?.message}/>
            <TextField {...register("password", {
                required: "Password is required",
            })}
                       label="Password"
                       className="Login__field"
                       type="Password"
                       error={!!errors.password}
                       helperText={errors.password?.message}/>
            <Button type="submit" variant="contained">Login</Button>
        </form>
    );
}

export default Login;