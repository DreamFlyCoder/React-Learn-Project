import React from "react";

interface ButtonProps {
    title: string;
    disabled: boolean;
    onClick?: () => void;
}

export default function MyButton({ title, disabled, onClick }: ButtonProps) {
    return (
        <button disabled={disabled} onClick={onClick}>{title}</button>
    );
}