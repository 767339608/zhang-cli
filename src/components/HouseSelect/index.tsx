import React, {useEffect, useState} from 'react';
import {Cascader, CascaderProps} from 'antd';
import { CascaderOptionType } from 'antd/lib/cascader';
import {useSelector} from 'react-redux'
import apis from '~/apis';

export default (props: any)=>{
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState<any>([]);

    useEffect(()=>{
        setValue(props.value)
    }, [props.value]);

    const itemId = useSelector((state:any)=>{
        return state.common.currentItem.itemId;
    })

    const getUnitList = (targetOption:CascaderOptionType)=>{
        targetOption.loading = true;
        apis.getUnitList({itemId, blockName: targetOption.value}).then((res)=>{
            targetOption.loading = false;
            targetOption.children= res.data.list.map((name:string)=>{
                return {
                    label: name,
                    value: name,
                    isLeaf: false,
                    parentName: targetOption.value
                }
            });
            setOptions([...options]);
        })
    }

    const getFloorList = (targetOption:CascaderOptionType)=>{
        targetOption.loading = true;
        apis.getFloorList({itemId,blockName: targetOption.parentName, unitName: targetOption.value}).then((res)=>{
            targetOption.loading = false;
            targetOption.children= res.data.list.map((name:string)=>{
                return {
                    label: name,
                    value: name
                }
            });
            setOptions([...options]);
        })
    }

    const loadData = (selectedOptions:CascaderOptionType[])=>{
        const targetOption = selectedOptions[selectedOptions.length - 1];
        if(selectedOptions.length===1){
            getUnitList(targetOption)
        }else if(selectedOptions.length===2){
            getFloorList(targetOption)
        }
        
    }

    useEffect(()=>{
        if(!itemId) return;
        apis.getBlockList({itemId}).then((res)=>{
            setOptions(res.data.list.map((name:string)=>{
                return {
                    label: name,
                    value: name,
                    isLeaf: false
                }
            }));
        })
    }, [itemId])

    const onChange = (value:[], selectedOptions:CascaderOptionType[])=>{
        setValue(value);
        props.onChange && props.onChange(value);
    }

    return <Cascader
        {...props}
        value={value}
        options={options}
        loadData={loadData}
        onChange={onChange}
        changeOnSelect={true}
    />
}