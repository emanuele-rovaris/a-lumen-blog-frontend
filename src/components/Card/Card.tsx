import React from 'react';
import {IPost} from "@/models";
import './Card.css';

interface ICardProps {
    card: IPost;
    click: (id: number) => void;
}

const Card: React.FC<ICardProps> = ({card, click}) => {
    return (
        <div className="Card" onClick={() => click(card.id)}>
            <h3 className="Card__title">{card.title}</h3>
            <p className="Card__text">{card.text}</p>
            <div className="Card__user">
                <img className="Card__user--picture"
                     src={card.user.picture ?? 'https://picsum.photos/30/30'}
                     alt="user-profile-pic"/>
                <div className="Card__user--name">{card.user.full_name}</div>
            </div>
        </div>
    );
};

export default Card;