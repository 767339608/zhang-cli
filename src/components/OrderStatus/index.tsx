import React,{useState} from 'react';
import {Select} from 'antd';
import {SelectProps} from 'antd/lib/select';

const status = [
    {
        label:"待支付/已下单", value: "0"
    },
    {
        label:"已支付", value: "1"
    },
    {
        label:"已退款", value: "2"
    }
]

export const getOrderStatus = (v:string)=>{
    return (status.filter((item)=>{
        return item.value==v;
    })[0] || {}).label
}


const OrderStatusSelect = (props:SelectProps<any>)=>{
    const [options] = useState(status);

    return <Select style={{minWidth: 150}} {...props} allowClear>
        {
            options.map((item)=>{
                return <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
            })
        }
    </Select>
}

export default OrderStatusSelect;