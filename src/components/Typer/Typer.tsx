import React from "react";
import style from "./Typer.module.css";

type TyperProps = {
    text: string;
    speed: number;
    delay?: number;
    cursor: boolean;
    hideCurserAfterWrite?: boolean;
    hideCursorBeforeWrite?: boolean;
    style?: React.CSSProperties;
}

const Typer = (props: TyperProps) => {

    const {
        text,
        speed,
        cursor = true,
        hideCurserAfterWrite = false,
        hideCursorBeforeWrite = false,
        delay = 0,
    } = props;

    const [index, setIndex] = React.useState(0);
    const [textToDisplay, setTextToDisplay] = React.useState("");

    React.useEffect(() => {
        if (index < text.length && index > 0) {
            setTimeout(() => {
                setTextToDisplay(textToDisplay + text[index]);
                setIndex(index + 1);
            }, speed);
        } else if (index < text.length) {
            setTimeout(() => {
                setTextToDisplay(textToDisplay + text[index]);
                setIndex(index + 1);
            }, delay);
        }
    }, [index]);

    return (
        <div style={style}>
            {textToDisplay}
            {cursor &&
                <span
                    className={style.cursor}
                    style={{
                        display: hideCurserAfterWrite && index >= text.length
                            ? "none"
                            : hideCursorBeforeWrite && index === 0
                                ? "none"
                                : "inline"
                    }}
                ></span>
            }
        </div>
    )
}

export default Typer;