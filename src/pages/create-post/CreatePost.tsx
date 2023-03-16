import React, {useEffect, useState} from "react";
import {Alert, Button, TextField} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import './CreatePost.css';
import {useNavigate, useOutletContext, useSearchParams} from "react-router-dom";
import {LoadingContext} from "@/App";
import {useToken} from "@/hooks";
import {useAppDispatch} from "@/store/store";
import {setNotificationAction} from "@/store/slices/notificationSlice";
import {NOTIFICATION_STATUS} from "@/utils";
import {ROUTE_PATHS} from "@/models";
import {createPost, editPost, getPostDetails} from "@/services";

interface ICreatePostInput {
    title: string;
    text: string;
}

const CreatePost: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
    } = useForm<ICreatePostInput>({defaultValues: {title: undefined, text: undefined}});
    const {setLoading} = useOutletContext<LoadingContext>();
    const navigate = useNavigate();
    const {token} = useToken();
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (id) {
            setLoading(true);
            getPostDetails(id)
                .then(res => {
                    setValue('title', res.title);
                    setValue('text', res.text);
                })
                .catch(err => dispatch(setNotificationAction({
                    status: NOTIFICATION_STATUS.ERROR,
                    open: true,
                    message: `Error retrieving post details!\n${err.message}`,
                })))
                .finally(() => setLoading(false))
        }
    }, [id]);

    const onSubmit: SubmitHandler<ICreatePostInput> = ({title, text}) => {
        setLoading(true);
        (id ? editPost({title, text, token, id: Number(id)}) : createPost({title, text, token}))
            .then(() => {
                dispatch(setNotificationAction({
                    status: NOTIFICATION_STATUS.SUCCESS,
                    open: true,
                    message: 'Success!',
                }));
                navigate(ROUTE_PATHS.HOME);
                setError(false);
            })
            .catch(err => {
                dispatch(setNotificationAction({
                    status: NOTIFICATION_STATUS.ERROR,
                    open: true,
                    message: `Error!\n${err.message}`,
                }));
            })
            .finally(() => setLoading(false));
    }

    return (
        <form className="CreatePost" onSubmit={handleSubmit(onSubmit)}>
            <h2>CreatePost</h2>
            <TextField
                {...register("title", {
                    required: "Title is required",
                })}
                label="Title"
                className="CreatePost__field"
                error={!!errors.title}
                helperText={errors.title?.message}
                InputLabelProps={{shrink: true}}
            />
            <TextField
                {...register("text", {
                    required: "Text is required",
                })}
                label="Text"
                multiline
                minRows={10}
                className="CreatePost__field"
                error={!!errors.text}
                helperText={errors.text?.message}
                InputLabelProps={{shrink: true}}
            />
            <Button type="submit" variant="contained">{id ? 'Edit' : 'Create'}</Button>
            {error && <Alert severity="error">Create Post failed</Alert>}
        </form>
    );
}

export default CreatePost;