import React from "react";

enum ScreenType{
    Mobile = "mobile",
    Desktop = "desktop",
}

const useScreenType = () => {
    const getScreenType = () => {
        return window.innerWidth < 1080 ? ScreenType.Mobile : ScreenType.Desktop;
    }

    const [screenType, setScreenType] = React.useState<ScreenType>(getScreenType());


    React.useEffect(() => {
        const handleResize = () => {
            setScreenType(getScreenType());
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return screenType;
};

// Path: src\hooks\useScreenType\index.ts
export default useScreenType;
