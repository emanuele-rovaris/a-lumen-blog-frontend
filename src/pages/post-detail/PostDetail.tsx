import React, {useEffect, useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {getPostComments, getPostDetails} from "@/services";
import {LoadingContext} from "@/App";
import {IComment, IPost} from "@/models";
import {setNotificationAction} from "@/store/slices/notificationSlice";
import {NOTIFICATION_STATUS} from "@/utils";
import {useAppDispatch} from "@/store/store";
import './PostDetail.css';
import {
    Accordion, AccordionDetails,
    AccordionSummary,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText
} from "@mui/material";

const PostDetail: React.FC = () => {
    const {postId} = useParams();
    const {setLoading} = useOutletContext<LoadingContext>();
    const dispatch = useAppDispatch();
    const [post, setPost] = useState<IPost>();
    const [comments, setComments] = useState<IComment[]>([]);

    useEffect(() => {
        if (postId) {
            setLoading(true);
            Promise.all([
                getPostDetails(postId),
                getPostComments(postId),
            ])
                .then(res => {
                    setPost(res[0]);
                    setComments(res[1]);
                })
                .catch(err => dispatch(setNotificationAction({
                    status: NOTIFICATION_STATUS.ERROR,
                    open: true,
                    message: `Error retrieving post details!\n${err.message}`,
                })))
                .finally(() => setLoading(false))
        }
    }, []);

    return (
        <div className="PostDetail">
            <img src={'https://picsum.photos/1000/300'}/>
            <h1>{post?.title}</h1>
            <p>{post?.text}</p>
            {comments.length > 0 &&
                <Accordion>
                    <AccordionSummary expandIcon={'todo'}>{post?.comments_count} comments</AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {comments.map(item => (
                                <ListItem alignItems='flex-start'>
                                    <ListItemAvatar>
                                        <Avatar src='https://picsum.photos/30/30' alt="profile-pic"/>
                                    </ListItemAvatar>
                                    <ListItemText primary={item.user.full_name} secondary={item.text}/>
                                    <ListItemButton>del</ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>}

        </div>
    );
}

export default PostDetail;