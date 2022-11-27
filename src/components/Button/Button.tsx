// Button props

import React from "react";
import style from "./Button.module.css";

type ButtonProps = {

    /**
     * The text to display on the button
     */
    text: string;

    /**
     * The function to call when the button is clicked
     */
    onClick?: () => void;

    /**
     * Button style
     */
    style?: React.CSSProperties;

    /**
     * Whether the button should have a slightly transparent background
     */
    filled?: boolean;
}


const Button = (props: ButtonProps) => {

    const {
        text,
        onClick,
        style: propStyle,
        filled = false,
    } = props;

    const buttonStyle: React.CSSProperties = {
        ...propStyle,
        backgroundColor: filled ? "rgba(12, 175, 12, 0.2)" : "transparent",
    }

    return (
        <div
            className={style.root}
            style={buttonStyle}
            onClick={props.onClick}
        >
            {text}
        </div>
    )
}

export default Button