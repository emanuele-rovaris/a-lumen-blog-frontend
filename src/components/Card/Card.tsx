import React from 'react';
import {IPost} from "@/models";
import './Card.css';

interface ICardProps {
    card: IPost;
}

const Card: React.FC<ICardProps> = ({card}) => {
    return (
        <div className="Card">
            <h3 className="Card__title">{card.title}</h3>
            <p className="Card__text">{card.text}</p>
            <div className="Card__user">
                <img className="Card__user--picture" src={card.user.picture}></img>
                <div className="Card__user--name">{card.user.full_name}</div>
            </div>
        </div>
    );
};

export default Card;