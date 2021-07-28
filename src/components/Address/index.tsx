import React, {useState, useEffect, memo}  from 'react';
import {Form, Input, Cascader} from 'antd';
import apiList from '~/apis';

export const PCACascader = (props:any)=>{
    const [options, setOptions] = useState(props.options || []);

    useEffect(()=>{
        getData();
    }, [])
    
    const getData = ()=>{
        apiList.getAreaTree().then((res)=>{
            const list = res.data.list;
            setOptions(list);
        })
    }

    return (
        <Cascader 
            {...props}
            allowClear
            options={options}
            onChange={(values, selectedOptions)=>{
                const [p, c, d] = selectedOptions || [];

                props.onChange && props.onChange(values[0]? [...values, p.label, c.label, d.label] : [])
            }}
        />
    )
}


export default memo((props:any)=>{
    const [value, setValue] = useState<any>({codes:[], address:""});
 
    useEffect(()=>{
        const {provinceCode, cityCode, districtCode, provinceName, cityName, districtName, address} = props.value || {};
        const v = {
            address,
            codes: districtCode ? [provinceCode, cityCode, districtCode, provinceName, cityName, districtName] : []
        }
        if(value.codes.length || value.address) return;
        setValue(v);
    },[props.value])

    const haveNull = (obj:any)=>{
        let is = false;
        Object.keys(obj).map((k)=>{
            if(!obj[k]){
                is = true;
            }

            if(Array.isArray(obj[k]) && !obj[k].length){
                is = true;
            }
        })

        return is;
    }

    const changePca = (codes:[])=>{
        const v = {
            ...value,
            codes
        }
        setValue(v)
        triggerChange(v);
    }

    const addressHandle = (e:any)=>{
        const v = {
            ...value,
            address: e.target.value
        }
        setValue(v)
        triggerChange(v);
    }

    const triggerChange = ({codes, address}:any)=>{
       
        props.onChange && props.onChange(
            haveNull({codes, address}) ? 
            undefined : {
                provinceCode: codes[0],
                cityCode: codes[1],
                districtCode: codes[2],
                provinceName: codes[3],
                cityName: codes[4],
                districtName: codes[5],
                address
            }
        );
    }

    return (
        <div>
            <div style={{marginBottom: 10}}>
                <PCACascader placeholder="请选择省市区" disabled={props.disabled} value={value.codes} onChange={changePca}/>
            </div>
            <div>
                <Input placeholder="请输入项目地址" disabled={props.disabled} value={value.address} onChange={addressHandle}/>
            </div>
        </div>
    )
})