import React, {useEffect, useRef, useState} from 'react';
import {Select} from 'antd';
import {SelectProps} from 'antd/lib/select';
import {dispatchWithPromise} from '~utils/util'
import {GET_ITEMS_LIST} from '~reducers/projectManage'; 
import {LoadingOutlined} from '@ant-design/icons'


const ItemsSelect = (props:SelectProps<any>)=>{
    const [names, setNames] = useState([]);
    const [loading, setLoading] = useState(false);
    const timer = useRef<any>();

    useEffect(() => {
        setLoading(true);
        dispatchWithPromise({type: GET_ITEMS_LIST}).then((data:any)=>{
            setNames(data.list);
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
            dispatchWithPromise({type: GET_ITEMS_LIST, payload: {keywords: value}}).then((data:any)=>{
                setNames(data.list);
                setLoading(false);
            }).catch(()=>{
                setLoading(false);
            })
        }, 800)
    }

    return (
        <Select
            {...props}
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

export default ItemsSelect;