import React from 'react'
import { useSelector } from 'react-redux'
import style from './index.less'
interface ScreenProps {
    title: string
}
function ScreenTitle(props: ScreenProps) {
    const proejctName = useSelector((state: any) => state.common.title)
    return (
        <div className={style.signheader}>
            <div className={style.projectName}>{proejctName}</div>
            <div className={style.headerTitle}>
                <div>开盘宝</div>
                <div className={style.hint}></div>
                <div>{props.title}</div>
            </div>
        </div>
    )
}
export default ScreenTitle