import React, {useEffect, useRef, useState, memo} from 'react';
import {Select} from 'antd';
import {SelectProps} from 'antd/lib/select';
import {dispatchWithPromise} from '~utils/util'
import {GET_ITEMS_LIST} from '~reducers/projectManage'; 
import {LoadingOutlined} from '@ant-design/icons'
import apiList from "~/apis";


const AgentSelect = (props:SelectProps<any>)=>{
    const [names, setNames] = useState([]);
    const [loading, setLoading] = useState(false);
    const timer = useRef<any>();

    useEffect(() => {
        setLoading(true);
        apiList.selectAgentNameList().then((res:any)=>{
            setNames(res.data.list);
            setLoading(false);
        }).catch(()=>{
            setLoading(false);
        })
    }, [])

    const handleSearch = (value:string)=>{
        clearTimeout(timer.current);

        timer.current = setTimeout(()=>{
            setNames([]);
            setLoading(true);
            apiList.selectAgentNameList({keywords: value}).then((res:any)=>{
                setNames(res.data.list);
                setLoading(false);
            }).catch(()=>{
                setLoading(false);
            })
        }, 800)
    }

    return (
        <Select
            {...props}
            placeholder="输入搜索代理商"
            showSearch
            onSearch={handleSearch}
            filterOption={false}
            notFoundContent={loading ? <><LoadingOutlined /> loading...</> : null}

        >
            {
                names.map(({id, name})=>{
                    return <Select.Option key={id} value={id}>{name}</Select.Option>
                })
            }
        </Select>
    )
}

export default memo(AgentSelect);