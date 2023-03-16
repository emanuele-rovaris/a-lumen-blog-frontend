import React, {useEffect, useState} from "react";
import {IPost, ROUTE_PATHS} from "@/models";
import {deletePost, getPosts} from "@/services";
import './Home.css';
import {Card} from "@/components";
import {setNotificationAction} from "@/store/slices/notificationSlice";
import {NOTIFICATION_STATUS} from "@/utils";
import {useAppDispatch, useAppSelector} from "@/store/store";
import {useNavigate, useOutletContext} from "react-router-dom";
import {LoadingContext} from "@/App";
import {useToken} from "@/hooks";

const Home: React.FC = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const dispatch = useAppDispatch();
    const userId = useAppSelector(state => state.user.id);
    const {setLoading} = useOutletContext<LoadingContext>();
    const navigate = useNavigate();
    const {token} = useToken();

    const onOpenPost = (id: number) => {
        navigate(`${ROUTE_PATHS.POST_DETAIL}/${id}`);
    }

    const onDeletePost = (id: number) => {
        setLoading(true);
        deletePost({id, token})
            .then(() => {
                dispatch(setNotificationAction({
                    status: NOTIFICATION_STATUS.SUCCESS,
                    open: true,
                    message: `Post deleted successfully!`,
                }));
                setPosts([...posts.filter(item => item.id !== id)]);
            })
            .catch(err => {
                dispatch(setNotificationAction({
                    status: NOTIFICATION_STATUS.ERROR,
                    open: true,
                    message: `Error deleting post!\n${err.message}`,
                }));
            })
            .finally(() => setLoading(false));
    }

    const onEditPost = (id: number) => {
        navigate(`${ROUTE_PATHS.EDIT_POST}?id=${id}`);
    }

    useEffect(() => {
        setLoading(true);
        getPosts()
            .then(res => setPosts(res))
            .catch(err => {
                dispatch(setNotificationAction({
                    status: NOTIFICATION_STATUS.ERROR,
                    open: true,
                    message: `Error retrieving posts!\n${err.message}`,
                }));
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="Home">
            {posts.map((item, index) => (
                <Card key={`card-${index}`}
                      card={item}
                      allowActions={item.user.id === userId}
                      click={onOpenPost}
                      onDelete={onDeletePost}
                      onEdit={onEditPost}/>
            ))}
        </div>
    );
}

export default Home;