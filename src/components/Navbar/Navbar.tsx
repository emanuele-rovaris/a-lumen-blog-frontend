import React from 'react';
import {Button, IconButton} from "@mui/material";
import './Navbar.css';

interface INavbarProps {
    items: INavbarItem[];
    active?: string;
    click: (e: string) => void;
}

export interface INavbarItem {
    label: string;
    value: string;
    icon?: any;
}

const Navbar: React.FC<INavbarProps> = ({items, active, click}) => {
    return (
        <div className="Navbar">
            <div className="Navbar__section">
                {items.filter(item => !item.icon).map((item, index) => (
                    <Button key={`navbar-item-${index}`}
                            onClick={() => click(item.value)}
                            color={active === item.value ? "secondary" : "primary"}>{item.label}</Button>
                ))}
            </div>
            <div className="Navbar__section">
                {items.filter(item => !!item.icon).map((item, index) => (
                    <IconButton key={`navbar-item-${index}`}
                                onClick={() => click(item.value)}>{item.icon}</IconButton>
                ))}
            </div>
        </div>
    );
};

export default Navbar;