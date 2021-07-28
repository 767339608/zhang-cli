import React, { useState, useRef, useEffect } from 'react';

export default (props: any) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const ref = useRef<any>();

    useEffect(() => {
        document.addEventListener("fullscreenchange", fullscreenHandle);

        props.getFullFun && props.getFullFun(launchFullscreenChange);

        return () => {
            document.removeEventListener("fullscreenchange", fullscreenHandle);
        }
    }, [])

    const launchFullscreenChange = () => {
        if (isFullScreen) {
            exitFullscreen(ref.current);
        } else {
            launchFullscreen(ref.current);
        }
    }

    const launchFullscreen = (element: any) => {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullScreen();
        }
    }

    const exitFullscreen = (element: any) => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }

    const fullscreenHandle = (event: any) => {
        if (document.fullscreenElement) {
            setIsFullScreen(true);
        } else {
            setIsFullScreen(false);
        }
    }


    return (
        <div ref={el => (ref.current = el)}>
            {props.children}
        </div>
    )
}