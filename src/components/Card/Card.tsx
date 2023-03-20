import React from 'react';
import {IPost} from "@/models";
import './Card.css';
import {Button} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface ICardProps {
    card: IPost;
    click: (id: number) => void;
    allowActions?: boolean;
    onDelete?: (id: number) => void;
    onEdit: (id: number) => void;
}

const Card: React.FC<ICardProps> = ({card, click, allowActions = true, onDelete, onEdit}) => {

    const handleDelete = (e: any, id: number) => {
        e.stopPropagation();
        if (onDelete) {
            onDelete(id);
        }
    }

    const handleEdit = (e: any, id: number) => {
        e.stopPropagation();
        onEdit(id);
    }


    return (
        <div className="Card" onClick={() => click(card.id)}>
            <div className="Card__header">
                <h3 className="Card__title">{card.title}</h3>
                {allowActions &&
                    <div>
                        <Button onClick={(e) => handleEdit(e, card.id)}>
                            <EditIcon/>
                        </Button>
                        <Button onClick={(e) => handleDelete(e, card.id)}>
                            <DeleteIcon/>
                        </Button>
                    </div>}
            </div>
            <p className="Card__text">{card.text}</p>
            <div className="Card__user">
                <img className="Card__user--picture"
                     src={card.user.picture ?? `https://picsum.photos/seed/${card.user.id}/30/30`}
                     alt="user-profile-pic"/>
                <div className="Card__user--name">{card.user.full_name}</div>
            </div>
        </div>
    );
};

export default Card;