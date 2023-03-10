import React, {useEffect, useState} from "react";
import {IPost} from "@/models";
import {getPosts} from "@/services";
import './Home.css';
import {Card} from "@/components";
import {setNotificationAction} from "@/store/slices/notificationSlice";
import {NOTIFICATION_STATUS} from "@/utils";
import {useAppDispatch} from "@/store/store";

const Home: React.FC = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        getPosts()
            .then(res => setPosts(res))
            .catch(err => {
                dispatch(setNotificationAction({
                    status: NOTIFICATION_STATUS.ERROR,
                    open: true,
                    message: `Error retrieving posts!\n${err.message}`,
                }));
            });
    }, []);

    return (
        <div className="Home">
            {posts.map((item, index) => <Card key={`card-${index}`} card={item}/>)}
        </div>
    );
}

export default Home;