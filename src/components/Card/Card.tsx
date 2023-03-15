import React from 'react';
import {IPost} from "@/models";
import './Card.css';
import {Button} from "@mui/material";

interface ICardProps {
    card: IPost;
    click: (id: number) => void;
    onDelete?: (id: number) => void;
}

// TODO save user data into redux
const Card: React.FC<ICardProps> = ({card, click, onDelete}) => {

    const handleDelete = (e: any, id: number) => {
        e.stopPropagation();
        if (onDelete) {
            onDelete(id);
        }
    }

    return (
        <div className="Card" onClick={() => click(card.id)}>
            <div className="Card__header">
                <h3 className="Card__title">{card.title}</h3>
                {onDelete && <Button onClick={(e) => handleDelete(e, card.id)}>Delete</Button>}
            </div>
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