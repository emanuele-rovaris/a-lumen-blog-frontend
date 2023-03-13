import React, {useEffect, useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {getPostDetails} from "@/services";
import {LoadingContext} from "@/App";
import {IPost} from "@/models";
import {setNotificationAction} from "@/store/slices/notificationSlice";
import {NOTIFICATION_STATUS} from "@/utils";
import {useAppDispatch} from "@/store/store";

const Post: React.FC = () => {
    const {postId} = useParams();
    const {setLoading} = useOutletContext<LoadingContext>();
    const dispatch = useAppDispatch();

    const [post, setPost] = useState<IPost>();

    useEffect(() => {
        if (postId) {
            setLoading(true);
            getPostDetails(postId)
                .then(res => setPost(res))
                .catch(err => dispatch(setNotificationAction({
                    status: NOTIFICATION_STATUS.ERROR,
                    open: true,
                    message: `Error retrieving post details!\n${err.message}`,
                })))
                .finally(() => setLoading(false))
        }
    }, []);

    return (
        <>
            <div>Post - {postId}</div>
            <pre>{JSON.stringify(post, null, 2)}</pre>
        </>
    );
}

export default Post;