import React, {useEffect, useState} from "react";
import {IPost, ROUTE_PATHS} from "@/models";
import {getPosts} from "@/services";
import './Home.css';
import {Card} from "@/components";
import {setNotificationAction} from "@/store/slices/notificationSlice";
import {NOTIFICATION_STATUS} from "@/utils";
import {useAppDispatch} from "@/store/store";
import {useNavigate, useOutletContext} from "react-router-dom";
import {LoadingContext} from "@/App";

const Home: React.FC = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const dispatch = useAppDispatch();
    const {setLoading} = useOutletContext<LoadingContext>();
    const navigate = useNavigate();

    const onOpenPost = (id: number) => {
        navigate(`${ROUTE_PATHS.POST}/${id}`);
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
            {posts.map((item, index) => <Card key={`card-${index}`} card={item} click={onOpenPost}/>)}
        </div>
    );
}

export default Home;