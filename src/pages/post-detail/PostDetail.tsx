import React, {useCallback, useEffect, useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {createComment, deleteComment, editComment, getPostComments, getPostDetails} from "@/services";
import {LoadingContext} from "@/App";
import {IComment, IPost} from "@/models";
import {setNotificationAction} from "@/store/slices/notificationSlice";
import {NOTIFICATION_STATUS} from "@/utils";
import {useAppDispatch, useAppSelector} from "@/store/store";
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
    const userId = useAppSelector(state => state.user.id)
    const {token} = useToken();
    const [post, setPost] = useState<IPost>();
    const [comments, setComments] = useState<IComment[]>([]);
    const [newComment, setNewComment] = useState<string>('');
    const [edit, setEdit] = useState<number | null>(null);
    const [edited, setEdited] = useState<string>('');

    useEffect(() => {
        retrieveData();
    }, []);

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

    const handleDeleteComment = (id: number) => {
        setLoading(true);
        deleteComment({id: postId, token: token, commentId: id})
            .then(() => retrieveData())
            .catch(err => dispatch(setNotificationAction({
                status: NOTIFICATION_STATUS.ERROR,
                open: true,
                message: `Error deleting comment!\n${err.message}`,
            })))
            .finally(() => setLoading(false))
    }

    const handleEditComment = (key: string, id: number, text: string) => {
        if (key === 'Enter') {
            setLoading(true);
            editComment({id: postId, token: token, commentId: id, text: text})
                .then(() => retrieveData())
                .catch(err => dispatch(setNotificationAction({
                    status: NOTIFICATION_STATUS.ERROR,
                    open: true,
                    message: `Error editing comment!\n${err.message}`,
                })))
                .finally(() => {
                    setLoading(false);
                    setEdit(null);
                    setEdited('');
                })
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
                                    {edit === item.id
                                        ? <TextField label="Edit"
                                                     fullWidth
                                                     value={edited}
                                                     onChange={e => setEdited(e.target.value)}
                                                     onKeyDown={e => handleEditComment(e.key, item.id, edited)}
                                        />
                                        : <>
                                            <ListItemText primary={item.user.full_name} secondary={item.text}/>
                                            {item.user.id === userId && <>
                                                <ListItemButton
                                                    onClick={() => {
                                                        setEdit(item.id);
                                                        setEdited(item.text);
                                                    }}>edit</ListItemButton>
                                                <ListItemButton
                                                    onClick={() => handleDeleteComment(item.id)}>del</ListItemButton>
                                            </>}
                                        </>
                                    }

                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>}
            <TextField label="Add a comment"
                       fullWidth
                       value={newComment}
                       onChange={e => setNewComment(e.target.value)}
                       onKeyDown={e => addNewComment(e.key)}
            />
        </div>
    );
}

export default PostDetail;