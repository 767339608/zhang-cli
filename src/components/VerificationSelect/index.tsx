import React,{useState} from 'react';
import {Select} from 'antd';
import {SelectProps} from 'antd/lib/select';

const status = [
    {
        label:"未核销", value: "0"
    },
    {
        label:"已核销", value: "1"
    },
    {
        label:"已作废", value: "2"
    }
]

export const getVerificationStatus = (v:string)=>{
    return (status.filter((item)=>{
        return item.value==v;
    })[0] || {}).label
}

const VerificationStatus = (props:SelectProps<any>)=>{
    const [options] = useState(status);

    return <Select style={{minWidth: 150}} {...props} allowClear>
        {
            options.map((item)=>{
                return <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
            })
        }
    </Select>
}

export default VerificationStatus;