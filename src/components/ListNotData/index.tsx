import React, { Props } from 'react'
import style from './index.less'
interface ListNotDataProps extends Props<any> {
    list: any[]
}
function ListNotData(props: ListNotDataProps) {
    if (props.list.length == 0) {
        return (
            <div className={style.NotData}>
                <img src={require('../../assets/images/errorData.svg')} alt="" />
                <div>暂无数据</div>
            </div>
        )
    } else {
        return (
            <>
                {props.children}
            </>
        )
    }
}

export default ListNotData