import React from "react"
import style from "./NavPane.module.css";
import config from "../../config";

type NavPaneProps = {
    /**
     * The URL to navigate to
     * If the URL is the same as the current URL, the page will be reloaded
     */
    url: string;

    /**
     * The function to call when the page has loaded
     */
    onLoad?: () => void;

    /**
     * Element style
     */
    style?: React.CSSProperties;

    /**
     * The miminum amount of time in milliseconds to wait before calling the onLoad function
     * This is to let allow some time for any loading animations to finish
     */
    minimumLoadTime?: number;
}

const NavPane = (props: NavPaneProps) => {

    const {
        url,
        onLoad,
        style: propStyle,
        minimumLoadTime = 0,
    } = props;

    const iframeRef = React.useRef<HTMLIFrameElement>(null);

    // Navigate to the given URL
    const navigate = (url: string) => {
        if (iframeRef.current) {

            // If the URL doesnt match the security regex, do not navigate
            const regex = new RegExp(config.navigationRegex, "i");
            if (!url.match(regex)) {
                throw new Error(`The URL ${url} is not allowed`);
            }

            // Add a listener to the iframe to call the onLoad function when the page has loaded,
            // but only if the onLoad function is defined, after the minimum load time has passed
            let loadTime = Date.now();
            const onLoadListener = () => {
                loadTime = Date.now() - loadTime;
                if (onLoad && loadTime >= minimumLoadTime) {
                    onLoad();
                } else if (onLoad) {
                    setTimeout(onLoad, minimumLoadTime - loadTime);
                }
            }
            iframeRef.current.addEventListener("load", onLoadListener);

            // If the URL is the same as the current URL, reload the page
            if (iframeRef.current.src === url) {
                iframeRef.current.contentWindow?.location.reload();
            } else {
                iframeRef.current.src = url;
            }
        }
    }

    React.useEffect(() => {
        navigate(url);
    }, [url]);

    const iframeStyle: React.CSSProperties = {
        ...propStyle,
        width: "100%",
        height: "100%"
    };

    return (
        <iframe
            className={style.root}
            ref={iframeRef}
            style={iframeStyle}
            sandbox="allow-scripts allow-same-origin allow-forms"
        />
    )
}

export default NavPane