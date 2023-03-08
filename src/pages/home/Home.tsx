import React, {useEffect, useState} from "react";
import {getPosts} from "../../services/posts.service";
import {IPost} from "../../models/posts.model";

const Home: React.FC = () => {
    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        getPosts()
            .then(res => setPosts(res))
            .catch(err => console.error(err));
    }, []);

    return <pre>{JSON.stringify(posts, null, 2)}</pre>;
}

export default Home;