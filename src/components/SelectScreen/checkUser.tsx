import React, { useState, useEffect, memo, useRef } from 'react';
import { Input } from 'antd';
import { useSelector } from 'react-redux';
import apis from '~/apis';
import {getmemberIdcard} from '~utils/util';
import Style from './index.less';
const headImg = require("~/assets/images/signHeaderImg.svg");
const user = require("~/assets/images/cusetomerName.svg");
const num = require("~/assets/images/idNo.svg");

export default memo((props: any) => {
    const [info, setInfo] = useState<any>({});
    const [errInfo, setErrInfo] = useState<string>();
    const itemId = useSelector((state: any) => (state.common.currentItem.itemId));
    const [cardId, setCardId] = useState<string>();
    const [url, setUrl] = useState<string>();
    const search = (memberIdcard: string = "") => {
        if(!memberIdcard.trim()){
            return setErrInfo("请输入身份证号码")
        }
        apis.getByScanOrInput({
            itemId,
            memberIdcard: memberIdcard.trim()
        }).then((res) => {
            setInfo(res.data || {});

            if(!res.data || !res.data.id){
                setErrInfo("该人员未进入选房名单");
            }else{
                setErrInfo("")
            }

            props.getMemberId && props.getMemberId((res.data && res.data.id) ? res.data.id : null)

        })
    }

    const change= (e:any)=>{
        setCardId(e.target.value.trim());
        setUrl("");
        setErrInfo("")
        props.getMemberId && props.getMemberId(null)
    }

    useEffect(()=>{
        const p = getmemberIdcard();
        p.then(({memberIdcard, imgData}:any)=>{
            setCardId(memberIdcard);
            setUrl(imgData);

            search(memberIdcard);
        })
    },[])


    return (
        <div className={Style.usrBox} style={{ width: 400, padding: '0 15px', border: '1px solid #21617C', height: '100%', overflow: 'auto' }}>
            <div style={{ textAlign: 'center', marginTop: 30 }}>
                <img src={url ? url : headImg} width={282} />
            </div>
            <div style={{ marginTop: 20, paddingBottom: 10, borderBottom: '1px solid #21617C', marginBottom: 10 }}>
                <Input.Search value={cardId} enterButton="查询" allowClear size="large" placeholder="请输入证件号码" onSearch={search} onChange={change} />
                <div style={{ color: '#F5222D' }}>{errInfo}</div>
            </div>
            {
                info.id ? 
                <>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20, lineHeight: 2 }}>
                        <img src={user} width={22} />
                        <div style={{ backgroundColor: '#374056', flex: 1, marginLeft: 20, paddingLeft: 10 }}>客户姓名：{info.memberName}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20, lineHeight: 2 }}>
                        <img src={num} width={22} />
                        <div style={{ backgroundColor: '#374056', flex: 1, marginLeft: 20, paddingLeft: 10 }}>选房序号：<span style={{ color: '#FF1A2E' }}>{info.chooseNum}</span></div>
                    </div>
                </>
                :
                null
            }
        </div>
    )
})