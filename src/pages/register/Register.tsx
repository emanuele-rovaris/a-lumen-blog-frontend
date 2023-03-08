import React from "react";
import {Button, TextField} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";

interface IRegisterInput {
    username: string;
    password: string;
    confirm_password: string;
}

const Register: React.FC = () => {
    const {register, handleSubmit, formState: {errors}, getValues} = useForm<IRegisterInput>();
    const onSubmit: SubmitHandler<IRegisterInput> = data => console.log(data);

    return (
        <form className="Register" onSubmit={handleSubmit(onSubmit)}>
            <TextField {...register("username", {required: "Username is required"})}
                       label="Username"
                       error={!!errors.username}
                       helperText={errors.username?.message}/>
            <TextField {...register("password", {required: "Password is required"})}
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