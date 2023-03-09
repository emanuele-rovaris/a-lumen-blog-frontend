import React from 'react';
import {Button} from "@mui/material";
import './Navbar.css';

interface INavbarProps {
    items: INavbarItem[];
    active?: string;
    click: (e: string) => void;
}

export interface INavbarItem {
    label: string;
    value: string;
}

const Navbar: React.FC<INavbarProps> = ({items, active, click}) => {
    return (
        <div className="Navbar">
            {items.map((item, index) => (
                <Button key={`navbar-item-${index}`}
                        onClick={() => click(item.value)}
                        color={active === item.value ? "secondary" : "primary"}>{item.label}</Button>
            ))}
        </div>
    );
};

export default Navbar;