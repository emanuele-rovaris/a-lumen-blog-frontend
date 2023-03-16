import React, {useCallback, useEffect, useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {createComment, getPostComments, getPostDetails} from "@/services";
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
    ListItemText, TextField
} from "@mui/material";
import {useToken} from "@/hooks";

const PostDetail: React.FC = () => {
    const {postId} = useParams();
    const {setLoading} = useOutletContext<LoadingContext>();
    const dispatch = useAppDispatch();
    const {token} = useToken();
    const [post, setPost] = useState<IPost>();
    const [comments, setComments] = useState<IComment[]>([]);
    const [newComment, setNewComment] = useState<string>('');

    const retrieveData = useCallback(() => {
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

    useEffect(() => {
        retrieveData();
    }, []);

    const addNewComment = (key: string) => {
        if (key === 'Enter' && postId) {
            setLoading(true);
            createComment({post_id: postId, text: newComment, token: token})
                .then(() => {
                    setNewComment('');
                    retrieveData();
                })
                .catch(err => dispatch(setNotificationAction({
                    status: NOTIFICATION_STATUS.ERROR,
                    open: true,
                    message: `Error adding comment!\n${err.message}`,
                })))
                .finally(() => setLoading(false))
        }
    }

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
                                <ListItem key={item.id} alignItems='flex-start'>
                                    <ListItemAvatar>
                                        <Avatar src='https://picsum.photos/30/30' alt="profile-pic"/>
                                    </ListItemAvatar>
                                    <ListItemText primary={item.user.full_name} secondary={item.text}/>
                                    <ListItemButton>del</ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        <TextField label="Add a comment"
                                   fullWidth
                                   value={newComment}
                                   onChange={e => setNewComment(e.target.value)}
                                   onKeyDown={e => addNewComment(e.key)}
                        />
                    </AccordionDetails>
                </Accordion>}

        </div>
    );
}

export default PostDetail;