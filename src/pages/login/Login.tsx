import React, {useState} from "react";
import {Alert, Button, TextField} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import './Login.css';
import {login} from "@/services";
import {useNavigate, useOutletContext} from "react-router-dom";
import {LoadingContext} from "@/App";
import {useToken} from "@/hooks";
import {useAppDispatch} from "@/store/store";
import {setNotificationAction} from "@/store/slices/notificationSlice";
import {NOTIFICATION_STATUS} from "@/utils";

interface ILoginInput {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<ILoginInput>();
    const {setLoading} = useOutletContext<LoadingContext>();
    const navigate = useNavigate();
    const {setToken} = useToken();
    const [error, setError] = useState(false);
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<ILoginInput> = data => {
        setLoading(true);
        login({
            email: data.email,
            password: data.password
        }).then(res => {
            dispatch(setNotificationAction({
                status: NOTIFICATION_STATUS.SUCCESS,
                open: true,
                message: 'Login success!',
            }));
            setToken(res.access_token);
            navigate('/');
            setError(false);
        }).catch(err => {
            dispatch(setNotificationAction({
                status: NOTIFICATION_STATUS.ERROR,
                open: true,
                message: `Login error!\n${err.message}`,
            }));
        }).finally(() => setLoading(false));
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
            {error && <Alert severity="error">Login failed</Alert>}
        </form>
    );
}

export default Login;