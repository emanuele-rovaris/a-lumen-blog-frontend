import React, {useEffect, useState} from "react";
import {IPost} from "@/models";
import {getPosts} from "@/services";
import './Home.css';
import {Card} from "@/components";

const Home: React.FC = () => {
    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        getPosts()
            .then(res => setPosts(res))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="Home">
            {posts.map((item, index) => <Card key={`card-${index}`} card={item}/>)}
        </div>
    );
}

export default Home;