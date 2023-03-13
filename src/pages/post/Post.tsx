import React from "react";
import {useParams} from "react-router-dom";

const Post: React.FC = () => {
    const {postId} = useParams();

    return (
        <div>Post - {postId}</div>
    );
}

export default Post;