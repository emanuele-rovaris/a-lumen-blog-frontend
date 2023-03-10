import React from "react";
import {Button, TextField} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {register as registerUser} from "@/services";
import './Register.css';
import {useNavigate, useOutletContext} from "react-router-dom";
import {LoadingContext} from "@/App";
import {setNotificationAction} from "@/store/slices/notificationSlice";
import {NOTIFICATION_STATUS} from "@/utils";
import {useAppDispatch} from "@/store/store";

interface IRegisterInput {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    confirm_password: string;
}

const Register: React.FC = () => {
    const {register, handleSubmit, formState: {errors}, getValues} = useForm<IRegisterInput>();
    const {setLoading} = useOutletContext<LoadingContext>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<IRegisterInput> = data => {
        setLoading(true);
        registerUser({
            email: data.email,
            password: data.password,
            first_name: data.first_name,
            last_name: data.last_name,
        }).then(() => {
            dispatch(setNotificationAction({
                status: NOTIFICATION_STATUS.SUCCESS,
                open: true,
                message: 'Registration success! Login with your credentials',
            }));
            navigate('/login');
        }).catch(err =>
            dispatch(setNotificationAction({
                status: NOTIFICATION_STATUS.ERROR,
                open: true,
                message: `Registration error!\n${err.message}`,
            }))
        ).finally(() => setLoading(false));
    }

    return (
        <form className="Register" onSubmit={handleSubmit(onSubmit)}>
            <h2>Register</h2>
            <TextField {...register("first_name", {required: "First name is required"})}
                       label="First Name"
                       className="Register__field"
                       error={!!errors.first_name}
                       helperText={errors.first_name?.message}/>
            <TextField {...register("last_name", {required: "Last name is required"})}
                       label="Last Name"
                       className="Register__field"
                       error={!!errors.last_name}
                       helperText={errors.last_name?.message}/>
            <TextField {...register("email", {
                required: "Email is required",
                pattern: {value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Email not valid'}
            })}
                       label="Email"
                       className="Register__field"
                       error={!!errors.email}
                       helperText={errors.email?.message}/>
            <TextField {...register("password", {
                required: "Password is required",
                minLength: {value: 6, message: 'Password length must contain at least 6 characters'}
            })}
                       label="Password"
                       className="Register__field"
                       type="Password"
                       error={!!errors.password}
                       helperText={errors.password?.message}/>
            <TextField {...register("confirm_password", {
                required: "Password confirmation is required",
                validate: v => v === getValues().password || 'This field is different from password'
            })}
                       label="Confirm password"
                       className="Register__field"
                       type="Password"
                       error={!!errors.confirm_password}
                       helperText={errors.confirm_password?.message}/>
            <Button type="submit" variant="contained">Register</Button>
        </form>
    );
}

export default Register;