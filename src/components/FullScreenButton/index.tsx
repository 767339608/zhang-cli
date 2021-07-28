import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
//全屏按钮
function FullScreenButton(props: React.HTMLProps<any>) {
    const [FullStatus, setFullStatus] = useState(false)
    useEffect(() => {
        let element: any = document.documentElement;
        if (FullStatus) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullScreen();
            }
        } else {
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
    }, [FullStatus])
    return (
        <span {...props} onClick={() => setFullStatus(!FullStatus)}>
            {FullStatus ? <FullscreenExitOutlined />
                : <FullscreenOutlined />
            }
        </span>
    )
}
export default FullScreenButton