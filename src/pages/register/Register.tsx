import React from "react";
import {Button, TextField} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {register as registerUser} from "@/services";

interface IRegisterInput {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    confirm_password: string;
}

const Register: React.FC = () => {
    const {register, handleSubmit, formState: {errors}, getValues} = useForm<IRegisterInput>();
    const onSubmit: SubmitHandler<IRegisterInput> = data => registerUser({
        email: data.email,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
    }).then(() => {
        // TODO navigation to login and error handling
    }).catch(err => console.error('Error during registration', err));

    return (
        <form className="Register" onSubmit={handleSubmit(onSubmit)}>
            <TextField {...register("first_name", {required: "First name is required"})}
                       label="First Name"
                       error={!!errors.first_name}
                       helperText={errors.first_name?.message}/>
            <TextField {...register("last_name", {required: "Last name is required"})}
                       label="Last Name"
                       error={!!errors.last_name}
                       helperText={errors.last_name?.message}/>
            <TextField {...register("email", {
                required: "Email is required",
                pattern: {value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Email not valid'}
            })}
                       label="Email"
                       error={!!errors.email}
                       helperText={errors.email?.message}/>
            <TextField {...register("password", {
                required: "Password is required",
                minLength: {value: 6, message: 'Password length must contain at least 6 characters'}
            })}
                       label="Password"
                       type="Password"
                       error={!!errors.password}
                       helperText={errors.password?.message}/>
            <TextField {...register("confirm_password", {
                required: "Password confirmation is required",
                validate: v => v === getValues().password || 'This field is different from password'
            })}
                       label="Confirm password"
                       type="Password"
                       error={!!errors.confirm_password}
                       helperText={errors.confirm_password?.message}/>
            <Button type="submit">Register</Button>
        </form>
    );
}

export default Register;