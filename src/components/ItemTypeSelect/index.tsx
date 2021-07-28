import React, {useState} from 'react';
import {Select} from 'antd';
import {SelectProps} from 'antd/lib/select';

const ItemsTypeSelect = (props:SelectProps<any>)=>{
    const [names, setNames] = useState([{name:"正式", id:1},{name:"测试", id:2}]);

    return (
        <Select
            {...props}
            placeholder="请选择项目类型"
        >
            {
                names.map(({id, name})=>{
                    return <Select.Option key={id} value={id}>{name}</Select.Option>
                })
            }
        </Select>
    )
}

export default ItemsTypeSelect;