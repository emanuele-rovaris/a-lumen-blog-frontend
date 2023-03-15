import React, {useState} from "react";
import {Alert, Button, TextareaAutosize, TextField} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import './CreatePost.css';
import {useNavigate, useOutletContext} from "react-router-dom";
import {LoadingContext} from "@/App";
import {useToken} from "@/hooks";
import {useAppDispatch} from "@/store/store";
import {setNotificationAction} from "@/store/slices/notificationSlice";
import {NOTIFICATION_STATUS} from "@/utils";
import {ROUTE_PATHS} from "@/models";
import {createPost} from "@/services";

interface ICreatePostInput {
    title: string;
    text: string;
}

const CreatePost: React.FC = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<ICreatePostInput>();
    const {setLoading} = useOutletContext<LoadingContext>();
    const navigate = useNavigate();
    const {token} = useToken();
    const [error, setError] = useState(false);
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<ICreatePostInput> = ({title, text}) => {
        setLoading(true);
        createPost({title, text, token}).then(res => {
            dispatch(setNotificationAction({
                status: NOTIFICATION_STATUS.SUCCESS,
                open: true,
                message: 'Create Post success!',
            }));
            navigate(ROUTE_PATHS.HOME);
            setError(false);
        }).catch(err => {
            dispatch(setNotificationAction({
                status: NOTIFICATION_STATUS.ERROR,
                open: true,
                message: `Create Post error!\n${err.message}`,
            }));
        }).finally(() => setLoading(false));
    }

    return (
        <form className="CreatePost" onSubmit={handleSubmit(onSubmit)}>
            <h2>CreatePost</h2>
            <TextField {...register("title", {required: "Title is required"})}
                       label="Title"
                       className="CreatePost__field"
                       error={!!errors.title}
                       helperText={errors.title?.message}/>
            <TextField {...register("text", {required: "Text is required"})}
                       label="Text"
                       multiline
                       minRows={10}
                       className="CreatePost__field"
                       error={!!errors.text}
                       helperText={errors.text?.message}/>
            <Button type="submit" variant="contained">Create Post</Button>
            {error && <Alert severity="error">Create Post failed</Alert>}
        </form>
    );
}

export default CreatePost;