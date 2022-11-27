import React from "react";
import style from "./Static.module.css";

const Static = () => {

    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
        var canvas = canvasRef.current;
        let doLoop = true;
        if (canvas) {
            var c = canvas.getContext('2d');

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            var imageData = c?.createImageData(canvas.width, canvas.height);
            // document.body.appendChild(canvas);

            if (c && imageData) {
                (function loop() {
                    for (var i = 0, a = imageData.data.length; i < a; i++) {
                        imageData.data[i] = (Math.random() * 255) | 0;
                    }

                    c.putImageData(imageData, 0, 0);

                    if (doLoop) requestAnimationFrame(loop);
                })();
            }
        }
        return () => { doLoop = false; }
    }, []);

    return (
        <canvas className={style.canvas} ref={canvasRef} />
    );
};

export default Static;