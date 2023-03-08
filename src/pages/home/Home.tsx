import React, {useEffect, useState} from "react";
import {IPost} from "@/models";
import {getPosts} from "@/services";

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